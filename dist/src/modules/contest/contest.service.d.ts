import { CmsService } from '../integrations/cms/cms.service';
import { FixtureService } from '../fixture/fixture.service';
import { JobQueueService } from '../ancillary/job-queue/job-queue.service';
import { JobWithDoneCallback } from 'pg-boss';
import { ContestInstanceService } from '../contest-instance/contest-instance.service';
import { ContestRepository } from './contest.repository';
import { CmsContestDto, CmsForceBet } from '../integrations/cms/dto/contest.dto';
import { FirebaseDynamicLinksService } from 'modules/integrations/firebase/dynamic-links';
import { Contest } from 'interfaces/db/tables';
import { FirestoreService } from '../integrations/firebase/firestore/firestore.service';
import { TransactionManagerService, TransactionManager } from '../ancillary/transaction-manager/transaction-manager.service';
import { ForceBetsService } from './force-bets/force-bets.service';
import { ContestInstanceParticipantsService } from '../contest-instance/contest-instance-participants/contest-instance-participants.service';
import CustomFreeBetInterface from '../fixture/interfaces/customFreeBet';
import { MarketsService } from '../markets/markets.service';
import { RealtimeDbService } from '../integrations/firebase/realtime-db/realtime-db.service';
import { PostLockOddsChangeDto } from '../fixture/dto/postLockOddsChange.dto';
export declare class ContestService {
    private cmsService;
    private fixtureService;
    private jobQueueService;
    private contestInstanceService;
    private contestRepository;
    private firestoreService;
    private firebaseDynamicLinksService;
    private forceBetsService;
    private transactionManager;
    private contestInstanceParticipantsService;
    private marketsService;
    private readonly realtimeDbService;
    private readonly logger;
    constructor(cmsService: CmsService, fixtureService: FixtureService, jobQueueService: JobQueueService, contestInstanceService: ContestInstanceService, contestRepository: ContestRepository, firestoreService: FirestoreService, firebaseDynamicLinksService: FirebaseDynamicLinksService, forceBetsService: ForceBetsService, transactionManager: TransactionManager, contestInstanceParticipantsService: ContestInstanceParticipantsService, marketsService: MarketsService, realtimeDbService: RealtimeDbService);
    onContestTemplateChange(contestTemplateId: string): Promise<void>;
    createContestWithStartTime(contestTemplate: CmsContestDto, data: unknown, fixture: {
        startTime: Date;
        currentPeriodId: string;
        sportId: string;
        fixtureName: string;
        isComplete: boolean;
        fixtureId: string;
    }): Promise<void>;
    instanceCreation(contestTemplate: CmsContestDto, contest: Contest): Promise<{
        id: string;
        instanceNumber: string;
        instanceName: string;
    }>;
    checkIsInHierarchy: (main: string, secondary: string, periods: {
        name: string;
        periodId: string;
        parentId: string;
    }[]) => boolean;
    createContestWithInstance(contestTemplate: CmsContestDto, data: unknown, fixture: {
        templateId: string;
        startTime: Date;
        currentPeriodId: string;
        sportId: string;
        fixtureName: string;
        isComplete: boolean;
        fixtureId: string;
    }): Promise<{
        contest: Contest;
        instance: {
            id: string;
            instanceNumber: string;
            instanceName: string;
        };
    }>;
    onCompleteHandler(fixtureId: string): Promise<void>;
    private createContestWithStartPeriod;
    onChangeCurrentPeriodHandler: (fixtureId: string) => Promise<void>;
    private getEntryFee;
    private getPrize;
    disableLockOddsForForceBets(params: PostLockOddsChangeDto): Promise<void>;
    createContest(cmsContestTemplate: CmsContestDto, templateId: string, fixtureId: string, fixtureName: string, sportId: string, originalData: unknown): Promise<Contest>;
    jobHandler: (job: JobWithDoneCallback<{
        meta: {
            fixtureId: string;
            contestTemplateId: number;
            contestTemplateData: CmsContestDto;
            originalData: unknown;
        };
    }, void>) => Promise<void>;
    resolveLockedOdds(forceBet: {
        lockOdds: boolean;
    }, activeMarkets: Array<string>): Promise<{}>;
    createForceBetForContest: (txManager: TransactionManagerService, fixtureId: string, forceBetPeriodId: number, contestTemplateId: number, forceBet: CmsForceBet, contest: Contest) => Promise<void>;
    createCustomForceBetForContest(txManager: TransactionManagerService, fixtureId: string, freeBetOpts: CustomFreeBetInterface, contest: Contest): Promise<void>;
    runCustomFreeBet(fixtureId: string, freeBetOpts: CustomFreeBetInterface): Promise<void>;
    forceBetJobHandler: (job: JobWithDoneCallback<{
        meta: {
            fixtureId: string;
            contestTemplateId: number;
            forceBetId: number;
            forceBetDelay: number;
            forceBetPeriodId: number;
        };
    }, void>) => Promise<void>;
    forceBetStopJobHandler: (job: JobWithDoneCallback<{
        meta: {
            forceBetId: string;
            contestId: string;
        };
    }, void>) => Promise<void>;
    getContest(txManager: TransactionManagerService, contestId: string): Promise<Contest>;
    getContestIdsWithNoActiveMarkets(contestIds: Array<string>): Promise<Array<string>>;
    getContestInstancesByContestId(contestId: string, { page, size }: {
        page: number;
        size: number;
    }): Promise<any[]>;
    hideContest(contestId: string): Promise<void>;
    private getLinkInfo;
    getDynamicLink(contestId: string): Promise<{
        success: boolean;
        link: boolean;
    } | {
        success: boolean;
        link: string;
    }>;
}
