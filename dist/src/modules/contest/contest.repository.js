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
exports.ContestRepository = void 0;
const knex_1 = require("../integrations/knex");
const tables_1 = require("../../interfaces/db/tables");
const R = require("ramda");
const contestInstanceStatus_enum_1 = require("../contest-instance/enums/contestInstanceStatus.enum");
let ContestRepository = class ContestRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async createContest(contest) {
        const entryCurrency = await this.knex('currencies')
            .first()
            .select('id')
            .where({ currency: contest.entryCurrency });
        if (!entryCurrency) {
            throw new Error('Currency not found');
        }
        contest.entryCurrency = entryCurrency.id;
        const [createdContest] = await this.knex('contests')
            .insert(contest)
            .returning('*');
        return createdContest;
    }
    async getContest(txManager, contestId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('contests').select('*').first().where({ id: contestId });
    }
    async getContests(txManager, contest) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('contests').select('*').where(contest);
    }
    async getMarkets(txManager, markets) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('markets').select('*').where(markets);
    }
    async checkMaxOrderByFixture(fixtureId) {
        const { max } = await this.knex('contests')
            .max('order')
            .where({ fixtureId })
            .first();
        return max;
    }
    async getTypesForMarkets(txManager, markets) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const result = await conn('markets')
            .select(conn.raw('array_agg(distinct "typeId")'))
            .whereIn('id', markets);
        const types = R.path([0, 'array_agg'], result);
        return types ? types : [];
    }
    async getMarketsForMarketTypes(txManager, opts, types) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('markets').where(opts).whereIn('typeId', types);
    }
    async getMarketsByIds(txManager, opts, markets) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('markets').where(opts).whereIn('id', markets);
    }
    async getContestInstancesByContestId(contestId, params) {
        const query = this.knex('contest_instances')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', 'contest_instance_statuses.id')
            .innerJoin('contests', 'contests.id', '=', 'contest_instances.contestId')
            .select('contest_instances.id', 'contests.id as contestId', 'contests.contestName', 'currentParticipants', 'instanceNumber', 'contests.entryFee', 'contest_instance_statuses.status')
            .where({ contestId });
        const resultQuery = params !== undefined
            ? query.offset((1 - params.page) * params.size).limit(params.size)
            : query.whereIn('contest_instance_statuses.status', [
                contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
                contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
                contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
            ]);
        const result = await resultQuery;
        return result;
    }
    hideContest(contestId) {
        return this.knex('contests')
            .update({ isHidden: true })
            .where({ id: contestId });
    }
    async getContestsByFixtureId(fixtureId) {
        return this.knex('contests')
            .innerJoin('contest_instances', 'contest_instances.contestId', '=', 'contests.id')
            .innerJoin('contest_instance_statuses', 'contest_instances.status', '=', 'contest_instance_statuses.id')
            .select('contests.id', 'contest_instance_statuses.status', this.knex.raw(`count(*) over() as "contestCount"`), this.knex.raw(`sum(case
           when "contest_instance_statuses"."status" = 'cancelled' then 1 
           when "contest_instance_statuses"."status" = 'finished'  then 1 
           else 0 end)
           over() as "overedContests"`))
            .first()
            .where({ fixtureId })
            .groupBy('contests.id', 'contest_instance_statuses.status');
    }
    getFirstInstanceId(contestId) {
        return this.knex('contest_instances')
            .select('id as instanceId')
            .where({ contestId })
            .first();
    }
    getLinkInfo(contestId) {
        return this.knex('contests')
            .innerJoin('contest_instances', 'contest_instances.contestId', '=', 'contests.id')
            .select('contestOwnerPromoCode', 'contest_instances.id as instanceId')
            .first()
            .where('contest_instances.contestId', '=', contestId)
            .andWhere('contest_instances.instanceNumber', '=', 1);
    }
    async getContestsWithNoActiveMarketsFromList(contestIds) {
        const data = await this.knex('contests')
            .select('contests.id')
            .leftJoin('active_markets', 'active_markets.contestId', 'contests.id')
            .whereIn('contests.id', contestIds)
            .groupBy('contests.id')
            .havingRaw('count(active_markets.*) = 0');
        return data.map((el) => el.id);
    }
};
ContestRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], ContestRepository);
exports.ContestRepository = ContestRepository;
//# sourceMappingURL=contest.repository.js.map