"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteContestInstanceModule = void 0;
const common_1 = require("@nestjs/common");
const delete_service_1 = require("./delete.service");
const delete_repository_1 = require("./delete.repository");
const job_queue_service_1 = require("../../ancillary/job-queue/job-queue.service");
let DeleteContestInstanceModule = class DeleteContestInstanceModule {
};
DeleteContestInstanceModule = __decorate([
    (0, common_1.Module)({
        providers: [
            delete_service_1.DeleteContestInstanceService,
            delete_repository_1.DeleteContestInstanceRepository,
            job_queue_service_1.JobQueueService,
        ],
        exports: [
            delete_service_1.DeleteContestInstanceService,
            delete_repository_1.DeleteContestInstanceRepository,
            job_queue_service_1.JobQueueService,
        ],
    })
], DeleteContestInstanceModule);
exports.DeleteContestInstanceModule = DeleteContestInstanceModule;
//# sourceMappingURL=delete.module.js.map