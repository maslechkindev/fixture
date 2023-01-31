"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const knex_1 = require("./modules/integrations/knex");
const config_1 = require("./config");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const error_interceptor_1 = require("./interceptors/error.interceptor");
const health_module_1 = require("./modules/health/health.module");
const user_management_module_1 = require("./modules/user-management/user-management.module");
const mailing_1 = require("./modules/integrations/mailing");
const dynamic_links_1 = require("./modules/integrations/firebase/dynamic-links");
const balance_module_1 = require("./modules/balance/balance.module");
const balance_service_1 = require("./modules/balance/balance.service");
const firestore_service_1 = require("./modules/integrations/firebase/firestore/firestore.service");
const firestore_module_1 = require("./modules/integrations/firebase/firestore/firestore.module");
const balance_repository_1 = require("./modules/balance/balance.repository");
const transaction_manager_module_1 = require("./modules/ancillary/transaction-manager/transaction-manager.module");
const transaction_manager_service_1 = require("./modules/ancillary/transaction-manager/transaction-manager.service");
const cms_module_1 = require("./modules/integrations/cms/cms.module");
const messages_module_1 = require("./modules/integrations/firebase/messages/messages.module");
const schedule_1 = require("@nestjs/schedule");
const purchase_module_1 = require("./modules/purchase/purchase.module");
const gcp_pubsub_module_1 = require("./modules/integrations/gcp-pubsub/gcp-pubsub.module");
const contest_module_1 = require("./modules/contest/contest.module");
const contest_instance_module_1 = require("./modules/contest-instance/contest-instance.module");
const job_queue_module_1 = require("./modules/ancillary/job-queue/job-queue.module");
const fixture_module_1 = require("./modules/fixture/fixture.module");
const realtime_db_module_1 = require("./modules/integrations/firebase/realtime-db/realtime-db.module");
const lifecycles_module_1 = require("./modules/lifecycles/lifecycles.module");
const page_images_module_1 = require("./modules/page-images/page-images.module");
const markets_module_1 = require("./modules/markets/markets.module");
const market_lines_module_1 = require("./modules/market-lines/market-lines.module");
const payments_module_1 = require("./modules/integrations/payments/payments.module");
const stripe_module_1 = require("./modules/integrations/stripe-core/stripe.module");
const google_cloud_storage_module_1 = require("./modules/integrations/google-cloud-storage/google-cloud-storage.module");
const google_cloud_storage_service_1 = require("./modules/integrations/google-cloud-storage/google-cloud-storage.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            knex_1.KnexModule.forRootAsync({
                useFactory: () => ({
                    config: {
                        client: 'pg',
                        connection: {
                            host: config_1.default.DATABASE.HOST,
                            port: config_1.default.DATABASE.PORT,
                            user: config_1.default.DATABASE.USER,
                            password: config_1.default.DATABASE.PASSWORD,
                            database: config_1.default.DATABASE.DATABASE,
                        },
                        pool: {
                            min: config_1.default.DATABASE.POOL.MIN,
                            max: config_1.default.DATABASE.POOL.MAX,
                            acquireTimeoutMillis: 15000,
                            destroyTimeoutMillis: 5000,
                            idleTimeoutMillis: 5000,
                            reapIntervalMillis: 1000,
                        },
                        asyncStackTraces: true,
                    },
                }),
            }),
            health_module_1.HealthModule,
            user_management_module_1.UserManagementModule,
            mailing_1.MailingModule.forRoot({
                sendGrid: {
                    apiKey: config_1.default.MAILING.SENDGRID.TOKEN,
                    from: {
                        email: config_1.default.MAILING.SENDGRID.EMAIL,
                        name: config_1.default.MAILING.SENDGRID.NAME,
                    },
                },
                ethereal: {
                    user: config_1.default.MAILING.ETHEREAL.USER,
                    pass: config_1.default.MAILING.ETHEREAL.PASS,
                },
            }),
            dynamic_links_1.FirebaseDynamicLinksModule.forRoot({
                webApiKey: config_1.default.FIREBASE.WEB_API_KEY,
            }),
            balance_module_1.BalanceModule,
            firestore_module_1.FirestoreModule,
            payments_module_1.PaymentsModule,
            stripe_module_1.StripeModule,
            realtime_db_module_1.RealtimeDbModule,
            transaction_manager_module_1.TransactionManagerModule,
            cms_module_1.CmsModule,
            messages_module_1.MessagesModule,
            purchase_module_1.PurchaseModule,
            fixture_module_1.FixtureModule,
            schedule_1.ScheduleModule.forRoot(),
            gcp_pubsub_module_1.GcpPubsubModule,
            contest_module_1.ContestModule,
            contest_instance_module_1.ContestInstanceModule,
            job_queue_module_1.JobQueueModule,
            fixture_module_1.FixtureModule,
            lifecycles_module_1.LifecyclesModule,
            page_images_module_1.PageImagesModule,
            markets_module_1.MarketsModule,
            market_lines_module_1.MarketLinesModule,
            google_cloud_storage_module_1.GoogleCloudStorageModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: error_interceptor_1.ErrorInterceptor,
            },
            balance_service_1.BalanceService,
            balance_repository_1.BalanceRepository,
            firestore_service_1.FirestoreService,
            transaction_manager_service_1.TransactionManager,
            google_cloud_storage_service_1.GoogleCloudStorageService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map