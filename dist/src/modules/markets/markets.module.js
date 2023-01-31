"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketsModule = void 0;
const common_1 = require("@nestjs/common");
const markets_service_1 = require("./markets.service");
const cms_service_1 = require("../integrations/cms/cms.service");
const job_queue_service_1 = require("../ancillary/job-queue/job-queue.service");
const cms_module_1 = require("../integrations/cms/cms.module");
const markets_repository_1 = require("./markets.repository");
let MarketsModule = class MarketsModule {
};
MarketsModule = __decorate([
    (0, common_1.Module)({
        imports: [cms_module_1.CmsModule],
        providers: [markets_service_1.MarketsService, cms_service_1.CmsService, job_queue_service_1.JobQueueService, markets_repository_1.MarketsRepository],
        exports: [markets_repository_1.MarketsRepository, markets_service_1.MarketsService],
    })
], MarketsModule);
exports.MarketsModule = MarketsModule;
//# sourceMappingURL=markets.module.js.map