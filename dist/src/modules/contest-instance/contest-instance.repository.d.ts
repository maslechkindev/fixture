import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { Bet, ContestInstance, ContestInstanceParticipant, MarketLine } from '../../interfaces/db/tables';
import { ContestInstanceStatus } from './enums/contestInstanceStatus.enum';
import { ContestInstanceEntity } from './dto/activeContestInstances.dto';
import { BetStatus } from './enums/betStatus';
import { getUserBetsResponseDto } from './dto/pendingAndSettledBets.dto';
import { PrizeContestInstanceDetails } from './interfaces/prize-contest-instance-details.interface';
import { LeaderboardRow } from './dto/getContestInstanceLeaderboard.dto';
import { SearchUserContestInstanceResponseDto } from './dto/searchLiveContestInstances.dto';
import { GetLiveAndUpcomingInstancesType } from './types';
export declare class ContestInstanceRepository {
    private readonly knex;
    private readonly logger;
    private cache;
    constructor(knex: Knex);
    createContestInstance(txManager: TransactionManagerService, contestInstance: Omit<ContestInstance, 'id' | 'createdAt' | 'currentParticipants' | 'endTime'>): Promise<Array<{
        id: string;
        instanceNumber: string;
        instanceName: string;
        createdAt: string;
        endTime?: string;
    }>>;
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
        prizeWinnerShare?: import("../../interfaces/db/tables").PrizeWinnerShare;
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
    getParticipantsInfoByInstanceId(contestInstanceId: string, page: number, size: number, search?: string): Promise<any[]>;
    getPrizeContestInstanceDetails(contestInstanceId: string): import("knex").Knex.QueryBuilder<any, PrizeContestInstanceDetails & {
        fixtureName: string;
    }>;
    getUserRegisteredContestInstances(contestInstanceId: string, userId: string): import("knex").Knex.QueryBuilder<ContestInstanceParticipant & ContestInstance & import("../../interfaces/db/tables").Contest, {
        _base: ContestInstanceParticipant & ContestInstance & import("../../interfaces/db/tables").Contest;
        _hasSelection: true;
        _keys: "contest_instance_participants.contestInstanceId" | "contest_instance_participants.id" | "contest_instance_participants.createdAt" | "contest_instance_participants.totalBalance" | "contest_instance_participants.userId as userId" | "contest_instance_participants.bankrollBalance" | "contest_instance_participants.updatedAt";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    getContestInstanceStatusId(status: ContestInstanceStatus): Promise<string>;
    addParticipantToContestInstance(txManager: TransactionManagerService, userId: string, contestInstanceId: string, bankrollBalance: number): Promise<{
        currentParticipantsAfter: number;
        leavingAllowed: boolean;
        createdAt: number;
    }>;
    removeParticipantFromContestInstance(txManager: TransactionManagerService, userId: string, contestInstanceId: string): Promise<{
        deletedParticipantId: any;
        currentParticipantsAfter: any;
    }>;
    getNumberOfUserRegistrationsInContest(userId: string, contestId: string): Promise<number>;
    getNumberOfUserRegistrationsInContestInstance(userId: string, contestInstanceId: string): Promise<number>;
    setContestInstanceStatus(contestInstanceId: string, contestInstanceStatus: ContestInstanceStatus, txManager?: TransactionManagerService): Promise<boolean>;
    getUserContestsInstancesWithStatuses(id: string, limit: number, page: number, statuses: Array<string>, orderBy: string): Promise<Array<GetLiveAndUpcomingInstancesType>>;
    getContestInstancesRank(contestInstances: Array<string>, userId: string): Promise<any[]>;
    getActiveContestInstances(fixtureId: string, periodId: string, contestTypesParams: Array<string>, realMoneyState: boolean): Promise<Array<Partial<ContestInstanceEntity> & {
        cmsContestTemplateId?: number;
        cmsHomeVisible?: boolean;
        contestOwnerResourceLink?: string;
        contestOwnerLabelName?: string;
        lateEntryPeriodPassed: boolean | null;
    }>>;
    getInstancesByFixtureId(fixtureId: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: "contest_instances.id" | "contest_instances.contestId";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    getInstancesByContestId(contestId: string): import("knex").Knex.QueryBuilder<import("knex").Knex.CompositeTableType<ContestInstance, Omit<ContestInstance, "id" | "createdAt" | "endTime" | "currentParticipants">, Partial<Omit<ContestInstance, "id" | "createdAt">>, Partial<Omit<ContestInstance, "id" | "createdAt" | "endTime" | "currentParticipants">>>, {
        _base: ContestInstance;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    getActiveContestInstanceIdsForContests(fixtureId: string): Promise<Array<{
        instanceId: string;
        contestId: string;
        fixtureName: string;
    }>>;
    updateContestInstance(contestInstanceId: string, update: Partial<ContestInstance>, txManager?: TransactionManagerService): Promise<void>;
    getParticipantContestInstanceInfo(contestInstanceId: string, userId: string): Promise<Pick<ContestInstanceParticipant, 'id' | 'bankrollBalance' | 'contestInstanceId'>>;
    getContestInstanceLeaderboard(contestInstanceId: string): Promise<LeaderboardRow[]>;
    getMarketLinePriceDetails(marketLineId: string): Promise<any>;
    getMarketLineDetails(marketLineId: string, fixtureId: string): Promise<any>;
    getMarketLineFixtureId(marketLineId: string): Promise<string>;
    getMarketFixtureId(marketId: string): Promise<string>;
    saveBet(txManager: TransactionManagerService, betInfo: Pick<Bet, 'userId' | 'contestInstanceId' | 'marketId' | 'marketName' | 'marketLineId' | 'lineName' | 'americanOdds' | 'betAmount' | 'winAmount' | 'betStatus' | 'betOutcome'>): Promise<void>;
    getBetsForMarketType(txManager: TransactionManagerService, betInfo: Partial<Bet>, marketTypes: Array<string>): Promise<any[]>;
    updateParticipantBalanceInfo(txManager: TransactionManagerService, contestInstanceId: string, userId: string, betAmount: number): Promise<{
        bankrollBalance: number;
    }>;
    getMaxBetLimitInfo(contestInstanceId: string, userId: string, marketLineId: string): Promise<{
        maxBetLimit: number;
    }>;
    updateMaxBetLimit(txManager: TransactionManagerService, contestInstanceId: string, userId: string, marketLineId: string, maxBetLimit: number): Promise<void>;
    getPendingBetsAmount(txManager: TransactionManagerService, contestInstanceId: string, userId: string, marketLineId: string): Promise<number>;
    getContestInstancesDetailsWithFilters(filters?: {
        [key: string]: string;
    }): Promise<Array<{
        contestId: string;
        contestName: string;
        periodId: string;
        minParticipants: number;
        maxParticipants: number;
        bankrollAmount: number;
        status: ContestInstanceStatus;
        currentParticipants: number;
        instanceId: string;
        cancellationTime: number;
        fixtureName: string;
    }>>;
    getContestInstancesDetailsWithFiltersInPreRun(filters?: {
        [key: string]: string;
    }): Promise<Array<{
        contestId: string;
        contestName: string;
        periodId: string;
        minParticipants: number;
        maxParticipants: number;
        bankrollAmount: number;
        status: ContestInstanceStatus;
        currentParticipants: number;
        instanceId: string;
        cancellationTime: number;
        fixtureId: string;
    }>>;
    updateAllParticipantsBankRollAmount(contestInstanceId: string, bankrollAmount: number, txManager?: TransactionManagerService): Promise<void>;
    getFixtureMarketLines(fixtureId: string): Promise<Array<MarketLine>>;
    getUserContestInstancesIds(userId: string): Promise<Array<{
        contestInstanceId: string;
    }>>;
    searchLiveContestInstances(userId: string, subString: string): Promise<SearchUserContestInstanceResponseDto[]>;
    getParticipantBets(participantId: string, status: BetStatus, contestInstanceId: string, page: number, size: number, sortField?: string): Promise<Array<getUserBetsResponseDto>>;
    getUserBalance(userId: string, contestInstanceId: string): Promise<{
        totalBalance: number;
        bankrollBalance: number;
    }>;
    getInProgressContestInstanceIdsWithAllSettledBets(contestIds: Array<string>): Promise<Array<{
        instanceId: string;
        contestId: string;
        contestName: string;
    }>>;
    getActiveMarketLines(txManager: TransactionManagerService, marketId: string): Promise<MarketLine[]>;
    updateContestInstances(instanceIds: Array<string>, updateData: Record<string, unknown>): import("knex").Knex.QueryBuilder<import("knex").Knex.CompositeTableType<ContestInstance, Omit<ContestInstance, "id" | "createdAt" | "endTime" | "currentParticipants">, Partial<Omit<ContestInstance, "id" | "createdAt">>, Partial<Omit<ContestInstance, "id" | "createdAt" | "endTime" | "currentParticipants">>>, number>;
    getFixtureNameByContestId(contestId: string): Promise<{
        fixtureName: string;
    }>;
}
