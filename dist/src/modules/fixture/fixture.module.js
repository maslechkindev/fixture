"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureModule = void 0;
const common_1 = require("@nestjs/common");
const fixture_service_1 = require("./fixture.service");
const fixture_repository_1 = require("./fixture.repository");
const entry_module_1 = require("../user-management/auth/entry/entry.module");
const fixture_controller_1 = require("./fixture.controller");
const cms_module_1 = require("../integrations/cms/cms.module");
const contest_service_1 = require("../contest/contest.service");
const job_queue_service_1 = require("../ancillary/job-queue/job-queue.service");
const contest_repository_1 = require("../contest/contest.repository");
const fixtures_cms_controller_1 = require("./fixtures.cms.controller");
const contest_instance_module_1 = require("../contest-instance/contest-instance.module");
const contest_instance_participants_module_1 = require("../contest-instance/contest-instance-participants/contest-instance-participants.module");
const force_bets_service_1 = require("../contest/force-bets/force-bets.service");
const force_bets_repository_1 = require("../contest/force-bets/force-bets.repository");
const cancel_module_1 = require("../contest-instance/cancel/cancel.module");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
const contest_module_1 = require("../contest/contest.module");
const markets_service_1 = require("../markets/markets.service");
const markets_module_1 = require("../markets/markets.module");
const firestore_module_1 = require("../integrations/firebase/firestore/firestore.module");
const firestore_service_1 = require("../integrations/firebase/firestore/firestore.service");
const market_lines_service_1 = require("../market-lines/market-lines.service");
const market_lines_module_1 = require("../market-lines/market-lines.module");
let FixtureModule = class FixtureModule {
};
FixtureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cms_module_1.CmsModule,
            entry_module_1.EntryModule,
            contest_instance_module_1.ContestInstanceModule,
            contest_instance_participants_module_1.ContestInstanceParticipantsModule,
            cancel_module_1.CancelContestInstanceModule,
            (0, common_1.forwardRef)(() => contest_module_1.ContestModule),
            markets_module_1.MarketsModule,
            firestore_module_1.FirestoreModule,
            market_lines_module_1.MarketLinesModule,
        ],
        controllers: [fixture_controller_1.FixtureController, fixtures_cms_controller_1.FixturesCmsController],
        providers: [
            fixture_service_1.FixtureService,
            fixture_repository_1.FixtureRepository,
            contest_service_1.ContestService,
            contest_repository_1.ContestRepository,
            job_queue_service_1.JobQueueService,
            force_bets_service_1.ForceBetsService,
            force_bets_repository_1.ForceBetsRepository,
            transaction_manager_service_1.TransactionManager,
            markets_service_1.MarketsService,
            firestore_service_1.FirestoreService,
            market_lines_service_1.MarketLinesService,
        ],
        exports: [fixture_service_1.FixtureService, fixture_repository_1.FixtureRepository, market_lines_service_1.MarketLinesService],
    })
], FixtureModule);
exports.FixtureModule = FixtureModule;
//# sourceMappingURL=fixture.module.js.map