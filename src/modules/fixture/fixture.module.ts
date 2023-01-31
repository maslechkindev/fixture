import { Module, forwardRef } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureRepository } from './fixture.repository';
import { EntryModule } from '../user-management/auth/entry/entry.module';
import { FixtureController } from './fixture.controller';
import { CmsModule } from '../integrations/cms/cms.module';
import { ContestService } from '../contest/contest.service';
import { JobQueueService } from '../ancillary/job-queue/job-queue.service';
import { ContestRepository } from '../contest/contest.repository';
import { FixturesCmsController } from './fixtures.cms.controller';
import { ContestInstanceModule } from '../contest-instance/contest-instance.module';
import { ContestInstanceParticipantsModule } from '../contest-instance/contest-instance-participants/contest-instance-participants.module';
import { ForceBetsService } from '../contest/force-bets/force-bets.service';
import { ForceBetsRepository } from '../contest/force-bets/force-bets.repository';
import { CancelContestInstanceModule } from 'modules/contest-instance/cancel/cancel.module';
import { TransactionManager } from '../ancillary/transaction-manager/transaction-manager.service';
import { ContestModule } from '../contest/contest.module';
import { MarketsService } from '../markets/markets.service';
import { MarketsModule } from '../markets/markets.module';
import { FirestoreModule } from '../integrations/firebase/firestore/firestore.module';
import { FirestoreService } from '../integrations/firebase/firestore/firestore.service';
import { MarketLinesService } from '../market-lines/market-lines.service';
import { MarketLinesModule } from '../market-lines/market-lines.module';

@Module({
  imports: [
    CmsModule,
    EntryModule,
    ContestInstanceModule,
    ContestInstanceParticipantsModule,
    CancelContestInstanceModule,
    forwardRef(() => ContestModule),
    MarketsModule,
    FirestoreModule,
    MarketLinesModule,
  ],
  controllers: [FixtureController, FixturesCmsController],
  providers: [
    FixtureService,
    FixtureRepository,
    ContestService,
    ContestRepository,
    JobQueueService,
    ForceBetsService,
    ForceBetsRepository,
    TransactionManager,
    MarketsService,
    FirestoreService,
    MarketLinesService,
  ],
  exports: [FixtureService, FixtureRepository, MarketLinesService],
})
export class FixtureModule {}
