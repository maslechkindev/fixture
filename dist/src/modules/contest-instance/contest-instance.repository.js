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
exports.ContestInstanceRepository = void 0;
const R = require("ramda");
const common_1 = require("@nestjs/common");
const knex_1 = require("../integrations/knex");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
const contestInstanceStatus_enum_1 = require("./enums/contestInstanceStatus.enum");
const betStatus_1 = require("./enums/betStatus");
const contestTypes_enum_1 = require("../fixture/enums/contestTypes.enum");
let ContestInstanceRepository = class ContestInstanceRepository {
    constructor(knex) {
        this.knex = knex;
        this.logger = new common_1.Logger(ContestInstanceRepository.name);
        this.cache = {
            contestInstanceStatuses: {},
        };
    }
    async createContestInstance(txManager, contestInstance) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const statusId = await this.getContestInstanceStatusId(contestInstance.status);
        if (!statusId) {
            throw new Error('Status not found');
        }
        contestInstance.status = statusId;
        return conn('contest_instances')
            .insert(contestInstance)
            .returning([
            'id',
            'instanceNumber',
            'instanceName',
            'currentParticipants',
            'leavingAllowed',
            'createdAt',
            'endTime',
            'lateEntryPeriodPassed',
        ]);
    }
    async getContestInstanceDetails(contestInstanceId) {
        const contestInstanceDetails = await this.knex('contest_instances')
            .where('contest_instances.id', '=', contestInstanceId)
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
            .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
            .first('contest_instances.instanceName', 'contest_instance_statuses.status', this.knex.ref('contests.id').as('contestId'), 'contests.maxParticipants', 'contests.entryFee', 'contests.leavingAllowed as contestLeavingAllowed', 'contest_instances.leavingAllowed', 'contest_instances.lateEntryPeriodId', 'contest_instances.currentParticipants', 'contest_instances.lateEntryPeriodPassed', 'currencies.currency', 'contests.bankrollAmount', 'contests.minParticipants', 'contests.registrationStartTime', 'contests.registrationStartPeriodId', 'fixtures.startTime', 'fixtures.rootPeriodId', 'fixtures.currentPeriodId', 'fixtures.name as fixtureName', 'contest_instances.instanceNumber', 'contests.fixtureId', 'contests.cmsContestTemplateId', 'contests.prizeType', 'contests.prizeWinnerShare', 'contests.contestName', 'contests.balanceLong as balanceLong');
        if (!contestInstanceDetails) {
            return null;
        }
        return Object.assign({ entryFeeDetails: {
                entryFee: contestInstanceDetails.entryFee,
                currency: contestInstanceDetails.currency,
            } }, R.omit(['entryFee', 'currency'], contestInstanceDetails));
    }
    async getParticipantsInfoByInstanceId(contestInstanceId, page, size, search) {
        const query = this.knex('contest_instance_participants')
            .innerJoin('users', 'users.id', 'contest_instance_participants.userId')
            .innerJoin('contest_instances', 'contest_instances.id', 'contest_instance_participants.contestInstanceId')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', 'contest_instances.status')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('fixtures', 'fixtures.fixtureId', '=', 'contests.fixtureId')
            .select('contests.id as contestId', 'contest_instance_participants.isExcluded', 'contest_instance_participants.reasonOfExclude', 'contest_instances.id as instanceId', 'contest_instance_participants.userId', 'contest_instance_participants.totalBalance', 'users.username', 'contest_instance_statuses.status', 'fixtures.name as fixtureName', 'contests.contestName', this.knex.raw('rank() over(partition by "contest_instances"."id" order by "totalBalance" desc ) as "place"'), this.knex.raw(`count(*) over() as fullcount`), 'contests.prizeType', 'contests.prizeWinnerShare')
            .where({ contestInstanceId })
            .offset((page - 1) * size)
            .orderByRaw('(case when "isExcluded" is true then 1 when "isExcluded" is false then 0 end) asc')
            .orderBy('contest_instance_participants.totalBalance', 'desc')
            .orderBy('contest_instance_participants.createdAt', 'asc');
        if (search) {
            query.andWhereRaw(`"users"."username" like '%${search}%'`);
        }
        const result = await query;
        return result;
    }
    getPrizeContestInstanceDetails(contestInstanceId) {
        return this.knex('contest_instances')
            .where('contest_instances.id', '=', contestInstanceId)
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
            .first('contests.prizeType', 'contests.prizeWinnerShare', 'fixtures.name as fixtureName');
    }
    getUserRegisteredContestInstances(contestInstanceId, userId) {
        return this.knex('contest_instance_participants')
            .select('contest_instance_participants.id', 'contest_instance_participants.contestInstanceId', 'contest_instance_participants.userId as userId', 'contest_instance_participants.createdAt', 'contest_instance_participants.bankrollBalance', 'contest_instance_participants.updatedAt', 'contest_instance_participants.totalBalance')
            .innerJoin('contest_instances', 'contest_instance_participants.contestInstanceId', '=', 'contest_instances.id')
            .innerJoin('contests', 'contest_instances.contestId', '=', 'contests.id')
            .where({
            contestInstanceId,
            userId,
        });
    }
    async getContestInstanceStatusId(status) {
        var _a;
        if ((_a = this.cache) === null || _a === void 0 ? void 0 : _a.contestInstanceStatuses[status]) {
            return this.cache.contestInstanceStatuses[status];
        }
        const conn = this.knex;
        this.logger.debug(`getContestInstanceStatusId point_1: ${status}`);
        const { id } = await conn('contest_instance_statuses')
            .first('id')
            .where({ status });
        this.logger.debug(`getContestInstanceStatusId point_2: ${id}`);
        this.cache.contestInstanceStatuses[status] = id;
        return id;
    }
    async addParticipantToContestInstance(txManager, userId, contestInstanceId, bankrollBalance) {
        const conn = txManager.transaction;
        const [{ createdAt }] = await conn('contest_instance_participants')
            .insert({
            userId,
            contestInstanceId,
            bankrollBalance,
            totalBalance: bankrollBalance,
        })
            .returning(['id', 'createdAt']);
        const [{ currentParticipants: currentParticipantsAfter, leavingAllowed }] = await conn('contest_instances')
            .where({ id: contestInstanceId })
            .increment('currentParticipants', 1)
            .returning([
            'currentParticipants',
            'leavingAllowed',
        ]);
        return {
            currentParticipantsAfter,
            leavingAllowed,
            createdAt: createdAt.getTime(),
        };
    }
    async removeParticipantFromContestInstance(txManager, userId, contestInstanceId) {
        const conn = txManager.transaction;
        const [deletedParticipantId] = await conn('contest_instance_participants')
            .delete()
            .where({ userId, contestInstanceId })
            .returning('id');
        const [currentParticipantsAfter] = await conn('contest_instances')
            .where({ id: contestInstanceId })
            .decrement('currentParticipants', 1)
            .returning('currentParticipants');
        return {
            deletedParticipantId,
            currentParticipantsAfter,
        };
    }
    async getNumberOfUserRegistrationsInContest(userId, contestId) {
        const [{ count }] = await this.knex('contest_instance_participants')
            .where('contest_instance_participants.userId', '=', userId)
            .innerJoin('contest_instances', 'contest_instance_participants.contestInstanceId', 'contest_instances.id')
            .where('contest_instances.contestId', '=', contestId)
            .count('contest_instance_participants.userId');
        return Number(count);
    }
    async getNumberOfUserRegistrationsInContestInstance(userId, contestInstanceId) {
        const [{ count }] = await this.knex('contest_instance_participants')
            .where('contest_instance_participants.userId', '=', userId)
            .innerJoin('contest_instances', 'contest_instance_participants.contestInstanceId', 'contest_instances.id')
            .where('contest_instances.id', '=', contestInstanceId)
            .count('contest_instance_participants.userId');
        return Number(count);
    }
    async setContestInstanceStatus(contestInstanceId, contestInstanceStatus, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        this.logger.debug(`setContestInstanceStatus point_1: ${contestInstanceId} ${contestInstanceStatus}`);
        const contestInstanceStatusId = await this.getContestInstanceStatusId(contestInstanceStatus);
        this.logger.debug(`setContestInstanceStatus point_2: ${contestInstanceId} ${contestInstanceStatusId}`);
        const query = conn
            .raw(`
          UPDATE contest_instances ci
          SET status = :contestInstanceStatusId
          FROM (SELECT id, status FROM contest_instances WHERE id = :contestInstanceId FOR UPDATE) cib
          WHERE ci.id = cib.id
          RETURNING ci.status != cib.status AS "statusChanged"
        `, {
            contestInstanceStatusId,
            contestInstanceId,
        })
            .toString();
        console.log({ query });
        const { rows: [{ statusChanged }], } = await conn.raw(`/*${query}*/${query}`);
        this.logger.debug(`setContestInstanceStatus point_4: ${contestInstanceId}, statusChanged: ${statusChanged}`);
        return statusChanged;
    }
    async getUserContestsInstancesWithStatuses(id, limit, page, statuses, orderBy) {
        const query = this.knex
            .select('contests.fixtureId as fixtureId', 'contest_instances.contestId as contestId', 'contest_instances.endTime as endTime', 'contest_instances.id as instanceId', 'contest_instances.instanceNumber as instanceNumber', 'contest_instances.instanceName as instanceName', 'contest_instances.currentParticipants as currentParticipants', 'contests.templateId', 'contest_instance_statuses.status', 'contests.type ', 'contests.maxParticipants', 'contests.entryFee', 'contests.prizeAmount as prizeAmount', 'contests.prizeType as prizeType', 'contests.contestOwnerResourceLink as contestOwnerResourceLink', 'contests.contestOwnerLabelName as contestOwnerLabelName', 'contests.streamLive as streamLive', 'currencies.currency as entryCurrency', 'contests.prizeWinnerShare as prizeWinnerShare', 'fixtures.startTime', 'fixtures.isLive', 'fixtures.name', 'fixtures.period as currentPeriodName', 'fixtures.currentPeriodId as currentPeriodId', 'fixtures.competitionId as competitionId', 'competitions.name as competitionName', 'contest_instance_participants.createdAt as userRegistrationTime', 'sports.sportIcon as sportIcon')
            .from('contest_instance_participants')
            .innerJoin('contest_instances', 'contest_instances.id', '=', 'contest_instance_participants.contestInstanceId')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', '=', 'contest_instances.status')
            .innerJoin('contests', 'contests.id', '=', 'contest_instances.contestId')
            .innerJoin('fixtures', 'fixtures.fixtureId', '=', 'contests.fixtureId')
            .innerJoin('currencies', 'contests.entryCurrency', '=', 'currencies.id')
            .innerJoin('competitions', 'fixtures.competitionId', '=', 'competitions.competitionId')
            .innerJoin('sports', 'competitions.sportId', '=', 'sports.sportId')
            .where({ userId: id })
            .andWhere(function () {
            if (statuses.includes('finished')) {
                this.whereRaw(`"contest_instances"."endTime" >= now() - interval '7 days' and "contest_instance_statuses"."status" = 'finished'`);
                if (statuses.length > 1) {
                    const statusesWithoutFinished = statuses.filter((el) => el !== 'finished');
                    this.orWhereIn('contest_instance_statuses.status', statusesWithoutFinished);
                }
            }
            else {
                this.whereIn('contest_instance_statuses.status', statuses);
            }
        })
            .orderByRaw(orderBy)
            .limit(limit)
            .offset((page - 1) * limit);
        const result = await query;
        return result;
    }
    async getContestInstancesRank(contestInstances, userId) {
        const userRank = this.knex
            .select('*')
            .from(this.knex
            .select('contestInstanceId', 'userId', 'totalBalance', this.knex.raw(`rank() over(partition by "contestInstanceId" order by "totalBalance" desc) as "place"`))
            .as('userRankTable')
            .from('contest_instance_participants')
            .innerJoin('contest_instances', 'contest_instance_participants.contestInstanceId', '=', 'contest_instances.id')
            .whereIn('contest_instances.id', contestInstances))
            .where({ userId });
        const result = await userRank;
        return result;
    }
    async getActiveContestInstances(fixtureId, periodId, contestTypesParams, realMoneyState) {
        const query = this.knex('contest_instances')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
            .innerJoin('periods', 'contests.periodId', 'periods.periodId')
            .where(function () {
            const modifiedContestTypesParams = contestTypesParams.length && !realMoneyState
                ? contestTypesParams.filter((el) => el !== 'real_money')
                : contestTypesParams;
            if (modifiedContestTypesParams.length) {
                this.andWhere('currencies.currency', 'in', modifiedContestTypesParams);
                if (modifiedContestTypesParams.includes(contestTypes_enum_1.contestType.FREE)) {
                    this.orWhere('contests.entryFee', '=', 0);
                }
                else {
                    this.andWhere('contests.entryFee', '>', 0);
                }
                return;
            }
            if (!realMoneyState) {
                this.andWhere('currencies.currency', '=', 'token');
            }
        })
            .select([
            'contest_instances.contestId as contestId',
            'contest_instances.id as instanceId',
            'contest_instances.instanceNumber as instanceNumber',
            'contest_instances.instanceName as instanceName',
            'contest_instances.currentParticipants as currentParticipants',
            'contests.templateId as templateId',
            'contests.type as type',
            'contest_instances.lateEntryPeriodPassed',
            'contests.maxParticipants as maxParticipants',
            'contests.entryFee as entryFee',
            'contests.prizeAmount as prizeAmount',
            'contests.prizeType as prizeType',
            'contests.cmsContestTemplateId as cmsContestTemplateId',
            'contests.cmsHomeVisible as cmsHomeVisible',
            'contests.contestOwnerResourceLink as contestOwnerResourceLink',
            'contests.contestOwnerLabelName as contestOwnerLabelName',
            'currencies.currency as entryCurrency',
            'periods.periodId as periodId',
            'periods.name as periodName',
        ])
            .orderBy('contests.order');
        query.andWhere('contests.fixtureId', '=', fixtureId);
        query.andWhere('contests.isHidden', '=', 'false');
        query.orderBy('contests.maxParticipants', 'asc');
        if (periodId) {
            query.andWhere('periods.periodId', '=', periodId);
        }
        query.where(function () {
            this.where('contest_instance_statuses.status', '=', contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN);
            this.orWhere(function () {
                this.where('contest_instance_statuses.status', '=', contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS)
                    .andWhere('contest_instances.lateEntryPeriodPassed', '=', false)
                    .whereNotNull('contest_instances.lateEntryPeriodId');
            });
        });
        query.orderBy('contests.maxParticipants', 'asc');
        const contestInstances = await query;
        return contestInstances;
    }
    getInstancesByFixtureId(fixtureId) {
        const query = this.knex('contest_instances')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
            .select('contest_instances.id', 'contest_instances.contestId')
            .where('fixtures.fixtureId', fixtureId)
            .where('fixtures.currentPeriodId', this.knex.raw('contest_instances."lateEntryPeriodId"'))
            .whereIn('contest_instance_statuses.status', [
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
        ]);
        return query;
    }
    getInstancesByContestId(contestId) {
        const query = this.knex('contest_instances').where('contestId', contestId);
        return query;
    }
    async getActiveContestInstanceIdsForContests(fixtureId) {
        const query = this.knex('contest_instances')
            .select('contest_instances.id as instanceId', 'contest_instances.contestId', 'fixtures.name as fixtureName')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .innerJoin('contests', 'contests.id', 'contest_instances.contestId')
            .innerJoin('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
            .whereIn('contest_instance_statuses.status', [
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
        ])
            .where('contests.fixtureId', '=', fixtureId);
        return query;
    }
    async updateContestInstance(contestInstanceId, update, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const query = conn('contest_instances')
            .where({ id: contestInstanceId })
            .update(update)
            .toString();
        console.log({ query });
        await conn.raw(`/*${query}*/${query}`);
    }
    async getParticipantContestInstanceInfo(contestInstanceId, userId) {
        const contestInstanceParticipant = await this.knex('contest_instance_participants')
            .where({
            contestInstanceId,
            userId,
        })
            .first()
            .select(['contestInstanceId', 'bankrollBalance', 'id']);
        return contestInstanceParticipant;
    }
    async getContestInstanceLeaderboard(contestInstanceId) {
        const query = this.knex('contest_instance_participants')
            .select([
            'users.id as userId',
            'users.username as username',
            'users.avatar as avatar',
            'contest_instance_participants.createdAt as registrationTime',
            'contest_instance_participants.totalBalance as totalBalance',
            this.knex.raw('RANK() OVER(ORDER BY "totalBalance" desc) as place'),
        ])
            .innerJoin('users', 'contest_instance_participants.userId', 'users.id');
        const where = {
            contestInstanceId,
            isExcluded: !true,
        };
        const result = query
            .where(where)
            .orderBy('contest_instance_participants.totalBalance', 'desc')
            .orderBy('users.username', 'asc');
        return result;
    }
    async getMarketLinePriceDetails(marketLineId) {
        const marketLinePrice = await this.knex('prices')
            .first()
            .where({ marketLineId })
            .select('*');
        return marketLinePrice;
    }
    async getMarketLineDetails(marketLineId, fixtureId) {
        const marketLine = await this.knex('market_lines')
            .innerJoin('market_lines_market_relations', 'market_lines_market_relations.marketLineId', 'market_lines.marketLineId')
            .innerJoin('markets', 'markets.marketId', 'market_lines_market_relations.marketId')
            .where('market_lines.marketLineId', '=', marketLineId)
            .andWhere('market_lines.fixtureId', '=', fixtureId)
            .select([
            'market_lines.marketLineId as marketLineId',
            'market_lines.name as lineName',
            'markets.marketId as marketId',
            'markets.typeId as marketTypeId',
            'markets.name as marketName',
            'market_lines.minBetLimit as minBetLimit',
            'market_lines.maxBetLimit as maxBetLimit',
        ])
            .first();
        return marketLine;
    }
    async getMarketLineFixtureId(marketLineId) {
        const marketLine = await this.knex('market_lines')
            .first('fixtureId')
            .where({ marketLineId });
        return marketLine === null || marketLine === void 0 ? void 0 : marketLine.fixtureId;
    }
    async getMarketFixtureId(marketId) {
        const market = await this.knex('markets')
            .first('fixtureId')
            .where({ marketId });
        return market === null || market === void 0 ? void 0 : market.fixtureId;
    }
    async saveBet(txManager, betInfo) {
        const conn = txManager.transaction;
        await conn('bets').insert(betInfo);
    }
    async getBetsForMarketType(txManager, betInfo, marketTypes) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('bets')
            .innerJoin('markets', 'bets.marketId', '=', 'markets.marketId')
            .select('*')
            .where(Object.assign({}, betInfo))
            .whereIn('markets.typeId', marketTypes);
    }
    async updateParticipantBalanceInfo(txManager, contestInstanceId, userId, betAmount) {
        const conn = txManager.transaction;
        const [updatedBalanceInfo] = await conn('contest_instance_participants')
            .where({ contestInstanceId, userId })
            .decrement('bankrollBalance', betAmount)
            .update({ updatedAt: new Date() })
            .returning('bankrollBalance');
        return updatedBalanceInfo;
    }
    getMaxBetLimitInfo(contestInstanceId, userId, marketLineId) {
        return this.knex('max_bet_limits')
            .where({ contestInstanceId, userId, marketLineId })
            .first()
            .select('maxBetLimit');
    }
    async updateMaxBetLimit(txManager, contestInstanceId, userId, marketLineId, maxBetLimit) {
        const conn = txManager.transaction;
        await conn
            .insert({
            contestInstanceId,
            userId,
            marketLineId,
            maxBetLimit,
        })
            .onConflict(['contestInstanceId', 'userId', 'marketLineId'])
            .merge(['maxBetLimit'])
            .into('max_bet_limits');
    }
    async getPendingBetsAmount(txManager, contestInstanceId, userId, marketLineId) {
        const conn = txManager.transaction;
        const [{ amount }] = await conn('bets')
            .where({
            contestInstanceId,
            userId,
            marketLineId,
            betStatus: betStatus_1.BetStatus.PENDING,
        })
            .sum({ amount: 'betAmount' });
        return Number(amount);
    }
    async getContestInstancesDetailsWithFilters(filters = {}) {
        const parsedFilters = Object.entries(filters).reduce((prev, [key, value]) => {
            if (key === 'fixtureId') {
                return Object.assign(Object.assign({}, prev), { 'fixtures.fixtureId': value });
            }
            return Object.assign(Object.assign({}, prev), { [key]: value });
        }, {});
        const contestInstances = await this.knex('contest_instances')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .innerJoin('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
            .where(parsedFilters)
            .select([
            'contests.id as contestId',
            'contests.periodId',
            'contests.minParticipants',
            'contests.maxParticipants',
            'contests.bankrollAmount',
            'contests.cancellationTime',
            'contests.contestName',
            'contest_instance_statuses.status',
            'contest_instances.currentParticipants',
            'contest_instances.lateEntryPeriodId',
            'contest_instances.lateEntryPeriodPassed',
            'contest_instances.id as instanceId',
            'fixtures.name as fixtureName',
        ]);
        return contestInstances;
    }
    async getContestInstancesDetailsWithFiltersInPreRun(filters = {}) {
        const contestInstances = await this.knex('contest_instances')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .where(filters)
            .whereIn('contest_instance_statuses.status', [
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
        ])
            .whereRaw('contest_instances."currentParticipants" >= contests."minParticipants"')
            .select([
            'contests.id as contestId',
            'contests.periodId',
            'contests.minParticipants',
            'contests.maxParticipants',
            'contests.bankrollAmount',
            'contests.cancellationTime',
            'contests.contestName',
            'contest_instance_statuses.status',
            'contest_instances.currentParticipants',
            'contest_instances.id as instanceId',
            'contests.fixtureId as fixtureId',
        ]);
        return contestInstances;
    }
    async updateAllParticipantsBankRollAmount(contestInstanceId, bankrollAmount, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        await conn('contest_instance_participants')
            .where({ contestInstanceId: contestInstanceId })
            .update({
            bankrollBalance: bankrollAmount,
            totalBalance: bankrollAmount,
        });
    }
    async getFixtureMarketLines(fixtureId) {
        const marketLines = await this.knex('market_lines')
            .where({ fixtureId })
            .select('*');
        return marketLines;
    }
    async getUserContestInstancesIds(userId) {
        const contestInstanceIds = await this.knex('contest_instance_participants')
            .where({ userId })
            .select('contestInstanceId');
        return contestInstanceIds;
    }
    async searchLiveContestInstances(userId, subString) {
        const statuses = [
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
        ];
        const selectFields = [
            'contest_instances.contestId as contestId',
            'contest_instances.id as instanceId',
            'contest_instances.instanceNumber as instanceNumber',
            'contest_instances.instanceName as instanceName',
            'contest_instances.currentParticipants as currentParticipants',
            'contests.maxParticipants as maxParticipants',
            'currencies.currency as entryCurrency',
            'contests.templateId as templateId',
            'contests.type as type',
            'contests.entryFee as entryFee',
            'contests.prizeAmount as prizeAmount',
            'contests.leavingAllowed as leavingAllowed',
        ];
        const contestInstancesViaFixtures = await this.knex('contest_instance_participants')
            .innerJoin('contest_instances', 'contest_instances.id', '=', 'contest_instance_participants.contestInstanceId')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
            .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .where('fixtures.name', 'like', `%${subString}%`)
            .whereIn('contest_instance_statuses.status', statuses)
            .andWhere('contest_instance_participants.userId', '=', userId)
            .select(selectFields);
        if (Array.isArray(contestInstancesViaFixtures) &&
            contestInstancesViaFixtures.length)
            return contestInstancesViaFixtures;
        const contestInstances = await this.knex('contest_instance_participants')
            .innerJoin('contest_instances', 'contest_instances.id', '=', 'contest_instance_participants.contestInstanceId')
            .innerJoin('contests', 'contest_instances.contestId', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
            .whereIn('contest_instance_statuses.status', statuses)
            .where('contest_instances.instanceName', 'like', `%${subString}%`)
            .where('contest_instance_participants.userId', '=', userId)
            .select(selectFields);
        return contestInstances;
    }
    getParticipantBets(participantId, status, contestInstanceId, page, size, sortField) {
        const pendingFields = [
            'marketName',
            'lineName',
            'americanOdds',
            'winAmount',
            'betAmount',
            'isForcedBet',
            'betTime',
        ];
        const selectedFields = status === betStatus_1.BetStatus.PENDING
            ? pendingFields
            : [...pendingFields, 'betOutcome'];
        const query = this.knex('bets')
            .select(...selectedFields)
            .where({ betStatus: status, userId: participantId, contestInstanceId })
            .offset((page - 1) * size)
            .limit(size);
        if (sortField) {
            query.orderBy(sortField, 'desc');
        }
        return query;
    }
    async getUserBalance(userId, contestInstanceId) {
        const result = await this.knex('contest_instance_participants')
            .select('totalBalance', 'bankrollBalance')
            .where({ userId, contestInstanceId })
            .first();
        return result;
    }
    async getInProgressContestInstanceIdsWithAllSettledBets(contestIds) {
        const knex = this.knex;
        const inProgressContestInstancesWithAllSettledBets = await knex('contest_instances')
            .join('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .join('contests', 'contests.id', 'contest_instances.contestId')
            .leftJoin('bets', function () {
            this.on('contest_instances.id', 'bets.contestInstanceId').andOn('bets.betStatus', '<>', knex.raw('?', [betStatus_1.BetStatus.SETTLED]));
        })
            .where('contest_instance_statuses.status', '=', contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS)
            .whereIn('contestId', contestIds)
            .groupBy([
            this.knex.ref('id').withSchema('contest_instances'),
            this.knex.ref('contestId').withSchema('contest_instances'),
            this.knex.ref('contestName').withSchema('contests'),
        ])
            .having(knex.raw('COUNT(bets.id) = 0'))
            .select(this.knex.ref('id').withSchema('contest_instances').as('instanceId'), this.knex.ref('contestId').withSchema('contest_instances'), this.knex.ref('contestName').withSchema('contests'));
        return inProgressContestInstancesWithAllSettledBets;
    }
    async getActiveMarketLines(txManager, marketId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('market_lines')
            .innerJoin('market_lines_market_relations', 'market_lines.marketLineId', 'market_lines_market_relations.marketLineId')
            .select('market_lines.*')
            .where('market_lines_market_relations.marketId', '=', marketId)
            .where('market_lines.isActive', '=', true);
    }
    updateContestInstances(instanceIds, updateData) {
        return this.knex('contest_instances')
            .whereIn('id', instanceIds)
            .update(updateData);
    }
    async getFixtureNameByContestId(contestId) {
        return this.knex('contests')
            .innerJoin('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
            .select(['fixtures.name as fixtureName'])
            .first()
            .where({ 'contests.id': contestId });
    }
};
ContestInstanceRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], ContestInstanceRepository);
exports.ContestInstanceRepository = ContestInstanceRepository;
//# sourceMappingURL=contest-instance.repository.js.map