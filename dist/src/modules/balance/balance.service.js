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
var BalanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const firestoreTransactionOptions_1 = require("../integrations/firebase/firestore/interfaces/firestoreTransactionOptions");
const balance_repository_1 = require("./balance.repository");
const firestore_service_1 = require("../integrations/firebase/firestore/firestore.service");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
const cms_service_1 = require("../integrations/cms/cms.service");
const userBalancesRecord_1 = require("../../interfaces/entities/userBalancesRecord");
const recursivePartial_1 = require("../../helpers/recursivePartial");
let BalanceService = BalanceService_1 = class BalanceService {
    constructor(firestoreService, balanceRepository, cmsService, transactionManager) {
        this.firestoreService = firestoreService;
        this.balanceRepository = balanceRepository;
        this.cmsService = cmsService;
        this.transactionManager = transactionManager;
        this.logger = new common_1.Logger(BalanceService_1.name);
    }
    async setupTokenBalance(txManager, userId) {
        const result = this.balanceRepository.setupTokenBalance(txManager, userId);
        return result;
    }
    async setupRealMoneyBalance(txManager, userId) {
        const result = this.balanceRepository.setupRealMoneyBalance(txManager, userId);
        return result;
    }
    async syncFirestoreUsersBalances(txManager, userIds, options) {
        return Promise.all(userIds.map(async (userId) => {
            this.logger.log(`syncFirestoreUsersBalances: point_1, ${userId}`);
            const { tokenBalance, realMoneyBalance } = await this.balanceRepository.getUserBalancesAmounts(txManager, userId, true);
            this.logger.debug(`syncFirestoreUsersBalances: point_2, ${userId}`);
            const firestoreUserBalance = { tokenBalance, realMoneyBalance };
            this.logger.debug(`syncFirestoreUsersBalances: point_3, ${userId} ${Boolean(txManager)} ${JSON.stringify(options)}`);
            if (options === null || options === void 0 ? void 0 : options.writeBatch) {
                this.logger.debug(`syncFirestoreUsersBalances: point_4, ${userId} ${Boolean(txManager)}`);
                this.firestoreService.transactionalMergeUpdate('users', userId, firestoreUserBalance, { writeBatch: options === null || options === void 0 ? void 0 : options.writeBatch });
                this.logger.debug(`syncFirestoreUsersBalances: point_5, ${userId} ${JSON.stringify(firestoreUserBalance)}`);
            }
            else {
                this.logger.debug(`syncFirestoreUsersBalances: point_6, ${userId} ${JSON.stringify(firestoreUserBalance)}`);
                await this.firestoreService.mergeUpdate('users', userId, firestoreUserBalance);
                this.logger.debug(`syncFirestoreUsersBalances: point_7, ${userId} ${JSON.stringify(firestoreUserBalance)}`);
            }
            this.logger.debug(`syncFirestoreUsersBalances: point_8, ${userId}`);
        }));
    }
    async rewardTransactions(txManager, userId) {
        const result = this.balanceRepository.setupRewardTransactions(txManager, userId);
        return result;
    }
    async promoCodeUsedReward(txManager, userId) {
        return this.balanceRepository.promoCodeUsedReward(txManager, userId);
    }
    async changeUsernameReward(txManager, userId) {
        await this.balanceRepository.changeUsernameReward(txManager, userId);
    }
    async fillPersonalDetailsReward(txManager, userId) {
        return this.balanceRepository.fillPersonalDetailsReward(txManager, userId);
    }
    async getBalanceRecordByUserId(userId) {
        const defaultValueInFailureCase = false;
        const realMoneyState = await this.cmsService.getRealMoneyState(defaultValueInFailureCase);
        return this.balanceRepository.getUserBalances(null, userId, false, realMoneyState);
    }
    async getUserTransactions(userId, params, filters) {
        const defaultValueInFailureCase = false;
        const realMoneyState = await this.cmsService.getRealMoneyState(defaultValueInFailureCase);
        return this.balanceRepository.getUserTransactions(userId, params, filters, false, realMoneyState);
    }
    async changeBalance(txManager, balanceChangeDetailsDetails) {
        return this.balanceRepository.changeBalance(txManager, balanceChangeDetailsDetails);
    }
    async manualReplenishUserBalance(replenish) {
        const txManager = await this.transactionManager.begin();
        try {
            const balance = await this.balanceRepository.manualReplenishUserBalance(txManager, replenish);
            await this.syncFirestoreUsersBalances(txManager, [replenish.userId]);
            await txManager.commit();
            return balance;
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
};
BalanceService = BalanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService,
        balance_repository_1.BalanceRepository,
        cms_service_1.CmsService,
        transaction_manager_service_1.TransactionManager])
], BalanceService);
exports.BalanceService = BalanceService;
//# sourceMappingURL=balance.service.js.map