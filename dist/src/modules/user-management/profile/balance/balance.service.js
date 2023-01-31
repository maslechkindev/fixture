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
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("../../../integrations/cms/cms.service");
const balance_repository_1 = require("./balance.repository");
let BalanceService = class BalanceService {
    constructor(balanceRepository, cmsService) {
        this.balanceRepository = balanceRepository;
        this.cmsService = cmsService;
    }
    async getLatestUserTransactions(userId, transactionsCount) {
        const defaultValueInFailureCase = false;
        const isRealMoneyEnabled = await this.cmsService.getRealMoneyState(defaultValueInFailureCase);
        return this.balanceRepository.getLatestUserTransactions(userId, transactionsCount, !isRealMoneyEnabled);
    }
    async getUserTokenTransactions(userId, params) {
        return await this.balanceRepository.getUserTokenTransactions(userId, params);
    }
    async getUserRealMoneyTransactions(userId, params) {
        return await this.balanceRepository.getUserRealMoneyTransactions(userId, params);
    }
};
BalanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [balance_repository_1.BalanceRepository,
        cms_service_1.CmsService])
], BalanceService);
exports.BalanceService = BalanceService;
//# sourceMappingURL=balance.service.js.map