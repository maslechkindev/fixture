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
exports.WinnersRewardingService = void 0;
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const balance_service_1 = require("../../balance/balance.service");
const contestPrizeType_enum_1 = require("../../contest/enums/contestPrizeType.enum");
const firestoreTransactionOptions_1 = require("../../integrations/firebase/firestore/interfaces/firestoreTransactionOptions");
const win_amount_calculation_service_1 = require("./win-amount-calculation.service");
const format_1 = require("../../../helpers/common/format");
const templateGeneratorType_1 = require("../../fixture/types/templateGeneratorType");
const balance_repository_1 = require("../../balance/balance.repository");
let WinnersRewardingService = class WinnersRewardingService {
    constructor(winAmountCalculationService, balanceService) {
        this.winAmountCalculationService = winAmountCalculationService;
        this.balanceService = balanceService;
    }
    async rewardWinners(txManager, contestInstanceId, prizeDetails, contestName, options, fixtureName, templateGenerator, instanceStatus) {
        if (prizeDetails.prizeType === contestPrizeType_enum_1.ContestPrizeType.REAL_MONEY ||
            prizeDetails.prizeType === contestPrizeType_enum_1.ContestPrizeType.TOKENS) {
            const participantWinAmounts = await this.winAmountCalculationService.calculateParticipantWinAmounts(txManager, contestInstanceId, prizeDetails);
            const updateWinnerBalancesBatch = participantWinAmounts.map(({ userId, winAmount, currency, place }) => this.balanceService.changeBalance(txManager, {
                userId,
                amount: Number(winAmount),
                currency,
                transactionType: balance_repository_1.TRANSACTION_TYPES.MANUAL,
                transactionName: templateGenerator && instanceStatus
                    ? templateGenerator({
                        place,
                        instanceStatus,
                        contestName,
                        fixtureName,
                    })
                    : `${(0, format_1.formatOrdinals)(place)} place winning in ${prizeDetails.fixtureName} - ${contestName} contest`,
            }));
            await Promise.all(updateWinnerBalancesBatch);
            await this.balanceService.syncFirestoreUsersBalances(txManager, participantWinAmounts.map(({ userId }) => userId), { writeBatch: options.writeBatch });
        }
    }
};
WinnersRewardingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [win_amount_calculation_service_1.WinAmountCalculationService,
        balance_service_1.BalanceService])
], WinnersRewardingService);
exports.WinnersRewardingService = WinnersRewardingService;
//# sourceMappingURL=winners-rewarding.service.js.map