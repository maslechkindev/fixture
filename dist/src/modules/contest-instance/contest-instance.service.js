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
var ContestInstanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestInstanceService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const tables_1 = require("../../interfaces/db/tables");
const errors_1 = require("../../helpers/errors");
const user_interface_1 = require("../../interfaces/user.interface");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
const balance_service_1 = require("../balance/balance.service");
const firestore_service_1 = require("../integrations/firebase/firestore/firestore.service");
const contest_instance_repository_1 = require("./contest-instance.repository");
const contestInstanceStatus_enum_1 = require("./enums/contestInstanceStatus.enum");
const firestoreTransactionOptions_1 = require("../integrations/firebase/firestore/interfaces/firestoreTransactionOptions");
const betStatus_1 = require("./enums/betStatus");
const betOutcome_1 = require("./enums/betOutcome");
const fixture_service_1 = require("../fixture/fixture.service");
const job_queue_service_1 = require("../ancillary/job-queue/job-queue.service");
const contest_service_1 = require("../contest/contest.service");
const date_fns_1 = require("date-fns");
const winners_rewarding_service_1 = require("./winners-rewarding/winners-rewarding.service");
const delete_service_1 = require("./delete/delete.service");
const cancel_service_1 = require("./cancel/cancel.service");
const win_amount_calculation_service_1 = require("./winners-rewarding/win-amount-calculation.service");
const realtime_db_service_1 = require("../integrations/firebase/realtime-db/realtime-db.service");
const types_1 = require("../integrations/firebase/messages/notifications/types");
const contest_instance_participants_service_1 = require("./contest-instance-participants/contest-instance-participants.service");
const cms_service_1 = require("../integrations/cms/cms.service");
const follow_service_1 = require("../user-management/follow/follow.service");
const templateGeneratorType_1 = require("../fixture/types/templateGeneratorType");
const debounce_1 = require("../../helpers/common/debounce");
const memoizedHierarchyChecker_1 = require("../../helpers/common/memoizedHierarchyChecker");
const cmsContestTemplateContestType_1 = require("../../enums/cmsContestTemplateContestType");
const balance_repository_1 = require("../balance/balance.repository");
let ContestInstanceService = ContestInstanceService_1 = class ContestInstanceService {
    constructor(contestInstanceParticipantsService, deleteContestInstanceService, cancelContestInstanceService, contestInstanceRepository, balanceService, transactionManager, firestoreService, contestService, fixtureService, winnersRewardingService, jobQueueService, winAmountCalculationService, realtimeDbService, cmsService, followService) {
        this.contestInstanceParticipantsService = contestInstanceParticipantsService;
        this.deleteContestInstanceService = deleteContestInstanceService;
        this.cancelContestInstanceService = cancelContestInstanceService;
        this.contestInstanceRepository = contestInstanceRepository;
        this.balanceService = balanceService;
        this.transactionManager = transactionManager;
        this.firestoreService = firestoreService;
        this.contestService = contestService;
        this.fixtureService = fixtureService;
        this.winnersRewardingService = winnersRewardingService;
        this.jobQueueService = jobQueueService;
        this.winAmountCalculationService = winAmountCalculationService;
        this.realtimeDbService = realtimeDbService;
        this.cmsService = cmsService;
        this.followService = followService;
        this.logger = new common_1.Logger(ContestInstanceService_1.name);
        this.runOrCancelInstanceOnChangeCurrentPeriod = async (fixtureId) => {
            const fixture = await this.fixtureService.getFixtureDetails(fixtureId);
            if (!fixture) {
                throw new Error(`Fixture not found for ${fixtureId}`);
            }
            const contestInstances = await this.contestInstanceRepository.getContestInstancesDetailsWithFilters({
                fixtureId,
            });
            const periods = await this.fixtureService.getAllFixturePeriods();
            await Promise.allSettled(contestInstances.map(async (contestInstance) => {
                const isPeriodInHierarchy = await this.checkIsInHierarchy(contestInstance.periodId, fixture.currentPeriodId, periods);
                if (!isPeriodInHierarchy) {
                    this.logger.log(`runOrCancelInstanceOnChangeCurrentPeriod: not in period hierarchy, ${contestInstance.instanceId}`);
                    return;
                }
                await this.cancelContestInstanceService.isInstanceCancel(contestInstance);
            }));
        };
        this.tryToRunInstancesOnActiveMarketChange = async (contestId, activePrice) => {
            try {
                if (!activePrice) {
                    this.logger.log('tryToRunInstancesOnActiveMarketChange: not active price');
                    return;
                }
                const contestInstances = await this.contestInstanceRepository.getContestInstancesDetailsWithFiltersInPreRun({
                    contestId,
                });
                await Promise.allSettled(contestInstances.map((contestInstance) => this.runContestInstance(contestInstance)));
            }
            catch (error) {
                this.mapError(error);
            }
        };
        this.updateParticipantBankrollBalanceInFirestore = async (collection, bankrollBalance) => {
            const userIds = await this.firestoreService.getCollectionIds(collection);
            await Promise.all(userIds.map(async (userId) => {
                await this.firestoreService.mergeUpdate(collection, userId, {
                    bankrollBalance: String(bankrollBalance),
                    totalBalance: String(bankrollBalance),
                });
            }));
        };
        this.runContestInstance = async (contestInstance) => {
            try {
                const isStatusChanged = await this.contestInstanceRepository.setContestInstanceStatus(contestInstance.instanceId, contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS);
                if (!isStatusChanged) {
                    this.logger.debug(`isInstanceInProgress: point_7, ${contestInstance.contestId}, ${contestInstance.instanceId}`);
                    return;
                }
                await this.contestInstanceRepository.updateContestInstance(contestInstance.instanceId, { leavingAllowed: false });
                const jobForPlanCancelContest = await this.jobQueueService.getJob(contestInstance.instanceId);
                if (jobForPlanCancelContest) {
                    await this.jobQueueService.cancelJob(contestInstance.instanceId);
                }
                this.logger.debug(`isInstanceInProgress: point_1, ${contestInstance.contestId}, ${contestInstance.instanceId}`);
                await this.firestoreService.mergeUpdate(`/contests/${contestInstance.contestId}/instances/`, contestInstance.instanceId, { status: contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS, leavingAllowed: false });
                (0, debounce_1.debounce)(this.contestInstanceParticipantsService.notifyUsersContestInstanceStatusChange(contestInstance, types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_IN_PROGRESS), `${types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_IN_PROGRESS}_${contestInstance.instanceId}_${contestInstance.contestId}`, 5000);
            }
            catch (error) {
                this.logger.error(`isInstanceInProgress: ${contestInstance.contestId}, ${contestInstance.instanceId}, ${error.message}, ${error.stack}`);
            }
        };
        this.checkIsInHierarchy = (0, memoizedHierarchyChecker_1.memoizedHierarchyChecker)();
    }
    async createContestInstance(txManager, contest, lateEntryPeriodId = null, instanceNumber = 1, status = 'regOpened') {
        const contestInstance = {
            contestId: contest.id,
            instanceName: contest.contestName,
            status,
            instanceNumber,
            leavingAllowed: contest.leavingAllowed,
            lateEntryPeriodId: lateEntryPeriodId,
            lateEntryPeriodPassed: lateEntryPeriodId && false,
        };
        const [result] = await this.contestInstanceRepository.createContestInstance(txManager, contestInstance);
        try {
            await this.firestoreService.set(`contests/${contest.id}/instances`, `${result.id}`, Object.assign(Object.assign({}, R.pick([
                'currentParticipants',
                'instanceName',
                'instanceNumber',
                'leavingAllowed',
                'createdAt',
                'endTime',
                'lateEntryPeriodPassed',
            ], result)), { status }));
        }
        catch (err) {
            console.error(new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.FIRESTORE_INTEGRATION_ERROR, err.message));
        }
        return result;
    }
    async setContestInstanceStatus(contestInstanceId, contestInstanceStatus, contestInstanceDetails, txManager) {
        const { contestId, registrationStartTime, registrationStartPeriodId, startTime, currentPeriodId, instanceNumber, lateEntryPeriodId, } = contestInstanceDetails;
        const updateData = {};
        if (contestInstanceStatus === contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS ||
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE) {
            updateData.leavingAllowed = false;
        }
        if (contestInstanceStatus === contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED) {
            updateData.endTime = new Date();
            updateData.leavingAllowed = false;
        }
        await this.contestInstanceRepository.setContestInstanceStatus(contestInstanceId, contestInstanceStatus, txManager);
        await this.contestInstanceRepository.updateContestInstance(contestInstanceId, updateData, txManager);
        if (contestInstanceStatus === contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE) {
            const fixtureStartTime = startTime;
            const regTime = (0, date_fns_1.subMinutes)(fixtureStartTime, registrationStartTime);
            const currentTime = new Date();
            if (((0, date_fns_1.isAfter)(currentTime, regTime) &&
                (0, date_fns_1.isBefore)(currentTime, fixtureStartTime)) ||
                currentPeriodId === registrationStartPeriodId) {
                const contest = await this.contestService.getContest(txManager, contestId);
                await this.createContestInstance(txManager, contest, lateEntryPeriodId, instanceNumber + 1);
            }
        }
    }
    async userRegisteredContestsChecker(instanceId, userId) {
        const userRegisteredContests = await this.contestInstanceRepository.getUserRegisteredContestInstances(instanceId, userId);
        if (userRegisteredContests.length) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.ALREADY_REGISTERED_TO_CONTEST);
        }
    }
    async inQueueSetter(contestInstanceId, contestInstanceDetails, txManager) {
        await this.setContestInstanceStatus(contestInstanceId, contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE, contestInstanceDetails, txManager);
        (0, debounce_1.debounce)(this.contestInstanceParticipantsService.notifyUsersContestInstanceStatusChange({
            contestId: contestInstanceDetails.contestId,
            instanceId: contestInstanceId,
            contestName: contestInstanceDetails.contestName,
        }, types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_IN_QUEUE), `${types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_IN_QUEUE}_${contestInstanceDetails.contestId}_${contestInstanceId}`, 5000);
    }
    shouldSetInQueueStatusChecker(contestInstanceDetails, currentParticipantsAfter) {
        return (contestInstanceDetails.status === contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN &&
            contestInstanceDetails.maxParticipants &&
            currentParticipantsAfter === contestInstanceDetails.maxParticipants);
    }
    isRegistrationClosedChecker(contestInstanceDetails) {
        if (contestInstanceDetails.lateEntryPeriodId) {
            switch (contestInstanceDetails.status) {
                case contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS:
                    return contestInstanceDetails.lateEntryPeriodPassed;
                case contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN:
                case contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE:
                    return false;
                case contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED:
                case contestInstanceStatus_enum_1.ContestInstanceStatus.CANCELLED:
                    return true;
            }
        }
        return ![
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
        ].includes(contestInstanceDetails.status);
    }
    isContestInstanceFullChecker(contestInstanceDetails) {
        return contestInstanceDetails.lateEntryPeriodId
            ? contestInstanceDetails.maxParticipants &&
                contestInstanceDetails.currentParticipants ===
                    contestInstanceDetails.maxParticipants
            : contestInstanceDetails.status === contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE;
    }
    mandatoryRequirementsChecker(contestInstanceDetails) {
        const isRegistrationClosed = this.isRegistrationClosedChecker(contestInstanceDetails);
        if (isRegistrationClosed) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.REGISTRATION_CLOSED);
        }
        const isContestInstanceFull = this.isContestInstanceFullChecker(contestInstanceDetails);
        if (isContestInstanceFull) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.CONTEST_INSTANCE_FULL);
        }
    }
    async getInstancesByContestId(contestId) {
        return this.contestInstanceRepository.getInstancesByContestId(contestId);
    }
    async registerParticipantToContestInstance(userDetails, contestInstanceId, overwrittenEntryFee) {
        const contestInstanceDetails = await this.contestInstanceRepository.getContestInstanceDetails(contestInstanceId);
        if (!contestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED);
        }
        this.mandatoryRequirementsChecker(contestInstanceDetails);
        const wasUserExcluded = await this.contestInstanceParticipantsService.wasUserExcluded(userDetails.id, contestInstanceId);
        if (wasUserExcluded) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.USER_EXClUDED);
        }
        await this.userRegisteredContestsChecker(contestInstanceId, userDetails.id);
        const txManager = await this.transactionManager.begin();
        try {
            const entryFeeAmount = overwrittenEntryFee || contestInstanceDetails.entryFeeDetails.entryFee;
            await this.balanceService.changeBalance(txManager, {
                userId: userDetails.id,
                amount: -1 * entryFeeAmount,
                currency: contestInstanceDetails.entryFeeDetails.currency,
                transactionName: `Entry to ${contestInstanceDetails.fixtureName} - ${contestInstanceDetails.instanceName}`,
                transactionType: balance_repository_1.TRANSACTION_TYPES.MANUAL,
            });
            const addParticipantResult = await this.contestInstanceRepository.addParticipantToContestInstance(txManager, userDetails.id, contestInstanceId, contestInstanceDetails.bankrollAmount);
            await this.realtimeDbService.set(`contest-instances/${contestInstanceId}/leaderboard/lastUpdate`, Date.now());
            const { currentParticipantsAfter } = addParticipantResult;
            let { leavingAllowed } = addParticipantResult;
            if (contestInstanceDetails.maxParticipants &&
                currentParticipantsAfter > contestInstanceDetails.maxParticipants) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.CONTEST_INSTANCE_FULL);
            }
            if (contestInstanceDetails.contestLeavingAllowed === false &&
                currentParticipantsAfter === contestInstanceDetails.minParticipants) {
                await this.contestInstanceRepository.updateContestInstance(contestInstanceId, { leavingAllowed: false }, txManager);
                leavingAllowed = false;
            }
            if (contestInstanceDetails.contestLeavingAllowed &&
                contestInstanceDetails.maxParticipants &&
                currentParticipantsAfter === contestInstanceDetails.maxParticipants) {
                await this.contestInstanceRepository.updateContestInstance(contestInstanceId, { leavingAllowed: false }, txManager);
                leavingAllowed = false;
            }
            let updatedStatus = null;
            const shouldChangeToInQueueStatus = this.shouldSetInQueueStatusChecker(contestInstanceDetails, currentParticipantsAfter);
            if (shouldChangeToInQueueStatus) {
                await this.inQueueSetter(contestInstanceId, contestInstanceDetails, txManager);
                updatedStatus = contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE;
            }
            const fireStoreWriteBatch = this.firestoreService.initWriteBatch();
            await this.balanceService.syncFirestoreUsersBalances(txManager, [userDetails.id], { writeBatch: fireStoreWriteBatch });
            this.syncContestInstanceWithFirestore(contestInstanceDetails.contestId, contestInstanceId, Object.assign(Object.assign({ currentParticipants: this.firestoreService.increment(), leavingAllowed }, (updatedStatus ? { status: updatedStatus } : {})), (contestInstanceDetails.lateEntryPeriodId
                ? {
                    lateEntryPeriodPassed: contestInstanceDetails.lateEntryPeriodPassed,
                }
                : {})), { writeBatch: fireStoreWriteBatch });
            this.saveParticipantToFirestore(contestInstanceDetails.contestId, contestInstanceId, {
                userId: userDetails.id,
                username: userDetails.username,
                lowercaseUsername: String(userDetails.username).toLowerCase(),
                avatar: userDetails.avatar,
                registrationTime: addParticipantResult.createdAt,
                bankrollBalance: String(contestInstanceDetails.bankrollAmount),
                totalBalance: String(contestInstanceDetails.bankrollAmount),
                isExcluded: false,
            }, { writeBatch: fireStoreWriteBatch });
            await fireStoreWriteBatch.commit();
            await txManager.commit();
        }
        catch (err) {
            await txManager.rollback();
            this.mapError(err);
        }
    }
    async withdrawParticipantFromContestInstance(userId, contestInstanceId) {
        const contestInstanceDetails = await this.contestInstanceRepository.getContestInstanceDetails(contestInstanceId);
        if (!contestInstanceDetails) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED);
        }
        if (contestInstanceDetails.leavingAllowed !== true) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.CONTEST_INSTANCE_WITHDRAW_NOT_ALLOWED);
        }
        const participantRegistrations = await this.contestInstanceRepository.getNumberOfUserRegistrationsInContestInstance(userId, contestInstanceId);
        if (!participantRegistrations) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.NOT_PART_OF_CONTEST_INSTANCE_PARTICIPANTS);
        }
        const txManager = await this.transactionManager.begin();
        try {
            await this.balanceService.changeBalance(txManager, {
                userId,
                amount: contestInstanceDetails.entryFeeDetails.entryFee,
                currency: contestInstanceDetails.entryFeeDetails.currency,
                transactionName: `Refund of entry fee to ${contestInstanceDetails.fixtureName} - ${contestInstanceDetails.instanceName}`,
                transactionType: balance_repository_1.TRANSACTION_TYPES.MANUAL,
            });
            await this.contestInstanceRepository.removeParticipantFromContestInstance(txManager, userId, contestInstanceId);
            const fireStoreWriteBatch = this.firestoreService.initWriteBatch();
            await this.balanceService.syncFirestoreUsersBalances(txManager, [userId], { writeBatch: fireStoreWriteBatch });
            this.syncContestInstanceWithFirestore(contestInstanceDetails.contestId, contestInstanceId, { currentParticipants: this.firestoreService.decrement() }, { writeBatch: fireStoreWriteBatch });
            this.deleteParticipantFromFirestore(contestInstanceDetails.contestId, contestInstanceId, userId, { writeBatch: fireStoreWriteBatch });
            await fireStoreWriteBatch.commit();
            await txManager.commit();
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
    syncContestInstanceWithFirestore(contestId, contestInstanceId, contestInstanceDetails, options) {
        this.firestoreService.transactionalMergeUpdate(`contests/${contestId}/instances`, contestInstanceId, contestInstanceDetails, { writeBatch: options.writeBatch });
    }
    saveParticipantToFirestore(contestId, contestInstanceId, participantDetails, options) {
        this.firestoreService.transactionalSet(`contests/${contestId}/instances/${contestInstanceId}/participants`, participantDetails.userId, participantDetails, { writeBatch: options.writeBatch });
    }
    deleteParticipantFromFirestore(contestId, contestInstanceId, userId, options) {
        this.firestoreService.transactionalDelete(`contests/${contestId}/instances/${contestInstanceId}/participants`, userId, { writeBatch: options.writeBatch });
    }
    mapError(err) {
        var _a, _b;
        const isNegativeBalanceError = err instanceof errors_1.BadRequestExceptionCustom &&
            ((_b = (_a = err.getResponse()) === null || _a === void 0 ? void 0 : _a.errorCodes) === null || _b === void 0 ? void 0 : _b.includes(errors_1.ERRORS.BALANCE.NEGATIVE_BALANCE.code));
        if (isNegativeBalanceError) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.NOT_ENOUGH_MONEY);
        }
        throw err;
    }
    validateStatuses(upcomingStatuses) {
        const validatStatuses = [
            contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
            contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS,
            contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED,
            contestInstanceStatus_enum_1.ContestInstanceStatus.CANCELLED,
        ];
        const isValid = upcomingStatuses.every((el) => validatStatuses.includes(el));
        if (isValid)
            return upcomingStatuses;
        throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_STATUS_PROVIDED);
    }
    statusesValidator(upcomingStatuses) {
        try {
            JSON.parse(upcomingStatuses);
        }
        catch (e) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CONTEST.INVALID_FORMAT_OF_STATUSES_PASSED);
        }
        const parsed = JSON.parse(upcomingStatuses);
        const validatedStatuses = this.validateStatuses(parsed);
        return validatedStatuses;
    }
    async settedPlace(contestInstances, userId) {
        const userContestInstancesIds = contestInstances.map((el) => el.instanceId);
        const userRank = await this.contestInstanceRepository.getContestInstancesRank(userContestInstancesIds, userId);
        this.logger.debug(`userRank:${JSON.stringify(userRank)}`);
        const userRankDictionary = userRank.reduce((acc, cur) => {
            return Object.assign(Object.assign({}, acc), { [cur.contestInstanceId]: cur.place });
        }, {});
        this.logger.debug(`userRankDictionary:${JSON.stringify(userRankDictionary)}`);
        const resultInstances = contestInstances.reduce((acc, cur) => {
            return userRankDictionary[cur.instanceId]
                ? [...acc, Object.assign(Object.assign({}, cur), { place: userRankDictionary[cur.instanceId] })]
                : acc;
        }, []);
        return resultInstances;
    }
    settedPrize(contestInstancesWithPlace) {
        const mappedContestInstances = contestInstancesWithPlace.map((el) => {
            const { prizeWinnerShare } = el;
            if (!(prizeWinnerShare === null || prizeWinnerShare === void 0 ? void 0 : prizeWinnerShare.length)) {
                return el;
            }
            const placePrize = prizeWinnerShare.find((winnerShare) => winnerShare.places.includes(el.place));
            const baseInstanceInfo = R.omit(['prizeWinnerShare'], el);
            if (!placePrize) {
                return Object.assign(Object.assign({}, baseInstanceInfo), { prize: null });
            }
            const { exactAmountPerPlace, fullDescription } = placePrize;
            const prize = el.prizeType === 'tangible' ? fullDescription : exactAmountPerPlace;
            return Object.assign(Object.assign({}, baseInstanceInfo), { prize });
        });
        return mappedContestInstances;
    }
    async getUserContestsInstancesWithStatuses(id, limit, page, statuses, user) {
        const orderBy = statuses.length && statuses.includes(contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED)
            ? '"fixtures"."startTime" desc'
            : '"fixtures"."startTime" asc';
        const contestInstances = await this.contestInstanceRepository.getUserContestsInstancesWithStatuses(id, limit, page, statuses, orderBy);
        this.logger.debug(`userContestInstances:${JSON.stringify(contestInstances)}`);
        if (Array.isArray(contestInstances) && !contestInstances.length) {
            return [];
        }
        const contestInstancesReduced = await contestInstances.reduce(async (accum, cur) => {
            const acc = await accum;
            const isParticipant = await this.contestInstanceParticipantsService.isUserParticipant(cur.instanceId, user);
            if (!acc[cur.fixtureId]) {
                acc[cur.fixtureId] = {
                    competitionId: cur.competitionId,
                    competitionName: cur.competitionName,
                    currentPeriodId: cur.currentPeriodId,
                    currentPeriodName: cur.currentPeriodName,
                    fixtureId: cur.fixtureId,
                    status: cur.status,
                    isLive: cur.isLive,
                    name: cur.name,
                    sportIcon: cur.sportIcon,
                    startTime: cur.startTime,
                    contestInstances: [],
                };
            }
            if ((limit && acc[cur.fixtureId].contestInstances.length < limit) ||
                !limit) {
                acc[cur.fixtureId].contestInstances.push(Object.assign(Object.assign({}, R.omit([
                    'competitionId',
                    'competitionName',
                    'currentPeriodId',
                    'currentPeriodName',
                    'fixtureId',
                    'endTime',
                    'isLive',
                    'name',
                    'sportIcon',
                    'startTime',
                ], cur)), { isParticipant }));
            }
            return acc;
        }, Promise.resolve({}));
        this.logger.debug(`userContestInstancesReduced:${JSON.stringify(contestInstancesReduced)}`);
        const result = Object.values(contestInstancesReduced);
        const orderedResult = result.reduce((prev, cur) => {
            const sortedInstances = cur.contestInstances
                .slice()
                .sort((instance1, instanse2) => instance1.userRegistrationTime > instanse2.userRegistrationTime
                ? 1
                : -1)
                .map((el) => R.omit(['userRegistrationTime'], el));
            cur.contestInstances = sortedInstances;
            return [...prev, cur];
        }, []);
        this.logger.debug(`reslutUserContestInstances:${JSON.stringify(result)}`);
        const mappedResult = orderedResult.map(async (el) => {
            if (el.status === contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED) {
                const { contestInstances } = el;
                const settedPlace = await this.settedPlace(contestInstances, id);
                const settedPrize = this.settedPrize(settedPlace);
                return Object.assign(Object.assign({}, R.omit(['status'], el)), { contestInstances: settedPrize });
            }
            const { contestInstances } = el;
            const contestInstancesWithoutPrizeWinnerShare = contestInstances.map((el) => R.omit(['prizeWinnerShare'], el));
            if (el.status === contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS) {
                const settedPlace = await this.settedPlace(contestInstancesWithoutPrizeWinnerShare, id);
                return Object.assign(Object.assign({}, R.omit(['status'], el)), { contestInstances: settedPlace });
            }
            return Object.assign(Object.assign({}, R.omit(['status'], el)), { contestInstances: contestInstancesWithoutPrizeWinnerShare });
        });
        return Promise.all(mappedResult);
    }
    async getActiveContestInstances(fixtureId, periodId, limit, userId, contestTypes) {
        let userContestInstancesIds = [];
        const cmsOrder = await this.cmsService.getCmsOrder();
        const realMoneyState = await this.cmsService.getRealMoneyState();
        const contestInstances = await this.contestInstanceRepository.getActiveContestInstances(fixtureId, periodId, contestTypes, realMoneyState);
        if (userId) {
            userContestInstancesIds =
                await this.contestInstanceRepository.getUserContestInstancesIds(userId);
        }
        const result = contestInstances.reduce((acc, contestInstance) => {
            contestInstance.isParticipant = userContestInstancesIds.some((id) => contestInstance.instanceId === id.contestInstanceId);
            if (!acc[contestInstance.periodId]) {
                acc[contestInstance.periodId] = {
                    periodName: contestInstance.periodName,
                    periodId: contestInstance.periodId,
                    count: 0,
                    contestInstances: [],
                };
            }
            acc[contestInstance.periodId].count++;
            const contestInstanceTypeNotPersonal = contestInstance.type !== cmsContestTemplateContestType_1.CmsContestTemplateContestType.PERSONAL;
            const contestInCmsHomeTopNavigation = acc[contestInstance.periodId].contests &&
                acc[contestInstance.periodId].contests.find((cts) => cts.id === contestInstance.cmsContestTemplateId);
            const contestInstanceCmsHomeVisible = contestInstance.cmsHomeVisible === true;
            if (((limit &&
                acc[contestInstance.periodId].contestInstances.length < limit) ||
                !limit) &&
                (contestInstanceTypeNotPersonal ||
                    (contestInCmsHomeTopNavigation && contestInstanceCmsHomeVisible))) {
                acc[contestInstance.periodId].contestInstances.push(R.pickAll([
                    'templateId',
                    'contestId',
                    'instanceId',
                    'instanceNumber',
                    'instanceName',
                    'type',
                    'currentParticipants',
                    'maxParticipants',
                    'entryCurrency',
                    'entryFee',
                    'prizeAmount',
                    'prizeType',
                    'lateEntryPeriodPassed',
                    'isParticipant',
                    'contestOwnerResourceLink',
                    'contestOwnerLabelName',
                ], contestInstance));
            }
            return acc;
        }, cmsOrder);
        const resultArray = Object.values(result)
            .filter((el) => el.contestInstances.length)
            .map((el) => delete el.contests && el);
        return resultArray;
    }
    getParticipantContestInstanceInfo(contestInstanceId, userId) {
        return this.contestInstanceRepository.getParticipantContestInstanceInfo(contestInstanceId, userId);
    }
    async getParticipantsInfoByInstanceId(contestInstanceId, page, size, search) {
        let count;
        const participantsInfoData = await this.contestInstanceRepository.getParticipantsInfoByInstanceId(contestInstanceId, page, size, search);
        if (participantsInfoData.length > 0) {
            count = +participantsInfoData[0].fullcount;
        }
        const mappedPartiicpantsData = participantsInfoData.map((el) => {
            if (el.status === contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED) {
                if (el.prizeType === 'tangible') {
                    const { prizeWinnerShare } = el;
                    const prePrize = prizeWinnerShare.find((share) => {
                        return share.places.includes(el.place);
                    });
                    const { fullDescription } = prePrize;
                    return Object.assign(Object.assign({}, R.omit(['prizeWinnerShare'], el)), { prize: fullDescription });
                }
                const { prizeWinnerShare } = el;
                const prePrize = prizeWinnerShare.find((share) => share.places.includes(el.place));
                return prePrize
                    ? Object.assign(Object.assign({}, R.omit(['prizeWinnerShare'], el)), { prize: prePrize.exactAmountPerPlace }) : Object.assign(Object.assign({}, R.omit(['prizeWinnerShare'], el)), { prize: '' });
            }
            return Object.assign({}, R.omit(['prizeWinnerShare'], el));
        });
        return { participantsInfo: mappedPartiicpantsData, count };
    }
    async getContestInstanceLeaderboard(contestInstanceId, contestInstanceDetails, userId, followingOnly) {
        let result = await this.contestInstanceRepository.getContestInstanceLeaderboard(contestInstanceId);
        if (contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED === contestInstanceDetails.status) {
            result =
                await this.winAmountCalculationService.calculateParticipantWinAmountsForLeaderboard(null, contestInstanceId, {
                    prizeType: contestInstanceDetails.prizeType,
                    prizeWinnerShare: contestInstanceDetails.prizeWinnerShare,
                }, result);
        }
        const prizePlaces = contestInstanceDetails.prizeWinnerShare.reduce((a, e) => a + e.winnersNumber, 0);
        if (followingOnly === true) {
            const followers = (await this.followService.getFollowingsListForUser(userId, result.map(({ userId }) => userId))).reduce((a, { id }) => {
                a[id] = true;
                return a;
            }, {});
            result = result.filter(({ userId: leaderBoardUserId }) => {
                return (followers[leaderBoardUserId] === true || leaderBoardUserId === userId);
            });
        }
        return result.map((leaderboardRow) => {
            return Object.assign(Object.assign({}, leaderboardRow), { prizePlace: parseInt(leaderboardRow.place) <= prizePlaces });
        });
    }
    getContestInstanceDetails(contestInstanceId) {
        return this.contestInstanceRepository.getContestInstanceDetails(contestInstanceId);
    }
    getMarketLinePriceDetails(marketLineId) {
        return this.contestInstanceRepository.getMarketLinePriceDetails(marketLineId);
    }
    getMarketLineDetails(marketLineId, fixtureId) {
        return this.contestInstanceRepository.getMarketLineDetails(marketLineId, fixtureId);
    }
    parceParticipantLeaderBoard(leaderboardFull, page, size, userId) {
        const leaderboard = leaderboardFull.slice((page - 1) * size, page * size);
        const playerInfo = leaderboardFull.find((leaderboardRow) => leaderboardRow.userId === userId);
        return {
            leaderboard,
            playerInfo: playerInfo || {},
            myInfo: {},
        };
    }
    getPlayerInfoByUserId(leaderboardFull, userId) {
        const playerInfo = leaderboardFull.find((leaderboardRow) => leaderboardRow.userId === userId);
        return playerInfo || null;
    }
    sliceLeaderboard(leaderboardFull, page, size) {
        const leaderboard = leaderboardFull.slice((page - 1) * size, page * size);
        return leaderboard;
    }
    getMaxBetLimitInfo(contestInstanceId, userId, marketLineId) {
        return this.contestInstanceRepository.getMaxBetLimitInfo(contestInstanceId, userId, marketLineId);
    }
    calculateWinAmount(betAmount, odds) {
        const winAmount = odds < 0 ? (100 / Math.abs(odds)) * betAmount : (odds / 100) * betAmount;
        return Number(Math.round(Number(winAmount + 'e+2')) + 'e-2');
    }
    calculateForcedBetAndWinAmounts(odds, forcedBetLimit) {
        const winAmount = odds < 0
            ? (forcedBetLimit + (100 / Math.abs(odds)) * forcedBetLimit) / 2
            : (forcedBetLimit + (Math.abs(odds) / 100) * forcedBetLimit) / 2;
        const betAmount = forcedBetLimit;
        return {
            winAmount: Number(Math.round(Number(winAmount + 'e+2')) + 'e-2'),
            betAmount,
        };
    }
    async getBetsForMarketType(txManager, betInfo, marketTypes) {
        return this.contestInstanceRepository.getBetsForMarketType(txManager, betInfo, marketTypes);
    }
    async placeBet(betDetails) {
        const { marketLineId, lineName, marketId, marketName, americanOdds, betAmount, winAmount, contestInstanceId, contestId, userId, currentMaxBetLimit, } = betDetails;
        const txManager = await this.transactionManager.begin();
        try {
            const bet = {
                userId,
                contestInstanceId,
                marketId,
                marketName,
                marketLineId,
                lineName,
                americanOdds,
                betAmount,
                winAmount,
                betStatus: betStatus_1.BetStatus.PENDING,
                betOutcome: betOutcome_1.BetOutcome.OPEN,
                isForcedBet: false,
            };
            await this.contestInstanceRepository.saveBet(txManager, bet);
            const updatedParticipantBankrollBalance = await this.contestInstanceRepository.updateParticipantBalanceInfo(txManager, contestInstanceId, userId, betAmount);
            const newMaxBetLimit = americanOdds < 0
                ? currentMaxBetLimit - winAmount
                : currentMaxBetLimit - betAmount;
            await this.contestInstanceRepository.updateMaxBetLimit(txManager, contestInstanceId, userId, marketLineId, newMaxBetLimit);
            await this.firestoreService.mergeUpdate(`contests/${contestId}/instances/${contestInstanceId}/participants`, userId, {
                bankrollBalance: String(updatedParticipantBankrollBalance.bankrollBalance),
            });
            await txManager.commit();
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
    async placeForcedBet(betDetails, forcedBetId) {
        const { marketLineId, lineName, marketId, marketName, americanOdds, betAmount, winAmount, contestInstanceId, contestId, userId, } = betDetails;
        const txManager = await this.transactionManager.begin();
        try {
            const bet = {
                userId,
                contestInstanceId,
                marketId,
                marketName,
                marketLineId,
                lineName,
                americanOdds,
                betAmount,
                winAmount,
                betStatus: betStatus_1.BetStatus.PENDING,
                betOutcome: betOutcome_1.BetOutcome.OPEN,
                isForcedBet: true,
            };
            await this.contestInstanceRepository.saveBet(txManager, bet);
            await this.firestoreService.addToArrayAt(`contests/${contestId}/instances/${contestInstanceId}/participants`, userId, `forcedBets.${forcedBetId}`, marketLineId);
            await txManager.commit();
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
    searchLiveContestInstances(userId, subString) {
        return this.contestInstanceRepository.searchLiveContestInstances(userId, subString);
    }
    async getParticipantBets(participantId, status, contestInstanceId, page, size, sortField) {
        return this.contestInstanceRepository.getParticipantBets(participantId, status, contestInstanceId, page, size, sortField);
    }
    async updateContestInstances(fixtureId) {
        const fixtureContestInstances = await this.contestInstanceRepository.getInstancesByFixtureId(fixtureId);
        if (!fixtureContestInstances.length) {
            return;
        }
        const instancesIds = fixtureContestInstances.map(({ id }) => id);
        await this.contestInstanceRepository.updateContestInstances(instancesIds, {
            lateEntryPeriodPassed: true,
        });
        await Promise.all(fixtureContestInstances.map(({ id, contestId }) => {
            const collection = `contests/${contestId}/instances/`;
            return this.firestoreService.mergeUpdate(collection, id, {
                lateEntryPeriodPassed: true,
            });
        }));
    }
    async getUserBalance(userId, contestInstanceId) {
        const userBalance = await this.contestInstanceRepository.getUserBalance(userId, contestInstanceId);
        return userBalance;
    }
    async getMarketLineFixtureId(marketLineId) {
        return this.contestInstanceRepository.getMarketLineFixtureId(marketLineId);
    }
    async getMarketFixtureId(marketId) {
        return this.contestInstanceRepository.getMarketFixtureId(marketId);
    }
    async finishContestInstancesWhichAreReady(fixtureId) {
        const contestInstancesToFinish = await this.getReadyToFinishContestInstances(fixtureId);
        try {
            await Promise.allSettled(contestInstancesToFinish.map(({ instanceId, contestId, contestName }) => this.finishContestInstance(instanceId, contestId, contestName)));
        }
        catch (err) {
            throw err;
        }
    }
    async cancelContestInstancesOnFixtureStatusChange(fixtureId) {
        const fixtureEnded = await this.fixtureService.haveFixtureEnded(fixtureId);
        if (fixtureEnded) {
            const contestInstancesToCancel = await this.contestInstanceRepository.getActiveContestInstanceIdsForContests(fixtureId);
            try {
                await Promise.allSettled(contestInstancesToCancel.map(({ instanceId, contestId, fixtureName }) => this.cancelContestInstanceService.cancelContest({
                    instanceId,
                    contestId,
                }, false, fixtureName)));
            }
            catch (err) {
                this.logger.error(`cancelContestInstancesOnFixtureStatusChange: ${err.message}`, err.stack);
            }
        }
    }
    async finishContestInstance(contestInstanceId, contestId, contestName, instanceStatus, templateGenerator) {
        try {
            const endTime = new Date();
            const isStatusChanged = await this.contestInstanceRepository.setContestInstanceStatus(contestInstanceId, contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED);
            if (!isStatusChanged) {
                this.logger.debug(`finishContestInstance: point_7, ${contestId}, ${contestInstanceId}`);
                return;
            }
            await this.contestInstanceRepository.updateContestInstance(contestInstanceId, { leavingAllowed: false, endTime });
            const txManager = await this.transactionManager.begin();
            const fireStoreWriteBatch = this.firestoreService.initWriteBatch();
            try {
                this.logger.debug(`finishContestInstance: point_1, ${contestId}, ${contestInstanceId}`);
                const { fixtureName } = await this.contestInstanceRepository.getFixtureNameByContestId(contestId);
                this.logger.debug(`finishContestInstance: point_2,`);
                const prizeDetails = await this.contestInstanceRepository.getPrizeContestInstanceDetails(contestInstanceId);
                this.logger.debug(`finishContestInstance: point_3`);
                await this.winnersRewardingService.rewardWinners(txManager, contestInstanceId, prizeDetails, contestName, { writeBatch: fireStoreWriteBatch }, fixtureName, templateGenerator, instanceStatus);
                this.logger.debug(`finishContestInstance: point_4`);
                this.syncContestInstanceWithFirestore(contestId, contestInstanceId, {
                    status: contestInstanceStatus_enum_1.ContestInstanceStatus.FINISHED,
                    endTime,
                    leavingAllowed: false,
                }, { writeBatch: fireStoreWriteBatch });
                this.logger.debug(`finishContestInstance: point_5`);
                await this.realtimeDbService.set(`contest-instances/${contestInstanceId}/leaderboard/lastUpdate`, Date.now());
                this.logger.debug(`finishContestInstance: point_6`);
                await txManager.commit();
                await fireStoreWriteBatch.commit();
            }
            catch (error) {
                this.logger.error(`finishContestInstance: ${error.message}`);
                await txManager.rollback(error);
                return;
            }
            await this.contestInstanceParticipantsService.notifyUsersContestInstanceStatusChange({
                contestId,
                instanceId: contestInstanceId,
                contestName,
            }, types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_FINISHED);
            await this.deleteContestInstanceService.runJobForDeleteInstance(contestInstanceId, contestId, null);
        }
        catch (error) {
            this.logger.error(`finishContestInstance2: ${error.message}`);
        }
    }
    async getReadyToFinishContestInstances(fixtureId) {
        const expiredFixtureContestIds = await this.fixtureService.getExpiredFixtureContestIds(fixtureId);
        if (R.isEmpty(expiredFixtureContestIds)) {
            return [];
        }
        const fixtureContestIdsWithNoActiveMarkets = await this.contestService.getContestIdsWithNoActiveMarkets(expiredFixtureContestIds);
        if (R.isEmpty(fixtureContestIdsWithNoActiveMarkets)) {
            return [];
        }
        const inProgressContestInstanceIdsWithAllSettledBets = await this.contestInstanceRepository.getInProgressContestInstanceIdsWithAllSettledBets(fixtureContestIdsWithNoActiveMarkets);
        return inProgressContestInstanceIdsWithAllSettledBets;
    }
    async getActiveMarketLines(txManager, marketId) {
        return this.contestInstanceRepository.getActiveMarketLines(txManager, marketId);
    }
    async getFixtureNameByContestId(contestId) {
        return await this.contestInstanceRepository.getFixtureNameByContestId(contestId);
    }
};
ContestInstanceService = ContestInstanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(7, (0, common_1.Inject)((0, common_1.forwardRef)(() => contest_service_1.ContestService))),
    __param(8, (0, common_1.Inject)((0, common_1.forwardRef)(() => fixture_service_1.FixtureService))),
    __metadata("design:paramtypes", [contest_instance_participants_service_1.ContestInstanceParticipantsService,
        delete_service_1.DeleteContestInstanceService,
        cancel_service_1.CancelContestInstanceService,
        contest_instance_repository_1.ContestInstanceRepository,
        balance_service_1.BalanceService,
        transaction_manager_service_1.TransactionManager,
        firestore_service_1.FirestoreService,
        contest_service_1.ContestService,
        fixture_service_1.FixtureService,
        winners_rewarding_service_1.WinnersRewardingService,
        job_queue_service_1.JobQueueService,
        win_amount_calculation_service_1.WinAmountCalculationService,
        realtime_db_service_1.RealtimeDbService,
        cms_service_1.CmsService,
        follow_service_1.FollowService])
], ContestInstanceService);
exports.ContestInstanceService = ContestInstanceService;
//# sourceMappingURL=contest-instance.service.js.map