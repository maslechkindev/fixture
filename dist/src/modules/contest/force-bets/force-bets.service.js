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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceBetsService = void 0;
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const force_bets_repository_1 = require("./force-bets.repository");
const contest_dto_1 = require("../../integrations/cms/dto/contest.dto");
const tables_1 = require("../../../interfaces/db/tables");
let ForceBetsService = class ForceBetsService {
    constructor(forceBetsRepository) {
        this.forceBetsRepository = forceBetsRepository;
    }
    async addForceBet(txManager, forceBet, contestId, lockOdds, contestTemplateId) {
        return this.forceBetsRepository.addForceBet(txManager, forceBet, contestId, lockOdds, contestTemplateId);
    }
    async addCustomForceBet(txManager, forceBet, marketTypes, contestId, lockOdds) {
        return this.forceBetsRepository.addCustomForceBet(txManager, forceBet, marketTypes, contestId, lockOdds);
    }
    async stopForceBet(txManager, forceBetId) {
        return this.forceBetsRepository.stopForceBet(txManager, forceBetId);
    }
    async getForceBets(txManager, forceBet) {
        return this.forceBetsRepository.getForceBets(txManager, forceBet);
    }
    async lockOddsUpdateOnActiveForceBets(txManager, contests) {
        return this.forceBetsRepository.lockOddsUpdateOnActiveForceBets(txManager, contests);
    }
};
ForceBetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [force_bets_repository_1.ForceBetsRepository])
], ForceBetsService);
exports.ForceBetsService = ForceBetsService;
//# sourceMappingURL=force-bets.service.js.map