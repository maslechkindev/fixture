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
exports.BetsRepository = void 0;
const knex_1 = require("../../integrations/knex");
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
let BetsRepository = class BetsRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async setBetsStatus(txManager, betsSettlementDetails, status) {
        await txManager
            .transaction('bets')
            .update({
            betStatus: status,
            betOutcome: betsSettlementDetails.betOutcome,
        })
            .where({
            marketLineId: betsSettlementDetails.marketLineId,
        });
    }
};
BetsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], BetsRepository);
exports.BetsRepository = BetsRepository;
//# sourceMappingURL=bets.repository.js.map