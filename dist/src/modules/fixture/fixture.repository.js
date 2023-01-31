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
exports.FixtureRepository = void 0;
const knex_1 = require("../integrations/knex");
const getActiveFixtures_dto_1 = require("./dto/getActiveFixtures.dto");
const common_1 = require("@nestjs/common");
const tables_1 = require("../../interfaces/db/tables");
const cmsContestTemplateContestType_1 = require("../../enums/cmsContestTemplateContestType");
const fixture_status_id_enum_1 = require("./enums/fixture-status-id.enum");
const contestTypes_enum_1 = require("./enums/contestTypes.enum");
const contestInstanceStatus_enum_1 = require("../contest-instance/enums/contestInstanceStatus.enum");
const marketLineStatus_enum_1 = require("../contest-instance/enums/marketLineStatus.enum");
const betStatus_1 = require("../contest-instance/enums/betStatus");
let FixtureRepository = class FixtureRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async getFixtureDetails(fixtureId) {
        return this.knex('fixtures')
            .first()
            .select('fixtures.fixtureId', 'competitions.templateId as templateId', 'fixtures.startTime as startTime', 'fixtures.currentPeriodId as currentPeriodId', 'fixtures.sportId as sportId', 'fixtures.name as fixtureName', 'fixtures.isComplete as isComplete', 'fixtures.fixtureStatusId as statusId')
            .innerJoin('competitions', 'fixtures.competitionId', 'competitions.competitionId')
            .innerJoin('fixture_statuses', 'fixtures.fixtureStatusId', 'fixture_statuses.fixtureStatusId')
            .where({ fixtureId });
    }
    async getFixturesByTemplateIdsWithFilterByStatus(templateIds, fixtureStatusId) {
        return this.knex('fixtures')
            .innerJoin('competitions', 'fixtures.competitionId', 'competitions.competitionId')
            .whereIn('templateId', templateIds)
            .where({ fixtureStatusId });
    }
    getFixtureDetailsById(id) {
        return this.knex('fixtures')
            .first()
            .select('fixtures.id as id', 'competitions.templateId as templateId', 'fixtures.startTime as startTime', 'fixtures.currentPeriodId as currentPeriodId', 'fixtures.isComplete as isComplete', 'fixtures.fixtureId as fixtureId', 'fixtures.fixtureStatusId as fixtureStatusId', 'fixtures.sportId as sportId', 'fixtures.name as fixtureName')
            .innerJoin('competitions', 'fixtures.competitionId', 'competitions.competitionId')
            .where({ 'fixtures.id': id });
    }
    getFixtures(params) {
        const { statuses } = params;
        const mappedStatuses = statuses.map((el) => '' + el);
        const query = this.knex
            .from('fixtures')
            .innerJoin('competitions', 'fixtures.competitionId', 'competitions.competitionId')
            .innerJoin('fixture_statuses', 'fixtures.fixtureStatusId', 'fixture_statuses.fixtureStatusId')
            .leftJoin('periods', 'fixtures.currentPeriodId', 'periods.periodId')
            .leftJoin('contests', 'fixtures.fixtureId', 'contests.fixtureId')
            .select('fixtures.id as id', 'fixtures.name as name', 'competitions.name as competition', 'fixtures.display as active', 'fixtures.fixtureStatusId as fixtureStatusId', 'fixtures.startTime as startTime', 'periods.name as currentPeriod', this.knex.raw('count(*) OVER() as fullcount'))
            .where(function () {
            this.where(function () {
                this.where('fixtures.isComplete', true).whereIn('fixture_statuses.fixtureStatusId', mappedStatuses);
            }).orWhere(function () {
                this.where('fixtures.isComplete', false)
                    .whereNot('fixture_statuses.fixtureStatusId', fixture_status_id_enum_1.FixtureStatusId.PENDING)
                    .whereNotNull('contests.id');
            });
        })
            .groupBy([
            'fixtures.id',
            'fixtures.startTime',
            'competitions.name',
            'periods.name',
        ])
            .orderBy(params.orderBy, params.direction)
            .limit(params.size)
            .offset((params.page - 1) * params.size);
        if (typeof params.search === 'string' && params.search.length > 0) {
            const raw = 'LOWER(:name:) like :search or LOWER(:competitionName:) like :search';
            query.where(this.knex.raw(raw, {
                name: `fixtures.name`,
                competitionName: `competitions.name`,
                search: `%${params.search.toLowerCase()}%`,
            }));
        }
        return query;
    }
    async getActiveFixtures(params) {
        const { realMoneyState } = params;
        const contestTypesParams = (params === null || params === void 0 ? void 0 : params.contestTypes)
            ? params.contestTypes.filter((el) => el.trim().length)
            : [];
        const query = this.knex
            .from('fixtures')
            .innerJoin('competitions', 'fixtures.competitionId', 'competitions.competitionId')
            .innerJoin('contests', 'contests.fixtureId', 'fixtures.fixtureId')
            .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
            .innerJoin('contest_instances', 'contest_instances.contestId', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', 'contest_instances.status')
            .leftJoin('periods', 'fixtures.currentPeriodId', 'periods.periodId')
            .innerJoin('sports', 'competitions.sportId', 'sports.sportId')
            .select('fixtures.fixtureId as fixtureId', 'fixtures.name as name', 'fixtures.isLive as isLive', 'fixtures.startTime as startTime', 'fixtures.currentPeriodId as currentPeriodId', 'periods.name as currentPeriodName', 'competitions.competitionId as competitionId', 'competitions.templateId as competitionIdCMS', 'competitions.name as competitionName', 'sports.sportIcon as sportIcon')
            .where(function () {
            this.where('contest_instance_statuses.status', '=', contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN);
            this.orWhere(function () {
                this.where('contest_instance_statuses.status', '=', contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS)
                    .andWhere('contest_instances.lateEntryPeriodPassed', '=', false)
                    .whereNotNull('contest_instances.lateEntryPeriodId');
            });
        })
            .where({ 'fixtures.display': true, 'fixtures.isComplete': true })
            .where(function () {
            if (contestTypesParams.length) {
                const modifiedContestTypesParams = !realMoneyState
                    ? contestTypesParams.filter((el) => el !== 'real_money')
                    : contestTypesParams;
                this.where('currencies.currency', 'in', modifiedContestTypesParams);
                if (contestTypesParams.includes(contestTypes_enum_1.contestType.FREE)) {
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
        });
        if (params.fixtureId) {
            query.where('fixtures.fixtureId', '=', params.fixtureId);
        }
        if (params.competitionTemplateId) {
            query.where('competitions.templateId', '=', params.competitionTemplateId);
        }
        query
            .orderBy(params.orderBy, params.direction)
            .limit(params.size)
            .offset((params.page - 1) * params.size)
            .distinct('fixtures.fixtureId');
        return query;
    }
    getFixtureById(id) {
        return this.knex('fixtures')
            .innerJoin('competitions', 'fixtures.competitionId', 'competitions.competitionId')
            .innerJoin('sports', 'fixtures.sportId', 'sports.sportId')
            .where({ 'fixtures.id': id })
            .first()
            .select([
            'fixtures.id as id',
            'fixtures.name as name',
            'fixtures.sportId as sportId',
            'fixtures.competitionId as competitionId',
            'fixtures.startTime as startTime',
            'fixtures.isLive as isLive',
            'fixtures.marketSuspensionRules as marketSuspensionRules',
            'fixtures.delay as delay',
            'fixtures.fixtureStatusId',
            'fixtures.display as display',
            'fixtures.currentPeriodId as currentPeriodId',
            'fixtures.fixtureId as fixtureId',
            'competitions.name as competition',
            'competitions.templateId as templateId',
            'sports.name as sport',
        ]);
    }
    updateFixture(id, changedFields) {
        return this.knex('fixtures').update(changedFields).where({ id });
    }
    updateFixtureMarkets(txManager, id, markets) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return Promise.all(markets.map(async (market) => {
            return conn('markets').update(market).where({ id: market.id });
        }));
    }
    countFixtureContests(fixtureId) {
        const query = this.knex('contests')
            .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
            .innerJoin('contest_instances', 'contests.id', '=', 'contest_instances.contestId')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', '=', 'contest_instance_statuses.id')
            .count('contest_instances.id')
            .where('fixtures.id', '=', fixtureId)
            .whereIn('contest_instance_statuses.status', [
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
        ]);
        return query;
    }
    async getContests(txManager, contest) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('contests').select('*').where(contest);
    }
    async getFixtureContestsByFixtureId(id, params) {
        const query = this.knex('contests')
            .innerJoin('periods', 'contests.periodId', 'periods.periodId')
            .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
            .innerJoin('contest_instances', 'contest_instances.contestId', '=', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', '=', 'contest_instances.status')
            .where('fixtures.id', '=', id)
            .select([
            'contests.id as id',
            'contests.contestName as contestName',
            'contests.type as type',
            'contests.createdAt as createdAt',
            'periods.name as period',
            'contests.order',
            this.knex.raw('(SELECT COUNT(*) FROM contest_instances WHERE "contestId" = contests.id) as "instancesNumber"'),
            this.knex.raw('COUNT(*) OVER() as fullcount'),
        ])
            .orderBy(params.orderBy, params.direction)
            .limit(params.size)
            .offset((params.page - 1) * params.size);
        if (typeof params.search === 'string' && params.search.length > 0) {
            const raw = 'LOWER(:name:) like :search';
            query.where(this.knex.raw(raw, {
                name: `contests.contestName`,
                search: `%${params.search.toLowerCase()}%`,
            }));
        }
        return query;
    }
    async getFixtureMarketsByFixtureId(fixtureId, params) {
        const isActiveClause = [
            this.knex('active_markets')
                .distinct('active_markets.marketId')
                .join('contests', 'contests.id', 'active_markets.contestId')
                .join('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
                .where('fixtures.id', fixtureId),
        ];
        return this.knex
            .with('markets_alias', this.knex('markets')
            .innerJoin('fixtures', 'markets.fixtureId', 'fixtures.fixtureId')
            .leftJoin('market_lines_market_relations', 'market_lines_market_relations.marketId', 'markets.marketId')
            .leftJoin('market_lines', 'market_lines.marketLineId', 'market_lines_market_relations.marketLineId')
            .leftJoin('bets', 'bets.marketId', 'markets.marketId')
            .where('fixtures.id', fixtureId)
            .select([
            'markets.id as id',
            'markets.name as name',
            'markets.fixturePeriodId as fixturePeriodId',
            'markets.order as order',
            'markets.toggle as toggle',
            'markets.marketId as marketId',
            'markets.typeId as typeId',
            this.knex.raw('ARRAY_AGG(market_lines."statusId") as "marketLineStatuses"'),
            this.knex.raw('ARRAY_AGG(bets."betStatus") as "betStatuses"'),
        ])
            .groupBy('markets.id'))
            .select([
            '*',
            this.knex.raw('markets_alias."marketId" in (??) as "isActive"', isActiveClause),
            this.knex.raw(`?=ANY("marketLineStatuses") and ?=ANY("betStatuses") as "withPendingBets"`, [marketLineStatus_enum_1.MarketLineStatus.UNKNOWN_BUT_RESOLVED, betStatus_1.BetStatus.PENDING]),
            this.knex.raw('COUNT(*) OVER() as fullcount'),
        ])
            .from('markets_alias')
            .whereRaw('markets_alias."marketId" in (??)', isActiveClause)
            .orWhere((builder) => {
            builder
                .whereRaw(`?=ANY("marketLineStatuses")`, [
                marketLineStatus_enum_1.MarketLineStatus.UNKNOWN_BUT_RESOLVED,
            ])
                .whereRaw(`?=ANY("betStatuses")`, [betStatus_1.BetStatus.PENDING]);
        })
            .limit(params.size)
            .offset((params.page - 1) * params.size)
            .orderBy('withPendingBets', 'ASC')
            .orderBy(params.orderBy, params.direction);
    }
    async getMarketLinesForMarket(marketId, fixtureId) {
        return this.knex('market_lines')
            .innerJoin('market_lines_market_relations', 'market_lines_market_relations.marketLineId', 'market_lines.marketLineId')
            .innerJoin('fixtures', 'fixtures.fixtureId', 'market_lines.fixtureId')
            .innerJoin('markets', 'markets.marketId', 'market_lines_market_relations.marketId')
            .where({
            'markets.id': marketId,
            'fixtures.id': fixtureId,
        })
            .select([
            'market_lines.marketLineId as marketLineId',
            'market_lines.status as status',
            'market_lines.name as name',
            'market_lines.id as id',
        ]);
    }
    async updateMarketLineStatusManual(marketLineId, statusId) {
        const status = await this.knex('market_line_statuses')
            .first()
            .where({ marketLineStatusId: statusId });
        return this.knex('market_lines')
            .update({ statusId, status: status.name, settledManually: true })
            .where({ marketLineId });
    }
    async getCmsMarketsForFixtureContestFreeBets(id) {
        return this.knex('fixtures')
            .join('contests', 'fixtures.fixtureId', 'contests.fixtureId')
            .join('force_bets', 'contests.id', 'force_bets.contestId')
            .where({ 'fixtures.id': id, 'force_bets.isActive': true })
            .select('force_bets.cmsInfo as cmsInfo')
            .first();
    }
    async getAllFixtureContests(fixtureId) {
        return this.knex('contests').select('id', 'periodId').where({ fixtureId });
    }
    async getFixtureStatusIdAndCurrentPeriodId(fixtureId) {
        const fixtureStatusIdAndCurrentPeriodId = await this.knex('fixtures')
            .first('fixtureStatusId', this.knex.ref('currentPeriodId').as('fixtureCurrentPeriodId'))
            .where({ fixtureId });
        return fixtureStatusIdAndCurrentPeriodId;
    }
    async getAllFixturePeriods() {
        return this.knex('periods').select(['name', 'periodId', 'parentId']);
    }
    async getFixtureCustomContestIds(id) {
        const result = await this.knex('contests')
            .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
            .where('fixtures.id', '=', id)
            .whereIn('contests.type', [
            cmsContestTemplateContestType_1.CmsContestTemplateContestType.CUSTOM,
            cmsContestTemplateContestType_1.CmsContestTemplateContestType.PERSONAL,
        ])
            .select('contests.cmsContestTemplateId as cmsContestTemplateId');
        return result.map((contest) => contest.cmsContestTemplateId);
    }
    async getFixtureContestById(fixtureId, contestId) {
        const contest = this.knex('contests')
            .innerJoin('contest_instances', 'contests.id', '=', 'contest_instances.contestId')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', '=', 'contest_instances.status')
            .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
            .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
            .select([
            'contests.id as id',
            'contests.contestName as contestName',
            'contests.minParticipants as minParticipants',
            'contests.maxParticipants as maxParticipants',
            'contests.bankrollAmount as bankrollAmount',
            'contests.contestName as contestName',
            'contests.fixtureId as fixtureId',
            'contests.cmsContestTemplateId as cmsContestTemplateId',
            'contests.type as type',
            'contests.contestOwnerResourceLink as contestOwnerResourceLink',
            'contests.contestOwnerLabelName as contestOwnerLabelName',
            'contests.streamLive as streamLive',
            'fixtures.name as fixtureName',
            'currencies.currency as productType',
            'contest_instances.createdAt',
        ])
            .where('contests.id', '=', contestId)
            .andWhere('fixtures.id', '=', fixtureId)
            .first();
        const result = await contest;
        return result;
    }
    async updateFixtureContestById(contestId, updateData) {
        return this.knex('contests').update(updateData).where({ id: contestId });
    }
    async updateContestInstancesByContestId(contestId, updateData) {
        return this.knex('contest_instances')
            .update(updateData)
            .where({ contestId });
    }
    getActiveContestInstancesByFixtureId(fixtureId) {
        return this.knex('fixtures')
            .innerJoin('contests', 'contests.fixtureId', '=', 'fixtures.fixtureId')
            .innerJoin('contest_instances', 'contest_instances.contestId', '=', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instance_statuses.id', 'contest_instances.status')
            .select('contest_instances.id', 'contest_instances.contestId', 'contests.contestName', 'contest_instance_statuses.status as status', 'contests.entryFee', 'fixtures.name as fixtureName')
            .where('fixtures.id', '=', fixtureId)
            .whereIn('contest_instance_statuses.status', [
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
        ]);
    }
    updateContests(contests) {
        const updatedContest = contests.map((contest) => this.knex('contests')
            .update({ order: contest.order })
            .where({ id: contest.id }));
        return updatedContest;
    }
    updateContestsOrder(contestId, order) {
        return this.knex('contests').update({ order }).where({ id: contestId });
    }
    setActiveMarket(marketId, contestId) {
        return this.knex('active_markets').insert({ marketId, contestId });
    }
    deleteActiveMarket(marketId, contestId) {
        return this.knex('active_markets').where({ marketId, contestId }).del();
    }
};
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getActiveFixtures_dto_1.GetActiveFixturesRequestDto]),
    __metadata("design:returntype", Promise)
], FixtureRepository.prototype, "getActiveFixtures", null);
FixtureRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], FixtureRepository);
exports.FixtureRepository = FixtureRepository;
//# sourceMappingURL=fixture.repository.js.map