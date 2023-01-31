import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { KnexModule } from 'modules/integrations/knex';
import config from 'config';

// Interceptors
import { TransformInterceptor } from 'interceptors/transform.interceptor';
import { ErrorInterceptor } from 'interceptors/error.interceptor';

// Modules
import { HealthModule } from 'modules/health/health.module';
import { UserManagementModule } from 'modules/user-management/user-management.module';
import { MailingModule } from 'modules/integrations/mailing';
import { FirebaseDynamicLinksModule } from 'modules/integrations/firebase/dynamic-links';
import { BalanceModule } from './modules/balance/balance.module';
import { BalanceService } from './modules/balance/balance.service';
import { FirestoreService } from './modules/integrations/firebase/firestore/firestore.service';
import { FirestoreModule } from './modules/integrations/firebase/firestore/firestore.module';
import { BalanceRepository } from './modules/balance/balance.repository';
import { TransactionManagerModule } from './modules/ancillary/transaction-manager/transaction-manager.module';
import { TransactionManager } from './modules/ancillary/transaction-manager/transaction-manager.service';
import { CmsModule } from './modules/integrations/cms/cms.module';
import { MessagesModule } from './modules/integrations/firebase/messages/messages.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { GcpPubsubModule } from './modules/integrations/gcp-pubsub/gcp-pubsub.module';
import { ContestModule } from './modules/contest/contest.module';
import { ContestInstanceModule } from './modules/contest-instance/contest-instance.module';
import { JobQueueModule } from './modules/ancillary/job-queue/job-queue.module';
import { FixtureModule } from './modules/fixture/fixture.module';
import { RealtimeDbModule } from './modules/integrations/firebase/realtime-db/realtime-db.module';
import { LifecyclesModule } from './modules/lifecycles/lifecycles.module';
import { PageImagesModule } from 'modules/page-images/page-images.module';
import { MarketsModule } from './modules/markets/markets.module';
import { MarketLinesModule } from './modules/market-lines/market-lines.module';
import { PaymentsModule } from 'modules/integrations/payments/payments.module';
import { StripeModule } from 'modules/integrations/stripe-core/stripe.module';
import { GoogleCloudStorageModule } from './modules/integrations/google-cloud-storage/google-cloud-storage.module';
import { GoogleCloudStorageService } from './modules/integrations/google-cloud-storage/google-cloud-storage.service';
@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'pg',
          connection: {
            host: config.DATABASE.HOST,
            port: config.DATABASE.PORT,
            user: config.DATABASE.USER,
            password: config.DATABASE.PASSWORD,
            database: config.DATABASE.DATABASE,
          },
          pool: {
            min: config.DATABASE.POOL.MIN,
            max: config.DATABASE.POOL.MAX,
            acquireTimeoutMillis: 15000,
            destroyTimeoutMillis: 5000,
            idleTimeoutMillis: 5000,
            reapIntervalMillis: 1000,
          },
          asyncStackTraces: true,
        },
      }),
    }),
    HealthModule,
    UserManagementModule,
    MailingModule.forRoot({
      sendGrid: {
        apiKey: config.MAILING.SENDGRID.TOKEN,
        from: {
          email: config.MAILING.SENDGRID.EMAIL,
          name: config.MAILING.SENDGRID.NAME,
        },
      },
      ethereal: {
        user: config.MAILING.ETHEREAL.USER,
        pass: config.MAILING.ETHEREAL.PASS,
      },
    }),
    FirebaseDynamicLinksModule.forRoot({
      webApiKey: config.FIREBASE.WEB_API_KEY,
    }),
    BalanceModule,
    FirestoreModule,
    PaymentsModule,
    StripeModule,
    RealtimeDbModule,
    TransactionManagerModule,
    CmsModule,
    MessagesModule,
    PurchaseModule,
    FixtureModule,
    ScheduleModule.forRoot(),
    GcpPubsubModule,
    ContestModule,
    ContestInstanceModule,
    JobQueueModule,
    FixtureModule,
    LifecyclesModule,
    PageImagesModule,
    MarketsModule,
    MarketLinesModule,
    GoogleCloudStorageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    BalanceService,
    BalanceRepository,
    FirestoreService,
    TransactionManager,
    GoogleCloudStorageService,
  ],
})
export class AppModule {}
