"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestInstanceModule = void 0;
const common_1 = require("@nestjs/common");
const balance_module_1 = require("../balance/balance.module");
const transaction_manager_module_1 = require("../ancillary/transaction-manager/transaction-manager.module");
const contestAuth_middleware_1 = require("./middlewares/contestAuth.middleware");
const contest_instance_service_1 = require("./contest-instance.service");
const contest_instance_repository_1 = require("./contest-instance.repository");
const contest_instance_controller_1 = require("./contest-instance.controller");
const fixture_service_1 = require("../fixture/fixture.service");
const fixture_repository_1 = require("../fixture/fixture.repository");
const job_queue_service_1 = require("../ancillary/job-queue/job-queue.service");
const contest_instance_cms_controller_1 = require("./contest-instance.cms.controller");
const contest_instance_pubsub_controller_1 = require("./contest-instance.pubsub-controller");
const bets_module_1 = require("./bets/bets.module");
const contest_instance_participants_module_1 = require("./contest-instance-participants/contest-instance-participants.module");
const contest_service_1 = require("../contest/contest.service");
const contest_module_1 = require("../contest/contest.module");
const winners_rewarding_module_1 = require("./winners-rewarding/winners-rewarding.module");
const delete_module_1 = require("./delete/delete.module");
const cancel_module_1 = require("./cancel/cancel.module");
const cancel_service_1 = require("./cancel/cancel.service");
const delete_service_1 = require("./delete/delete.service");
const win_amount_calculation_service_1 = require("./winners-rewarding/win-amount-calculation.service");
const contest_instance_participants_service_1 = require("./contest-instance-participants/contest-instance-participants.service");
const tokens_module_1 = require("../integrations/firebase/messages/tokens/tokens.module");
const follow_service_1 = require("../user-management/follow/follow.service");
const follow_repository_1 = require("../user-management/follow/follow.repository");
const personal_details_service_1 = require("../user-management/profile/personal-details/personal-details.service");
const personal_details_repository_1 = require("../user-management/profile/personal-details/personal-details.repository");
const optionalAuth_middleware_1 = require("../../middlewares/auth/optionalAuth.middleware");
const auth_middleware_1 = require("../../middlewares/auth/auth.middleware");
const tokens_controller_1 = require("../integrations/firebase/messages/tokens/tokens.controller");
const auth_module_1 = require("../../middlewares/auth/auth.module");
const markets_module_1 = require("../markets/markets.module");
const market_lines_service_1 = require("../market-lines/market-lines.service");
const bets_service_1 = require("./bets/bets.service");
const bets_repository_1 = require("./bets/bets.repository");
let ContestInstanceModule = class ContestInstanceModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(tokens_controller_1.TokensController);
        consumer
            .apply(contestAuth_middleware_1.ContestInstanceRegistrationAuthMiddleware)
            .exclude({
            path: 'contest-instance/list/active',
            method: common_1.RequestMethod.GET,
        }, {
            path: 'contest-instance/leaderboard/v2/:userId',
            method: common_1.RequestMethod.GET,
        }, {
            path: 'contest-instance/user/:userId/contest-instances',
            method: common_1.RequestMethod.GET,
        }, {
            path: 'contest-instance/bets',
            method: common_1.RequestMethod.GET,
        })
            .forRoutes(contest_instance_controller_1.ContestInstanceController);
        consumer
            .apply(optionalAuth_middleware_1.OptionalAuthMiddleware)
            .forRoutes('contest-instance/leaderboard/v2/:userId', 'contest-instance/user/:userId/contest-instances', 'contest-instance/bets', 'contest-instance/list/active');
    }
};
ContestInstanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthMiddlewareModule,
            balance_module_1.BalanceModule,
            transaction_manager_module_1.TransactionManagerModule,
            bets_module_1.BetsModule,
            contest_instance_participants_module_1.ContestInstanceParticipantsModule,
            delete_module_1.DeleteContestInstanceModule,
            (0, common_1.forwardRef)(() => contest_module_1.ContestModule),
            winners_rewarding_module_1.WinnersRewardingModule,
            cancel_module_1.CancelContestInstanceModule,
            tokens_module_1.TokensModule,
            markets_module_1.MarketsModule,
        ],
        providers: [
            contest_instance_service_1.ContestInstanceService,
            contest_instance_repository_1.ContestInstanceRepository,
            contest_service_1.ContestService,
            fixture_service_1.FixtureService,
            fixture_repository_1.FixtureRepository,
            job_queue_service_1.JobQueueService,
            cancel_service_1.CancelContestInstanceService,
            delete_service_1.DeleteContestInstanceService,
            win_amount_calculation_service_1.WinAmountCalculationService,
            contest_instance_participants_service_1.ContestInstanceParticipantsService,
            follow_service_1.FollowService,
            follow_repository_1.FollowRepository,
            personal_details_repository_1.PersonalDetailsRepository,
            personal_details_service_1.PersonalDetailsService,
            market_lines_service_1.MarketLinesService,
            bets_service_1.BetsService,
            bets_repository_1.BetsRepository,
        ],
        exports: [
            contest_instance_repository_1.ContestInstanceRepository,
            contest_instance_service_1.ContestInstanceService,
            cancel_service_1.CancelContestInstanceService,
            delete_service_1.DeleteContestInstanceService,
            win_amount_calculation_service_1.WinAmountCalculationService,
            contest_instance_participants_service_1.ContestInstanceParticipantsService,
            personal_details_repository_1.PersonalDetailsRepository,
            personal_details_service_1.PersonalDetailsService,
            fixture_service_1.FixtureService,
            contest_service_1.ContestService,
            fixture_repository_1.FixtureRepository,
            job_queue_service_1.JobQueueService,
            follow_service_1.FollowService,
            follow_repository_1.FollowRepository,
        ],
        controllers: [
            contest_instance_controller_1.ContestInstanceController,
            contest_instance_cms_controller_1.ContestInstanceCmsController,
            contest_instance_pubsub_controller_1.ContestInstancePubsubController,
        ],
    })
], ContestInstanceModule);
exports.ContestInstanceModule = ContestInstanceModule;
//# sourceMappingURL=contest-instance.module.js.map