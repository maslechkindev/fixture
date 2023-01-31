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
exports.ForceBetsRepository = void 0;
const knex_1 = require("../../integrations/knex");
const common_1 = require("@nestjs/common");
const contest_dto_1 = require("../../integrations/cms/dto/contest.dto");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const tables_1 = require("../../../interfaces/db/tables");
const class_transformer_1 = require("class-transformer");
let ForceBetsRepository = class ForceBetsRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async addForceBet(txManager, forceBet, contestId, lockOdds, contestTemplateId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('force_bets')
            .insert({
            contestId,
            durationMin: forceBet.durationMin,
            isActive: true,
            marketTypeId: JSON.stringify(forceBet.marketTypes.map((mt) => mt.typeId)),
            betLimit: forceBet.betLimit,
            cmsContestTemplateId: contestTemplateId,
            title: forceBet.title,
            info: forceBet.info,
            notifyInSec: forceBet.notifyInSec,
            lockOdds,
        })
            .returning('*');
    }
    async addCustomForceBet(txManager, forceBet, marketTypes, contestId, lockOdds) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('force_bets')
            .insert({
            contestId,
            durationMin: forceBet.durationMin,
            isActive: true,
            marketTypeId: JSON.stringify(marketTypes),
            betLimit: forceBet.betLimit,
            cmsInfo: JSON.stringify(Object.assign({ markets: forceBet.markets }, forceBet)),
            title: forceBet.title,
            info: forceBet.info,
            notifyInSec: forceBet.notifyInSec,
            lockOdds,
        })
            .returning('*');
    }
    async stopForceBet(txManager, forceBetId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('force_bets')
            .update({ isActive: false })
            .where({ id: forceBetId });
    }
    async getForceBets(txManager, forceBet) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const result = await conn('force_bets').select('*').where(forceBet);
        const serialized = result.map((fb) => (0, class_transformer_1.plainToClass)(tables_1.SerializedForceBet, fb));
        return serialized;
    }
    async lockOddsUpdateOnActiveForceBets(txManager, contests) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('force_bets')
            .update({ lockOdds: null })
            .where({ isActive: true })
            .whereIn('contestId', contests)
            .returning('*');
    }
};
ForceBetsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], ForceBetsRepository);
exports.ForceBetsRepository = ForceBetsRepository;
//# sourceMappingURL=force-bets.repository.js.map