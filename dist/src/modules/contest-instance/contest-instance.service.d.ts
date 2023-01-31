import { UserBetsType } from './types';
import { Bet, Contest, ContestInstance, MarketLine } from 'interfaces/db/tables';
import { User } from 'interfaces/user.interface';
import { TransactionManager, TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { BalanceService } from 'modules/balance/balance.service';
import { FirestoreService } from 'modules/integrations/firebase/firestore/firestore.service';
import { ContestInstanceRepository } from './contest-instance.repository';
import { ContestInstanceStatus } from './enums/contestInstanceStatus.enum';
import { ActiveContestInstancesResponseDto } from './dto/activeContestInstances.dto';
import { BetStatus } from './enums/betStatus';
import { FixtureService } from '../fixture/fixture.service';
import { JobQueueService } from '../ancillary/job-queue/job-queue.service';
import { PlaceBetDetails } from './interfaces/placeBetDetails.interface';
import { ContestService } from '../contest/contest.service';
import { ContestInstanceDetailsInterface } from './interfaces/contestInstanceDetails.interface';
import { WinnersRewardingService } from './winners-rewarding/winners-rewarding.service';
import { LeaderboardRow } from './dto/getContestInstanceLeaderboard.dto';
import { DeleteContestInstanceService } from './delete/delete.service';
import { CancelContestInstanceService } from './cancel/cancel.service';
import { SearchUserContestInstanceResponseDto } from './dto/searchLiveContestInstances.dto';
import { WinAmountCalculationService } from './winners-rewarding/win-amount-calculation.service';
import { RealtimeDbService } from '../integrations/firebase/realtime-db/realtime-db.service';
import { ContestInstanceParticipantsService } from './contest-instance-participants/contest-instance-participants.service';
import { GetLiveAndUpcomingInstanceResponseDto } from './dto/getLiveAndUpcomingInstances.dto';
import { CmsService } from 'modules/integrations/cms/cms.service';
import { FollowService } from '../user-management/follow/follow.service';
import { TemplateGeneratorParamsType } from 'modules/fixture/types/templateGeneratorType';
export declare class ContestInstanceService {
    private contestInstanceParticipantsService;
    private readonly deleteContestInstanceService;
    private readonly cancelContestInstanceService;
    private contestInstanceRepository;
    private balanceService;
    private transactionManager;
    private firestoreService;
    private contestService;
    private fixtureService;
    private winnersRewardingService;
    private jobQueueService;
    private winAmountCalculationService;
    private realtimeDbService;
    private cmsService;
    private followService;
    private readonly logger;
    constructor(contestInstanceParticipantsService: ContestInstanceParticipantsService, deleteContestInstanceService: DeleteContestInstanceService, cancelContestInstanceService: CancelContestInstanceService, contestInstanceRepository: ContestInstanceRepository, balanceService: BalanceService, transactionManager: TransactionManager, firestoreService: FirestoreService, contestService: ContestService, fixtureService: FixtureService, winnersRewardingService: WinnersRewardingService, jobQueueService: JobQueueService, winAmountCalculationService: WinAmountCalculationService, realtimeDbService: RealtimeDbService, cmsService: CmsService, followService: FollowService);
    createContestInstance(txManager: TransactionManagerService | null, contest: Contest, lateEntryPeriodId?: string | null, instanceNumber?: number, status?: string): Promise<{
        id: string;
        instanceNumber: string;
        instanceName: string;
    }>;
    setContestInstanceStatus(contestInstanceId: string, contestInstanceStatus: ContestInstanceStatus, contestInstanceDetails: Omit<ContestInstanceDetailsInterface, 'entryFee' | 'currency'>, txManager: TransactionManagerService): Promise<void>;
    private userRegisteredContestsChecker;
    private inQueueSetter;
    shouldSetInQueueStatusChecker(contestInstanceDetails: Partial<ContestInstanceDetailsInterface>, currentParticipantsAfter: number): boolean;
    private isRegistrationClosedChecker;
    private isContestInstanceFullChecker;
    private mandatoryRequirementsChecker;
    getInstancesByContestId(contestId: string): Promise<ContestInstance[]>;
    registerParticipantToContestInstance(userDetails: Pick<User, 'id' | 'username' | 'avatar'>, contestInstanceId: string, overwrittenEntryFee?: number): Promise<void>;
    withdrawParticipantFromContestInstance(userId: string, contestInstanceId: string): Promise<void>;
    private syncContestInstanceWithFirestore;
    private saveParticipantToFirestore;
    private deleteParticipantFromFirestore;
    mapError(err: unknown): void;
    validateStatuses(upcomingStatuses: Array<ContestInstanceStatus>): ContestInstanceStatus[];
    statusesValidator(upcomingStatuses: string): ContestInstanceStatus[];
    private settedPlace;
    private settedPrize;
    getUserContestsInstancesWithStatuses(id: string, limit: number, page: number, statuses: string[], user: User | null): Promise<Array<GetLiveAndUpcomingInstanceResponseDto>>;
    getActiveContestInstances(fixtureId: string, periodId: string, limit: number, userId: string | null, contestTypes: Array<string>): Promise<ActiveContestInstancesResponseDto[]>;
    getParticipantContestInstanceInfo(contestInstanceId: string, userId: string): Promise<Pick<import("interfaces/db/tables").ContestInstanceParticipant, "id" | "contestInstanceId" | "bankrollBalance">>;
    getParticipantsInfoByInstanceId(contestInstanceId: string, page: number, size: number, search?: string): Promise<{
        participantsInfo: ({
            prize: string;
            status: string;
            userId: string;
            contestId: string;
            prizeType: string;
            totalBalance: string;
            isExcluded: boolean;
            reasonOfExclude: string;
            place?: string;
            instanceId: string;
            fullcount: string;
        } | {
            prize: number;
            status: string;
            userId: string;
            contestId: string;
            prizeType: string;
            totalBalance: string;
            isExcluded: boolean;
            reasonOfExclude: string;
            place?: string;
            instanceId: string;
            fullcount: string;
        } | {
            status: string;
            userId: string;
            contestId: string;
            prizeType: string;
            totalBalance: string;
            isExcluded: boolean;
            reasonOfExclude: string;
            place?: string;
            instanceId: string;
            fullcount: string;
        })[];
        count: number;
    }>;
    getContestInstanceLeaderboard(contestInstanceId: string, contestInstanceDetails: Partial<ContestInstanceDetailsInterface>, userId?: string, followingOnly?: boolean): Promise<LeaderboardRow[]>;
    getContestInstanceDetails(contestInstanceId: string): Promise<{
        status: ContestInstanceStatus;
        startTime: Date;
        fixtureId: string;
        rootPeriodId: string;
        currentPeriodId: string;
        cmsContestTemplateId?: number;
        minParticipants: number;
        maxParticipants: number;
        leavingAllowed?: boolean;
        bankrollAmount: number;
        contestName: string;
        contestId: string;
        instanceName: string;
        instanceNumber: number;
        currentParticipants?: number;
        registrationStartTime?: number;
        registrationStartPeriodId?: string;
        prizeType?: import("../contest/enums/contestPrizeType.enum").ContestPrizeType;
        prizeWinnerShare?: import("interfaces/db/tables").PrizeWinnerShare;
        lateEntryPeriodId?: string;
        lateEntryPeriodPassed?: string;
        balanceLong?: boolean;
        fixtureName: string;
        contestLeavingAllowed?: boolean;
        entryFeeDetails: {
            entryFee: number;
            currency: import("../../enums/currency").Currency;
        };
    }>;
    getMarketLinePriceDetails(marketLineId: string): Promise<any>;
    getMarketLineDetails(marketLineId: string, fixtureId: string): Promise<any>;
    parceParticipantLeaderBoard(leaderboardFull: LeaderboardRow[], page: number, size: number, userId: string): {
        leaderboard: LeaderboardRow[];
        playerInfo: {};
        myInfo: {};
    };
    getPlayerInfoByUserId(leaderboardFull: LeaderboardRow[], userId: string): LeaderboardRow;
    sliceLeaderboard(leaderboardFull: LeaderboardRow[], page: number, size: number): LeaderboardRow[];
    getMaxBetLimitInfo(contestInstanceId: string, userId: string, marketLineId: string): Promise<{
        maxBetLimit: number;
    }>;
    calculateWinAmount(betAmount: number, odds: number): number;
    calculateForcedBetAndWinAmounts(odds: number, forcedBetLimit: number): {
        winAmount: number;
        betAmount: number;
    };
    getBetsForMarketType(txManager: TransactionManagerService, betInfo: Partial<Bet>, marketTypes: Array<string>): Promise<any[]>;
    placeBet(betDetails: PlaceBetDetails): Promise<void>;
    placeForcedBet(betDetails: PlaceBetDetails, forcedBetId: string): Promise<void>;
    runOrCancelInstanceOnChangeCurrentPeriod: (fixtureId: string) => Promise<void>;
    tryToRunInstancesOnActiveMarketChange: (contestId: string, activePrice: boolean) => Promise<void>;
    updateParticipantBankrollBalanceInFirestore: (collection: string, bankrollBalance: number) => Promise<void>;
    runContestInstance: (contestInstance: {
        contestId: string;
        contestName: string;
        minParticipants: number;
        status: ContestInstanceStatus;
        currentParticipants: number;
        instanceId: string;
        bankrollAmount: number;
        fixtureId: string;
    }) => Promise<void>;
    checkIsInHierarchy: (main: string, secondary: string, periods: {
        name: string;
        periodId: string;
        parentId: string;
    }[]) => boolean;
    searchLiveContestInstances(userId: string, subString: string): Promise<SearchUserContestInstanceResponseDto[]>;
    getParticipantBets(participantId: string, status: BetStatus, contestInstanceId: string, page: number, size: number, sortField?: string): Promise<Array<UserBetsType>>;
    updateContestInstances(fixtureId: string): Promise<void>;
    getUserBalance(userId: string, contestInstanceId: string): Promise<{
        bankrollBalance: number;
        totalBalance: number;
    }>;
    getMarketLineFixtureId(marketLineId: string): Promise<string>;
    getMarketFixtureId(marketId: string): Promise<string>;
    finishContestInstancesWhichAreReady(fixtureId: string): Promise<void>;
    cancelContestInstancesOnFixtureStatusChange(fixtureId: string): Promise<void>;
    finishContestInstance(contestInstanceId: string, contestId: string, contestName: string, instanceStatus?: string, templateGenerator?: (params: TemplateGeneratorParamsType) => string): Promise<void>;
    getReadyToFinishContestInstances(fixtureId: string): Promise<{
        instanceId: string;
        contestId: string;
        contestName: string;
    }[]>;
    getActiveMarketLines(txManager: TransactionManagerService, marketId: string): Promise<MarketLine[]>;
    getFixtureNameByContestId(contestId: string): Promise<{
        fixtureName: string;
    }>;
}
