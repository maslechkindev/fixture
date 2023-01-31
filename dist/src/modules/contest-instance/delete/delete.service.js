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
exports.DeleteContestInstanceService = void 0;
const common_1 = require("@nestjs/common");
const firestore_service_1 = require("../../integrations/firebase/firestore/firestore.service");
const job_queue_service_1 = require("../../ancillary/job-queue/job-queue.service");
const date_fns_1 = require("date-fns");
const delete_repository_1 = require("./delete.repository");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const config_1 = require("../../../config");
const enums_1 = require("../../ancillary/job-queue/enums");
let DeleteContestInstanceService = class DeleteContestInstanceService {
    constructor(firestoreService, jobQueueService, deleteRepository) {
        this.firestoreService = firestoreService;
        this.jobQueueService = jobQueueService;
        this.deleteRepository = deleteRepository;
        this.deleteHandler = async (job) => {
            const { instanceId, contestId } = job.data.meta;
            try {
                const pathToInstances = `contests/${contestId}/instances`;
                const pathToContest = `contests`;
                await this.firestoreService.delete(pathToInstances, instanceId);
                const isCollectionOfInstancesEmpty = await this.firestoreService.isCollectionEmpty(pathToInstances);
                if (isCollectionOfInstancesEmpty) {
                    await this.firestoreService.delete(pathToContest, contestId);
                }
            }
            catch (err) {
                throw err;
            }
        };
        this.runJobForDeleteInstance = async (instanceId, contestId, trx) => {
            const deleteTimeISO = this.createDeleteTimeISO();
            try {
                await this.jobQueueService.addToQueue(deleteTimeISO, enums_1.QueueName.CONTEST_INSTANCE_DELETE, {
                    action: enums_1.ActionName.CONTEST_INSTANCE_DELETE,
                    meta: { instanceId, contestId },
                });
                await this.deleteRepository.updateEndTime(instanceId, deleteTimeISO, trx);
            }
            catch (err) {
                throw err;
            }
        };
        this.createDeleteTimeISO = () => {
            const result = (0, date_fns_1.addMinutes)(new Date(), config_1.default.EXPIRATIONS.DELETE_INSTANCE.TIMEOUT_MINUTES);
            return result.toISOString();
        };
        this.jobQueueService.init(enums_1.QueueName.CONTEST_INSTANCE_DELETE, this.deleteHandler);
    }
};
DeleteContestInstanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firestore_service_1.FirestoreService,
        job_queue_service_1.JobQueueService,
        delete_repository_1.DeleteContestInstanceRepository])
], DeleteContestInstanceService);
exports.DeleteContestInstanceService = DeleteContestInstanceService;
//# sourceMappingURL=delete.service.js.map