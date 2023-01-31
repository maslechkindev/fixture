"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestInstanceParticipantsRepository = void 0;
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const betOutcome_1 = require("../enums/betOutcome");
const knex_1 = require("../../integrations/knex");
const contestInstanceStatus_enum_1 = require("../enums/contestInstanceStatus.enum");
const tables_1 = require("../../../interfaces/db/tables");
const user_interface_1 = require("../../../interfaces/user.interface");
let ContestInstanceParticipantsRepository = class ContestInstanceParticipantsRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async replenishBalanceFromBetsToSettle(txManager, betsSettlementDetails) {
        const betOutcomeToReplenishBankrollBalanceStrategy = {
            [betOutcome_1.BetOutcome.WON]: 'participants."bankrollBalance" + total_bets."betAmount" + total_bets."winAmount"',
            [betOutcome_1.BetOutcome.VOID]: 'participants."bankrollBalance" + total_bets."betAmount"',
            [betOutcome_1.BetOutcome.PUSH]: 'participants."bankrollBalance" + total_bets."betAmount"',
            [betOutcome_1.BetOutcome.HALF_WON]: 'participants."bankrollBalance" + total_bets."betAmount" + total_bets."winAmount"/2',
            [betOutcome_1.BetOutcome.HALF_LOST]: 'participants."bankrollBalance" + total_bets."betAmount"/2',
        };
        const replenishBankrollBalanceStrategy = betOutcomeToReplenishBankrollBalanceStrategy[betsSettlementDetails.betOutcome];
        const betOutcomeToReplenishTotalBalanceStrategy = {
            [betOutcome_1.BetOutcome.WON]: 'participants."totalBalance" + total_bets."winAmount"',
            [betOutcome_1.BetOutcome.LOST]: 'participants."totalBalance" - total_bets."betAmount"',
            [betOutcome_1.BetOutcome.HALF_WON]: 'participants."totalBalance" + total_bets."winAmount"/2',
            [betOutcome_1.BetOutcome.HALF_LOST]: 'participants."totalBalance" - total_bets."betAmount"/2',
        };
        const replenishTotalBalanceStrategy = betOutcomeToReplenishTotalBalanceStrategy[betsSettlementDetails.betOutcome];
        const updatedParticipantBalances = await this.replanishBalancesByStrategies(txManager, betsSettlementDetails.marketLineId, replenishBankrollBalanceStrategy, replenishTotalBalanceStrategy);
        return updatedParticipantBalances;
    }
    getUserByPromoCode(promoCode) {
        return this.knex('users').select('*').where({ promoCode }).first();
    }
    async getBetsAndOutcomeStatus(txManager, betsSettlementDetails) {
        const bet = await txManager
            .transaction('bets')
            .where({ marketLineId: betsSettlementDetails.marketLineId })
            .first(['betOutcome', 'betStatus']);
        if (!bet) {
            return { betOutcome: null, betStatus: null };
        }
        const { betOutcome, betStatus } = bet;
        return { betOutcome, betStatus };
    }
    async refundOnResettleBets(txManager, betsSettlementDetails) {
        const betOutcomeToReplenishBankrollBalanceStrategy = {
            [betOutcome_1.BetOutcome.WON]: 'participants."bankrollBalance" - total_bets."betAmount" - total_bets."winAmount"',
            [betOutcome_1.BetOutcome.VOID]: 'participants."bankrollBalance" - total_bets."betAmount"',
            [betOutcome_1.BetOutcome.PUSH]: 'participants."bankrollBalance" - total_bets."betAmount"',
            [betOutcome_1.BetOutcome.HALF_WON]: 'participants."bankrollBalance" - total_bets."betAmount" - total_bets."winAmount"/2',
            [betOutcome_1.BetOutcome.HALF_LOST]: 'participants."bankrollBalance" - total_bets."betAmount"/2',
        };
        const replenishBankrollBalanceStrategy = betOutcomeToReplenishBankrollBalanceStrategy[betsSettlementDetails.betOutcome];
        const betOutcomeToReplenishTotalBalanceStrategy = {
            [betOutcome_1.BetOutcome.WON]: 'participants."totalBalance" - total_bets."winAmount"',
            [betOutcome_1.BetOutcome.LOST]: 'participants."totalBalance" + total_bets."betAmount"',
            [betOutcome_1.BetOutcome.HALF_WON]: 'participants."totalBalance" - total_bets."winAmount"/2',
            [betOutcome_1.BetOutcome.HALF_LOST]: 'participants."totalBalance" + total_bets."betAmount"/2',
        };
        const replenishTotalBalanceStrategy = betOutcomeToReplenishTotalBalanceStrategy[betsSettlementDetails.betOutcome];
        const updatedParticipantBalances = await this.replanishBalancesByStrategies(txManager, betsSettlementDetails.marketLineId, replenishBankrollBalanceStrategy, replenishTotalBalanceStrategy);
        return updatedParticipantBalances;
    }
    async replanishBalancesByStrategies(txManager, marketLineId, replenishBankrollBalanceStrategy, replenishTotalBalanceStrategy) {
        const shouldReplenishBalance = !!replenishBankrollBalanceStrategy || !!replenishTotalBalanceStrategy;
        if (!shouldReplenishBalance) {
            return [];
        }
        const bothBalancesShouldBeReplenished = !!replenishBankrollBalanceStrategy && !!replenishTotalBalanceStrategy;
        const { rows } = await txManager.transaction.raw(' UPDATE contest_instance_participants as participants' +
            ' SET' +
            `${!!replenishBankrollBalanceStrategy
                ? ` "bankrollBalance" = ROUND(${replenishBankrollBalanceStrategy}, 2)`
                : ''}` +
            `${bothBalancesShouldBeReplenished ? ',' : ''}` +
            `${!!replenishTotalBalanceStrategy
                ? ` "totalBalance" = ROUND(${replenishTotalBalanceStrategy}, 2)`
                : ''}` +
            ' FROM (' +
            '     SELECT ' +
            '         contest_instances."contestId", ' +
            '         bets."contestInstanceId", ' +
            '         bets."userId", ' +
            '         SUM(bets."betAmount") as "betAmount", ' +
            '         SUM(bets."winAmount") as "winAmount" ' +
            '     FROM bets ' +
            '         INNER JOIN contest_instances ON ' +
            '             bets."contestInstanceId" ' +
            '             =' +
            '             contest_instances.id' +
            '     WHERE bets."marketLineId" = ?' +
            '     GROUP BY contest_instances."contestId", ' +
            '             bets."contestInstanceId",' +
            '             bets."userId"' +
            ' ) as total_bets' +
            ' WHERE participants."contestInstanceId" = total_bets."contestInstanceId"' +
            '       AND participants."userId" = total_bets."userId"' +
            ' RETURNING total_bets."contestId", participants."contestInstanceId",' +
            '           participants."userId" as "userId", participants."bankrollBalance",' +
            '           participants."totalBalance"', [marketLineId]);
        return rows;
    }
    async getParticipantLeaderboard(txManager, contestInstanceId, lastPlaceNumber) {
        const where = { contestInstanceId, isExcluded: false };
        const participantsPlacesSubQ = txManager
            .transaction('contest_instance_participants')
            .select('userId')
            .rank('place', txManager.transaction.raw('ORDER BY "bankrollBalance" DESC'))
            .where(where)
            .as('participants_places');
        return txManager.transaction
            .from(participantsPlacesSubQ)
            .select('*')
            .where('participants_places.place', '<=', lastPlaceNumber)
            .orderBy('participants_places.place');
    }
    async getContestAndParticipantsDetailsByInstanceId(instanceId) {
        return this.knex('contest_instance_participants')
            .innerJoin('contest_instances', 'contest_instance_participants.contestInstanceId', 'contest_instances.id')
            .innerJoin('contests', 'contests.id', 'contest_instances.contestId')
            .innerJoin('currencies', 'currencies.id', 'contests.entryCurrency')
            .innerJoin('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
            .where('contest_instances.id', '=', instanceId)
            .select([
            'contest_instance_participants.*',
            'contests.contestName',
            'contests.entryFee',
            'currencies.currency',
            'fixtures.name as fixtureName',
        ]);
    }
    async getUsersByInstanceId(instanceId) {
        return this.knex('contest_instance_participants')
            .select('users.*')
            .innerJoin('users', 'contest_instance_participants.userId', 'users.id')
            .where('contest_instance_participants.contestInstanceId', '=', instanceId);
    }
    async getUsersByContestId(contestId) {
        return this.knex('contest_instance_participants')
            .select('users.*', 'contest_instances.id as contestInstanceId')
            .innerJoin('contest_instances', 'contest_instance_participants.contestInstanceId', 'contest_instances.id')
            .innerJoin('users', 'contest_instance_participants.userId', 'users.id')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .where('contests.id', '=', contestId);
    }
    async getContestInstanceStatus(instanceId, trx) {
        return trx
            .transaction('contest_instances')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', 'contest_instances.status')
            .where('contest_instances.id', '=', instanceId)
            .first('contest_instance_statuses.status');
    }
    async isUserParticipant(instanceId, userId) {
        return this.knex('contest_instance_participants')
            .where('contest_instance_participants.contestInstanceId', '=', instanceId)
            .where('contest_instance_participants.userId', '=', userId)
            .first('id');
    }
    async isParticipantExcluded(participantid, instanceId) {
        return this.knex
            .select('isExcluded')
            .from('contest_instance_participants')
            .where({ userId: participantid, contestInstanceId: instanceId })
            .first('isExcluded');
    }
    async excludeParticipant(participantId, instanceId, reasonOfExclude, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || txManager.knex;
        return conn('contest_instance_participants')
            .update({ isExcluded: true, reasonOfExclude })
            .where({ userId: participantId, contestInstanceId: instanceId });
    }
    async decrementInstanceValues(instanceId, txManager, value, fieldToDecrement) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || txManager.knex;
        return conn('contest_instances')
            .decrement(fieldToDecrement, value || 1)
            .where({ id: instanceId });
    }
    async getUserById(userId) {
        return this.knex('users').first().where({ id: userId });
    }
    getParticipantBetInfo(marketLineId) {
        return this.knex('bets')
            .innerJoin('contest_instances', 'contest_instances.id', '=', 'bets.contestInstanceId')
            .innerJoin('contests', 'contests.id', '=', 'contest_instances.contestId')
            .select('marketName', 'lineName', 'userId', 'contestName', 'contests.id as contestId', 'bets.contestInstanceId', 'bets.winAmount as winAmount')
            .where('bets.marketLineId', '=', marketLineId);
    }
    getUserNotificationsStatus(userId) {
        return this.knex('users')
            .select('notificationsEnabled')
            .where({ id: userId })
            .first();
    }
    viewParticipantBets(contestInstanceId, userId, page, size, orderBy, direction) {
        return this.knex('bets')
            .innerJoin('prices', 'bets.marketLineId', '=', 'prices.marketLineId')
            .select('betTime', 'marketName', 'lineName', 'betAmount as risk', 'winAmount', 'betStatus', 'betOutcome', 'priceId', 'americanOdds as odds', 'bets.id as betId', this.knex.raw('count(*) over() as "fullCount"'))
            .where({ contestInstanceId, userId })
            .orderBy(orderBy, direction)
            .limit(Number(size))
            .offset((Number.parseInt(page, 10) - 1) * Number(size));
    }
    getUserAsParticipantInstances(userId, deleteTime) {
        const query = this.knex('contest_instance_participants')
            .innerJoin('contest_instances', 'contest_instances.id', '=', 'contest_instance_participants.contestInstanceId')
            .innerJoin('contests', 'contest_instances.contestId', '=', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', '=', 'contest_instances.status')
            .select('contest_instances.contestId', 'contest_instances.id as instanceId')
            .distinct()
            .where(function (builder) {
            builder
                .whereIn('contest_instance_statuses.status', [
                contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
                contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
                contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
            ])
                .orWhereRaw(`contest_instance_statuses."status" in ('finished','cancelled') and  (contest_instances."endTime" +  :deleteTime * '1 minutes'::interval)  > Now()`, { deleteTime });
        })
            .andWhere('contest_instance_participants.userId', '=', userId);
        return query;
    }
    getContestInstanceParticipantInfo(userId, contestInstanceId) {
        return this.knex('contest_instance_participants')
            .where({ userId, contestInstanceId })
            .first();
    }
    async getFixtureAndContestNameByContestId(contestId) {
        return this.knex('contests')
            .innerJoin('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
            .where({ 'contests.id': contestId })
            .first()
            .select([
            'fixtures.name as fixtureName',
            'contests.contestName as contestName',
        ]);
    }
};
ContestInstanceParticipantsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], ContestInstanceParticipantsRepository);
exports.ContestInstanceParticipantsRepository = ContestInstanceParticipantsRepository;
//# sourceMappingURL=contest-instance-participants.repository.js.map