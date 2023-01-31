import { GetFixturesDto, GetFixturesRequestDto } from './dto/getfixtures.dto';
import { FixtureRepository } from './fixture.repository';
import { ActiveFixtureDto, GetActiveFixturesRequestDto } from './dto/getActiveFixtures.dto';
import { Contest, Fixture, Market } from 'interfaces/db/tables';
import { GetFixtureContestsRequestDto, GetFixtureContestsResponseDto } from './dto/getFixtureContests.dto';
import { FixtureStatusId } from './enums/fixture-status-id.enum';
import { CmsService } from 'modules/integrations/cms/cms.service';
import { GetFixtureMarketsRequestDto, GetFixtureMarketsResponseDto } from './dto/getFixtureMarkets.dto';
import { TransactionManager } from '../ancillary/transaction-manager/transaction-manager.service';
import { ContestService } from 'modules/contest/contest.service';
import { ContestInstanceService } from 'modules/contest-instance/contest-instance.service';
import { CancelContestInstanceService } from 'modules/contest-instance/cancel/cancel.service';
import { MarketsService } from '../markets/markets.service';
import { FirestoreService } from '../integrations/firebase/firestore/firestore.service';
import { MarketLinesService } from '../market-lines/market-lines.service';
export declare class FixtureService {
    private fixtureRepository;
    private cmsService;
    private transactionManager;
    private readonly contestService;
    private readonly contestInstanceService;
    private readonly cancelContestInstanceService;
    private marketsService;
    private firestoreService;
    private marketsLinesService;
    private readonly logger;
    constructor(fixtureRepository: FixtureRepository, cmsService: CmsService, transactionManager: TransactionManager, contestService: ContestService, contestInstanceService: ContestInstanceService, cancelContestInstanceService: CancelContestInstanceService, marketsService: MarketsService, firestoreService: FirestoreService, marketsLinesService: MarketLinesService);
    getFixtureDetails(fixtureId: string): Promise<{
        templateId: string;
        startTime: Date;
        currentPeriodId: string;
        sportId: string;
        fixtureName: string;
        isComplete: boolean;
        fixtureId: string;
        statusId: string;
    }>;
    getFixturesByTemplateIdsWithFilterByStatus(templateIds: Array<number>, fixtureStatusId: FixtureStatusId): Promise<Array<Fixture>>;
    getFixtureDetailsById(id: string): Promise<{
        id: string;
        templateId: string;
        startTime: Date;
        currentPeriodId: string;
        sportId: string;
        fixtureName: string;
        isComplete: boolean;
        fixtureId: string;
        fixtureStatusId: string;
    }>;
    getAll(params: GetFixturesRequestDto): Promise<GetFixturesDto>;
    getActive(params: GetActiveFixturesRequestDto): Promise<Array<Partial<ActiveFixtureDto>>>;
    getFixtureById(id: string): Promise<Partial<Fixture> & {
        competition: string;
        sport: string;
        templateId: string;
    }>;
    updateFixture(data: Partial<Fixture>, fixture: Partial<Fixture>): Promise<number>;
    updateFixtureMarkets(fixture: Partial<Fixture>, markets: Array<Partial<Market>>): Promise<void>;
    updateContests(contests: Array<Partial<Contest>>): Promise<void>;
    updateMarketLines(marketLines: Array<{
        marketLineId: string;
        status: string;
        marketId: string;
    }>): Promise<void[]>;
    getFixtureContestsByFixtureId(id: string, params: GetFixtureContestsRequestDto): Promise<GetFixtureContestsResponseDto>;
    getActiveFixtureMarketsByFixtureId(id: string, params: GetFixtureMarketsRequestDto): Promise<Omit<GetFixtureMarketsResponseDto, 'marketLines'>>;
    getMarketLinesForMarket(marketId: string, fixtureId: string): Promise<any[]>;
    getExpiredFixtureContestIds(fixtureId: string): Promise<Array<string>>;
    haveFixtureEnded(fixtureId: string): Promise<boolean>;
    private isFixtureEnded;
    getAllFixturePeriods(): Promise<{
        name: string;
        periodId: string;
        parentId: string;
    }[]>;
    memoizedHierarchyChecker: () => (main: string, secondary: string, periods: Array<{
        name: string;
        periodId: string;
        parentId: string;
    }>) => boolean;
    checkIsInHierarchy: (main: string, secondary: string, periods: {
        name: string;
        periodId: string;
        parentId: string;
    }[]) => boolean;
    parseContestTemplateIds(ids: string): any;
    getFixtureCustomContestIds(id: string): Promise<number[]>;
    countFixtureContests(fixtureId: string): Promise<string | number>;
    getFixtureContestById(fixtureId: string, contestId: string): Promise<any>;
    updateFixtureContestById(contestId: string, updateData: Pick<Contest, 'contestName' | 'contestOwnerResourceLink' | 'contestOwnerLabelName' | 'streamLive'>): Promise<void>;
    private templateComparer;
    performAction(operationType: string, fixtureId: string): Promise<unknown>;
}
