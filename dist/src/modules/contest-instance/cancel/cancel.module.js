"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelContestInstanceModule = void 0;
const common_1 = require("@nestjs/common");
const cancel_service_1 = require("./cancel.service");
const contest_instance_repository_1 = require("../contest-instance.repository");
const job_queue_service_1 = require("../../ancillary/job-queue/job-queue.service");
const balance_module_1 = require("../../balance/balance.module");
const transaction_manager_module_1 = require("../../ancillary/transaction-manager/transaction-manager.module");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const balance_service_1 = require("../../balance/balance.service");
const cancel_repository_1 = require("./cancel.repository");
const delete_service_1 = require("../delete/delete.service");
const delete_module_1 = require("../delete/delete.module");
const contest_instance_participants_module_1 = require("../contest-instance-participants/contest-instance-participants.module");
const contest_instance_participants_repository_1 = require("../contest-instance-participants/contest-instance-participants.repository");
const contest_instance_participants_service_1 = require("../contest-instance-participants/contest-instance-participants.service");
const notifications_service_1 = require("../../integrations/firebase/messages/notifications/notifications.service");
const notifications_module_1 = require("../../integrations/firebase/messages/notifications/notifications.module");
const tokens_module_1 = require("../../integrations/firebase/messages/tokens/tokens.module");
let CancelContestInstanceModule = class CancelContestInstanceModule {
};
CancelContestInstanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            balance_module_1.BalanceModule,
            transaction_manager_module_1.TransactionManagerModule,
            delete_module_1.DeleteContestInstanceModule,
            contest_instance_participants_module_1.ContestInstanceParticipantsModule,
            notifications_module_1.NotificationsModule,
            tokens_module_1.TokensModule,
        ],
        providers: [
            cancel_service_1.CancelContestInstanceService,
            cancel_repository_1.CancelContestInstanceRepository,
            delete_service_1.DeleteContestInstanceService,
            contest_instance_repository_1.ContestInstanceRepository,
            job_queue_service_1.JobQueueService,
            transaction_manager_service_1.TransactionManager,
            balance_service_1.BalanceService,
            contest_instance_participants_repository_1.ContestInstanceParticipantsRepository,
            contest_instance_participants_service_1.ContestInstanceParticipantsService,
            notifications_service_1.NotificationsService,
        ],
        exports: [
            cancel_service_1.CancelContestInstanceService,
            cancel_repository_1.CancelContestInstanceRepository,
            delete_service_1.DeleteContestInstanceService,
            job_queue_service_1.JobQueueService,
            transaction_manager_service_1.TransactionManager,
            balance_service_1.BalanceService,
            contest_instance_participants_repository_1.ContestInstanceParticipantsRepository,
            contest_instance_participants_service_1.ContestInstanceParticipantsService,
        ],
    })
], CancelContestInstanceModule);
exports.CancelContestInstanceModule = CancelContestInstanceModule;
//# sourceMappingURL=cancel.module.js.map