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
var CancelContestInstanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelContestInstanceService = void 0;
const common_1 = require("@nestjs/common");
const job_queue_service_1 = require("../../ancillary/job-queue/job-queue.service");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const contestInstanceStatus_enum_1 = require("../enums/contestInstanceStatus.enum");
const balance_service_1 = require("../../balance/balance.service");
const delete_service_1 = require("../delete/delete.service");
const errors_1 = require("../../../helpers/errors");
const cancel_repository_1 = require("./cancel.repository");
const contest_instance_participants_repository_1 = require("../contest-instance-participants/contest-instance-participants.repository");
const contest_instance_participants_service_1 = require("../contest-instance-participants/contest-instance-participants.service");
const types_1 = require("../../integrations/firebase/messages/notifications/types");
const firestore_service_1 = require("../../integrations/firebase/firestore/firestore.service");
const templateGeneratorType_1 = require("../../fixture/types/templateGeneratorType");
const enums_1 = require("../../ancillary/job-queue/enums");
const debounce_1 = require("../../../helpers/common/debounce");
const date_fns_1 = require("date-fns");
const balance_repository_1 = require("../../balance/balance.repository");
let CancelContestInstanceService = CancelContestInstanceService_1 = class CancelContestInstanceService {
    constructor(contestInstanceParticipantsRepository, contestInstanceParticipantsService, cancelRepository, jobQueueService, transactionManager, balanceService, deleteContestInstanceService, firestoreService) {
        this.contestInstanceParticipantsRepository = contestInstanceParticipantsRepository;
        this.contestInstanceParticipantsService = contestInstanceParticipantsService;
        this.cancelRepository = cancelRepository;
        this.jobQueueService = jobQueueService;
        this.transactionManager = transactionManager;
        this.balanceService = balanceService;
        this.deleteContestInstanceService = deleteContestInstanceService;
        this.firestoreService = firestoreService;
        this.logger = new common_1.Logger(CancelContestInstanceService_1.name);
        this.cancellationHandler = async (job) => {
            try {
                const { instanceId, contestId, contestName, fixtureName } = job.data.meta;
                const isContestCancel = await this.cancelContest({
                    contestId,
                    instanceId,
                }, false, fixtureName);
                if (isContestCancel) {
                    (0, debounce_1.debounce)(this.contestInstanceParticipantsService.notifyUsersContestInstanceStatusChange({ instanceId, contestId, contestName }, types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_MISSING_ACTIVE_MARKETS), `${types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_MISSING_ACTIVE_MARKETS}_${contestId}_${instanceId}`, 5000);
                }
            }
            catch (err) {
                this.mapError(err);
            }
        };
        this.isInstanceCancel = async (contestInstance) => {
            const jobForPlanCancelContest = await this.jobQueueService.getJob(contestInstance.instanceId);
            if (contestInstance.status === contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN &&
                contestInstance.currentParticipants < contestInstance.minParticipants) {
                if (jobForPlanCancelContest) {
                    await this.jobQueueService.cancelJob(contestInstance.instanceId);
                }
                const isContestCancel = await this.cancelContest(contestInstance, false, contestInstance.fixtureName);
                if (isContestCancel) {
                    (0, debounce_1.debounce)(this.contestInstanceParticipantsService.notifyUsersContestInstanceStatusChange(contestInstance, types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_DUE_TO_MIN_PARTICIPANTS_NOT_REACHED), `${types_1.NotificationEnumType.CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_DUE_TO_MIN_PARTICIPANTS_NOT_REACHED}_${contestInstance.contestId}_${contestInstance.instanceId}`, 5000);
                }
                return;
            }
            if (!jobForPlanCancelContest) {
                await this.runCancellationJob(contestInstance);
            }
        };
        this.runCancellationJob = async (contestInstance) => {
            const cancellationTimeISO = (0, date_fns_1.addMinutes)(new Date(), contestInstance.cancellationTime);
            await this.jobQueueService.addToQueue(cancellationTimeISO.toISOString(), enums_1.QueueName.CONTEST_INSTANCE_CANCELLATION, {
                action: enums_1.ActionName.CONTEST_INSTANCE_CANCELLATION,
                meta: {
                    instanceId: contestInstance.instanceId,
                    contestId: contestInstance.contestId,
                    contestName: contestInstance.contestName,
                    fixtureName: contestInstance.fixtureName,
                    isActive: true,
                },
            }, contestInstance.instanceId);
        };
        this.cancelContest = async (contestInstance, forcedCancel = false, fixtureName, templateGenerator, entryFee) => {
            const endTime = new Date();
            const participantIds = [];
            const defaultInstanceStatusesForCancel = [
                contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN,
                contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE,
            ];
            const instanceStatuses = forcedCancel
                ? [...defaultInstanceStatusesForCancel, contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS]
                : defaultInstanceStatusesForCancel;
            const trx = await this.transactionManager.begin();
            try {
                const { status } = await this.contestInstanceParticipantsRepository.getContestInstanceStatus(contestInstance.instanceId, trx);
                if (!instanceStatuses.includes(status)) {
                    this.logger.log(`cancelContest: incorrectStatus: ${status}`);
                    await trx.commit();
                    return false;
                }
                const contestInstanceParticipants = await this.contestInstanceParticipantsRepository.getContestAndParticipantsDetailsByInstanceId(contestInstance.instanceId);
                await this.cancelRepository.setContestInstanceStatusCancel(trx, contestInstance.instanceId, endTime);
                await Promise.all(contestInstanceParticipants.map(async (participant) => {
                    if (participant.entryFee > 0) {
                        await this.balanceService.changeBalance(trx, {
                            userId: participant.userId,
                            amount: participant.entryFee,
                            currency: participant.currency,
                            transactionName: entryFee && entryFee > 0
                                ? templateGenerator({
                                    contestName: participant.contestName,
                                    fixtureName,
                                })
                                : `Refund of entry fee to ${participant.fixtureName} - ${participant.contestName}`,
                            transactionType: balance_repository_1.TRANSACTION_TYPES.MANUAL,
                        });
                        participantIds.push(participant.userId);
                    }
                    await this.balanceService.syncFirestoreUsersBalances(trx, participantIds);
                    await this.deleteContestInstanceService.runJobForDeleteInstance(participant.contestInstanceId, participant.contestId, trx);
                }));
                await trx.commit();
            }
            catch (error) {
                await trx.rollback(error);
                return false;
            }
            const documentUpdateData = {
                status: contestInstanceStatus_enum_1.ContestInstanceStatus.CANCELLED,
                endTime,
                cancelledByAdmin: forcedCancel,
            };
            await this.firestoreService.mergeUpdate(`contests/${contestInstance.contestId}/instances/`, contestInstance.instanceId, documentUpdateData);
            return true;
        };
        this.jobQueueService.init(enums_1.QueueName.CONTEST_INSTANCE_CANCELLATION, this.cancellationHandler);
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
};
CancelContestInstanceService = CancelContestInstanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contest_instance_participants_repository_1.ContestInstanceParticipantsRepository,
        contest_instance_participants_service_1.ContestInstanceParticipantsService,
        cancel_repository_1.CancelContestInstanceRepository,
        job_queue_service_1.JobQueueService,
        transaction_manager_service_1.TransactionManager,
        balance_service_1.BalanceService,
        delete_service_1.DeleteContestInstanceService,
        firestore_service_1.FirestoreService])
], CancelContestInstanceService);
exports.CancelContestInstanceService = CancelContestInstanceService;
//# sourceMappingURL=cancel.service.js.map