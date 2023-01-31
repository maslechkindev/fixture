"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestModule = void 0;
const common_1 = require("@nestjs/common");
const contest_service_1 = require("./contest.service");
const fixture_service_1 = require("../fixture/fixture.service");
const cms_module_1 = require("../integrations/cms/cms.module");
const fixture_module_1 = require("../fixture/fixture.module");
const job_queue_service_1 = require("../ancillary/job-queue/job-queue.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const contest_repository_1 = require("./contest.repository");
const contest_instance_module_1 = require("../contest-instance/contest-instance.module");
const contest_pubsub_controller_1 = require("./contest.pubsub-controller");
const winners_rewarding_module_1 = require("../contest-instance/winners-rewarding/winners-rewarding.module");
const follow_service_1 = require("../user-management/follow/follow.service");
const follow_repository_1 = require("../user-management/follow/follow.repository");
const force_bets_service_1 = require("./force-bets/force-bets.service");
const force_bets_module_1 = require("./force-bets/force-bets.module");
const force_bets_repository_1 = require("./force-bets/force-bets.repository");
const markets_service_1 = require("../markets/markets.service");
const markets_module_1 = require("../markets/markets.module");
let ContestModule = class ContestModule {
};
ContestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cms_module_1.CmsModule,
            (0, common_1.forwardRef)(() => fixture_module_1.FixtureModule),
            (0, common_1.forwardRef)(() => contest_instance_module_1.ContestInstanceModule),
            winners_rewarding_module_1.WinnersRewardingModule,
            force_bets_module_1.ForceBetsModule,
            markets_module_1.MarketsModule,
        ],
        providers: [
            contest_service_1.ContestService,
            contest_repository_1.ContestRepository,
            fixture_service_1.FixtureService,
            job_queue_service_1.JobQueueService,
            contest_instance_service_1.ContestInstanceService,
            follow_service_1.FollowService,
            follow_repository_1.FollowRepository,
            force_bets_service_1.ForceBetsService,
            force_bets_repository_1.ForceBetsRepository,
            markets_service_1.MarketsService,
        ],
        controllers: [contest_pubsub_controller_1.ContestPubsubController],
        exports: [
            cms_module_1.CmsModule,
            fixture_service_1.FixtureService,
            job_queue_service_1.JobQueueService,
            contest_repository_1.ContestRepository,
            force_bets_service_1.ForceBetsService,
            contest_service_1.ContestService,
        ],
    })
], ContestModule);
exports.ContestModule = ContestModule;
//# sourceMappingURL=contest.module.js.map