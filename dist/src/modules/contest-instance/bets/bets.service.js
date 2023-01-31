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
exports.BetsService = void 0;
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const contest_instance_participants_service_1 = require("../contest-instance-participants/contest-instance-participants.service");
const bets_repository_1 = require("./bets.repository");
const realtime_db_service_1 = require("../../integrations/firebase/realtime-db/realtime-db.service");
const betStatus_1 = require("../enums/betStatus");
const betOutcome_1 = require("../enums/betOutcome");
const utils_1 = require("@sentry/utils");
let BetsService = class BetsService {
    constructor(transactionManager, betsRepository, contestInstanceParticipantsService, realtimeDbService) {
        this.transactionManager = transactionManager;
        this.betsRepository = betsRepository;
        this.contestInstanceParticipantsService = contestInstanceParticipantsService;
        this.realtimeDbService = realtimeDbService;
    }
    async settleBets(betsSettlementDetails) {
        const txManager = await this.transactionManager.begin();
        let updatedBetsStatus;
        let updatedParticipantBalances;
        try {
            updatedParticipantBalances =
                await this.contestInstanceParticipantsService.replenishBalanceFromBetsToSettle(txManager, betsSettlementDetails);
            updatedBetsStatus =
                betsSettlementDetails.betOutcome === betOutcome_1.BetOutcome.OPEN
                    ? betStatus_1.BetStatus.PENDING
                    : betStatus_1.BetStatus.SETTLED;
            await this.betsRepository.setBetsStatus(txManager, betsSettlementDetails, updatedBetsStatus);
            await txManager.commit();
        }
        catch (error) {
            await txManager.rollback();
            utils_1.logger.error(`settleBets_1: ${error.message}`);
            throw error;
        }
        try {
            if ((betsSettlementDetails.betOutcome === betOutcome_1.BetOutcome.WON ||
                betsSettlementDetails.betOutcome === betOutcome_1.BetOutcome.HALF_WON) &&
                updatedBetsStatus === betStatus_1.BetStatus.SETTLED) {
            }
            this.contestInstanceParticipantsService.updateBalanceInFirestore(updatedParticipantBalances);
            const contestInstances = new Set(updatedParticipantBalances.map((balance) => balance.contestInstanceId));
            Promise.allSettled(Array.from(contestInstances).map((contestInstance) => this.realtimeDbService.set(`contest-instances/${contestInstance}/leaderboard/lastUpdate`, Date.now())));
        }
        catch (error) {
            utils_1.logger.error(`settleBets_2: ${error.message}`);
        }
    }
};
BetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_manager_service_1.TransactionManager,
        bets_repository_1.BetsRepository,
        contest_instance_participants_service_1.ContestInstanceParticipantsService,
        realtime_db_service_1.RealtimeDbService])
], BetsService);
exports.BetsService = BetsService;
//# sourceMappingURL=bets.service.js.map