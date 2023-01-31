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
var ContestInstanceParticipantsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestInstanceParticipantsService = void 0;
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const firestore_service_1 = require("../../integrations/firebase/firestore/firestore.service");
const contest_instance_participants_repository_1 = require("./contest-instance-participants.repository");
const types_1 = require("../../integrations/firebase/messages/notifications/types");
const notifications_service_1 = require("../../integrations/firebase/messages/notifications/notifications.service");
const tokens_service_1 = require("../../integrations/firebase/messages/tokens/tokens.service");
const transaction_manager_service_2 = require("../../ancillary/transaction-manager/transaction-manager.service");
const common_2 = require("@nestjs/common");
const realtime_db_service_1 = require("../../integrations/firebase/realtime-db/realtime-db.service");
const betStatus_1 = require("../enums/betStatus");
const date_fns_1 = require("date-fns");
const R = require("ramda");
const notifications_map_1 = require("../../integrations/firebase/messages/notifications/notifications.map");
const config_1 = require("../../../config");
let ContestInstanceParticipantsService = ContestInstanceParticipantsService_1 = class ContestInstanceParticipantsService {
    constructor(contestInstanceParticipantsRepository, firestoreService, notificationsService, tokensService, realtimeDbService, transactionManager) {
        this.contestInstanceParticipantsRepository = contestInstanceParticipantsRepository;
        this.firestoreService = firestoreService;
        this.notificationsService = notificationsService;
        this.tokensService = tokensService;
        this.realtimeDbService = realtimeDbService;
        this.transactionManager = transactionManager;
        this.logger = new common_2.Logger(ContestInstanceParticipantsService_1.name);
    }
    async replenishBalanceFromBetsToSettle(txManager, betsSettlementDetails) {
        const { betOutcome: currentBetOutcome, betStatus: currentBetStatus } = await this.contestInstanceParticipantsRepository.getBetsAndOutcomeStatus(txManager, betsSettlementDetails);
        let refundedBalances = [];
        let replenishedBalances = [];
        if (currentBetStatus === betStatus_1.BetStatus.SETTLED &&
            currentBetOutcome &&
            currentBetOutcome !== betsSettlementDetails.betOutcome) {
            this.logger.log(`OUTCOME_CHANGED_NOTIFICATION_DEBUG@ outcome on settled bet changed for such outcome ${betsSettlementDetails.marketLineId}, with outcome status ${betsSettlementDetails.betOutcome} `);
            this.logger.log(`OUTCOME_CHANGED_NOTIFICATION_DEBUG@ currentBetOutcome:${currentBetOutcome}, current betStatus:${currentBetStatus}`);
            await this.notifyUsersOutcomeChanged(betsSettlementDetails.marketLineId);
            refundedBalances =
                await this.contestInstanceParticipantsRepository.refundOnResettleBets(txManager, {
                    betOutcome: currentBetOutcome,
                    marketLineId: betsSettlementDetails.marketLineId,
                });
        }
        if (currentBetStatus !== betStatus_1.BetStatus.SETTLED) {
            replenishedBalances =
                await this.contestInstanceParticipantsRepository.replenishBalanceFromBetsToSettle(txManager, betsSettlementDetails);
        }
        const uniqueRefundedBalances = refundedBalances.filter((balance) => {
            const found = replenishedBalances.some((el) => el.userId === balance.userId &&
                el.contestInstanceId === balance.contestInstanceId &&
                el.contestId === balance.contestId);
            return !found;
        });
        return [...uniqueRefundedBalances, ...replenishedBalances];
    }
    getParticipantLeaderboard(txManager, contestInstanceId, lastPlaceNumber) {
        return this.contestInstanceParticipantsRepository.getParticipantLeaderboard(txManager, contestInstanceId, lastPlaceNumber);
    }
    async updateBalanceInFirestore(updatedParticipantBalances) {
        const fireStoreWriteBatch = this.firestoreService.initWriteBatch();
        updatedParticipantBalances.forEach((balance) => {
            this.firestoreService.transactionalMergeUpdate(`contests/${balance.contestId}/instances/${balance.contestInstanceId}/participants`, balance.userId, {
                bankrollBalance: String(balance.bankrollBalance),
                totalBalance: String(balance.totalBalance),
            }, { writeBatch: fireStoreWriteBatch });
        });
        await fireStoreWriteBatch.commit();
    }
    async notifyUsersContestInstanceStatusChange(contestInstance, notificationName) {
        const users = await this.contestInstanceParticipantsRepository.getUsersByInstanceId(contestInstance.instanceId);
        const { fixtureName } = await this.getFixtureAndContestNameByContestId(contestInstance.contestId);
        const messages = await Promise.all(users.map(async (user) => {
            const tokens = await this.tokensService.getUserTokens(user.id);
            return {
                tokens,
                userId: user.id,
                notificationsEnabled: user.notificationsEnabled,
                data: {
                    contestId: contestInstance.contestId,
                    contestInstanceId: contestInstance.instanceId,
                    contestName: contestInstance.contestName,
                    userId: user.id,
                    fixtureName,
                },
            };
        }));
        if (messages.length) {
            await this.notificationsService.sendBatch(messages, notificationName);
        }
    }
    async notifyUsersContestForceBetStart(contest, notificationName) {
        const users = await this.contestInstanceParticipantsRepository.getUsersByContestId(contest.id);
        const { fixtureName } = await this.getFixtureAndContestNameByContestId(contest.id);
        const messages = await Promise.all(users.map(async (user) => {
            const tokens = await this.tokensService.getUserTokens(user.id);
            return {
                tokens,
                userId: user.id,
                notificationsEnabled: user.notificationsEnabled,
                data: {
                    contestId: contest.id,
                    contestInstanceId: user.contestInstanceId,
                    contestName: contest.contestName,
                    fixtureName,
                },
            };
        }));
        if (messages.length > 0) {
            await this.notificationsService.sendBatch(messages, notificationName);
        }
    }
    getUserByPromoCode(promoCode) {
        return this.contestInstanceParticipantsRepository.getUserByPromoCode(promoCode);
    }
    async isUserParticipant(instanceId, user) {
        if (!user) {
            return false;
        }
        else {
            const result = await this.contestInstanceParticipantsRepository.isUserParticipant(instanceId, user.id);
            return Boolean(result);
        }
    }
    async excludeParticipant(instanceId, participantId, reasonOfExclude, contestId) {
        const { isExcluded } = await this.contestInstanceParticipantsRepository.isParticipantExcluded(participantId, instanceId);
        if (isExcluded) {
            return { isExcluded, userId: participantId };
        }
        const txManager = await this.transactionManager.begin();
        try {
            await this.contestInstanceParticipantsRepository.excludeParticipant(participantId, instanceId, reasonOfExclude, txManager);
            await this.contestInstanceParticipantsRepository.decrementInstanceValues(instanceId, txManager, 1, 'currentParticipants');
            await txManager.commit();
        }
        catch (error) {
            this.logger.error(`[ excludeParticipant function] SQl transaction fails with ${JSON.stringify(error)}`);
            await txManager.rollback(error);
            throw error;
        }
        try {
            const writeBatch = this.firestoreService.initWriteBatch();
            this.firestoreService.transactionalMergeUpdateWithIncrement(`contests/${contestId}/instances`, instanceId, 'currentParticipants', { incrementValue: -1 }, { writeBatch });
            this.firestoreService.transactionalMergeUpdate(`contests/${contestId}/instances/${instanceId}/participants/`, participantId, { isExcluded: true, reasonOfExclude }, { writeBatch });
            await writeBatch.commit();
        }
        catch (error) {
            this.logger.error(`Firestore writeBatch fails with ${JSON.stringify(error)}`);
        }
        try {
            const { username } = await this.contestInstanceParticipantsRepository.getUserById(participantId);
            await this.realtimeDbService.push(`chats/${contestId}-${instanceId}`, {
                createdAt: Date.now(),
                text: `${username} has been excluded from the contest by SH Admin`,
                type: 'system',
            });
        }
        catch (error) {
            this.logger.error(` ${JSON.stringify(error)}`);
        }
        try {
            const userTokens = await this.tokensService.getUserTokens(participantId);
            const { fixtureName, contestName } = await this.getFixtureAndContestNameByContestId(contestId);
            const excludePushNotification = notifications_map_1.NOTIFICATIONS[types_1.NotificationEnumType.EXCLUDED_FROM_THE_CONTEST]({ reasonOfExclude, contestName, fixtureName });
            const { notificationsEnabled } = await this.contestInstanceParticipantsRepository.getUserNotificationsStatus(participantId);
            await this.notificationsService.sendSpecific(excludePushNotification, userTokens, participantId, notificationsEnabled);
        }
        catch (err) {
            this.logger.error(`${JSON.stringify(err)}`);
        }
        return { isExcluded: true, userId: participantId };
    }
    async notifyUsersWin(marketLineId) {
        const data = await this.contestInstanceParticipantsRepository.getParticipantBetInfo(marketLineId);
        if (Array.isArray(data) && !data.length) {
            return;
        }
        const parsedDataToMessages = await Promise.all(data.map(async (el) => {
            const tokens = await this.tokensService.getUserTokens(el.userId);
            const { notificationsEnabled } = await this.contestInstanceParticipantsRepository.getUserNotificationsStatus(el.userId);
            return {
                tokens,
                userId: el.userId,
                notificationsEnabled,
                data: {
                    toWinAmount: el.winAmount,
                    contestName: el.contestName,
                    userId: el.userId,
                    contestId: el.contestId,
                    instanceId: el.contestInstanceId,
                },
            };
        }));
        await this.notificationsService.sendBatch(parsedDataToMessages, types_1.NotificationEnumType.OUTCOME_WON);
    }
    async notifyUsersOutcomeChanged(marketLineId) {
        if (!config_1.default.NOTIFICATIONS.TEMPORARY_OUTCOME_CHANGED_PUSH_ENABLED) {
            return;
        }
        const data = await this.contestInstanceParticipantsRepository.getParticipantBetInfo(marketLineId);
        if (Array.isArray(data) && !data.length) {
            return;
        }
        const parsedDataToMessages = await Promise.all(data.map(async (el) => {
            const tokens = await this.tokensService.getUserTokens(el.userId);
            const { notificationsEnabled } = await this.contestInstanceParticipantsRepository.getUserNotificationsStatus(el.userId);
            const { fixtureName } = await this.getFixtureAndContestNameByContestId(el.contestId);
            return {
                tokens,
                userId: el.userId,
                notificationsEnabled,
                data: {
                    marketName: el.marketName,
                    lineName: el.lineName,
                    contestName: el.contestName,
                    userId: el.userId,
                    contestId: el.contestId,
                    instanceId: el.contestInstanceId,
                    fixtureName,
                },
            };
        }));
        await this.notificationsService.sendBatch(parsedDataToMessages, types_1.NotificationEnumType.OUTCOME_STATUS_CHANGED);
    }
    async notifyUsersContestWasCanceledByAdmin(contestInstanceId, contestName, contestId) {
        const participants = await this.contestInstanceParticipantsRepository.getUsersByInstanceId(contestInstanceId);
        const { fixtureName } = await this.getFixtureAndContestNameByContestId(contestId);
        const messages = await Promise.all(participants.map(async (participant) => {
            const { id } = participant;
            const tokens = await this.tokensService.getUserTokens(id);
            const { notificationsEnabled } = await this.contestInstanceParticipantsRepository.getUserNotificationsStatus(id);
            return {
                tokens,
                userId: id,
                notificationsEnabled,
                data: { contestName, fixtureName },
            };
        }));
        await this.notificationsService.sendBatch(messages, types_1.NotificationEnumType.CONTEST_CANCELLED_BY_ADMIN);
    }
    async viewParticipantBets(instanceId, participantId, page, size, orderBy, direction) {
        const valuesToChange = [
            'betTime',
            'marketName',
            'lineName',
            'priceId',
            'odds',
        ];
        if (orderBy === 'betName') {
            orderBy = 'marketName';
        }
        const valuesToOmit = [...valuesToChange, 'fullCount'];
        const betsInfo = await this.contestInstanceParticipantsRepository.viewParticipantBets(instanceId, participantId, page, size, orderBy, direction);
        if (!betsInfo.length) {
            return { betsInfo: [], fullCount: 0 };
        }
        const [{ fullCount }] = betsInfo;
        const parsedBetsInfo = betsInfo.map((el) => {
            const values = R.pick(valuesToChange, el);
            return Object.assign(Object.assign({}, R.omit(valuesToOmit, el)), { betTime: (0, date_fns_1.format)(values.betTime, 'MM/dd/yy hh:mm'), betName: `${values.marketName}-${values.lineName}@${values.odds > 0 ? '+' : '-'}${values.odds}` });
        });
        return { betsInfo: parsedBetsInfo, fullCount };
    }
    async changeUserNameInFireStore(userId, userName) {
        const deleteInstanceTimeout = config_1.default.EXPIRATIONS.DELETE_INSTANCE.TIMEOUT_MINUTES;
        const instances = await this.contestInstanceParticipantsRepository.getUserAsParticipantInstances(userId, deleteInstanceTimeout);
        if (!instances.length) {
            return;
        }
        await Promise.all(instances.map((instance) => {
            const { contestId, instanceId } = instance;
            const collection = `contests/${contestId}/instances/${instanceId}/participants`;
            return this.firestoreService.mergeUpdate(collection, userId, {
                username: userName,
            });
        }));
    }
    async wasUserExcluded(userId, instanceId) {
        const result = await this.contestInstanceParticipantsRepository.getContestInstanceParticipantInfo(userId, instanceId);
        if (!result) {
            return false;
        }
        const { reasonOfExclude } = result;
        return !!reasonOfExclude;
    }
    async getFixtureAndContestNameByContestId(contestId) {
        return this.contestInstanceParticipantsRepository.getFixtureAndContestNameByContestId(contestId);
    }
};
ContestInstanceParticipantsService = ContestInstanceParticipantsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contest_instance_participants_repository_1.ContestInstanceParticipantsRepository,
        firestore_service_1.FirestoreService,
        notifications_service_1.NotificationsService,
        tokens_service_1.TokensService,
        realtime_db_service_1.RealtimeDbService,
        transaction_manager_service_2.TransactionManager])
], ContestInstanceParticipantsService);
exports.ContestInstanceParticipantsService = ContestInstanceParticipantsService;
//# sourceMappingURL=contest-instance-participants.service.js.map