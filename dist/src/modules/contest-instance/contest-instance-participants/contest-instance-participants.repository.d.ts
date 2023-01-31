import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { BetsSettlementDetails } from '../bets/interfaces/bets-settlement-details';
import { BetOutcome } from '../enums/betOutcome';
import { BetStatus } from '../enums/betStatus';
import { ParticipantLeaderboard } from './interfaces/participant-leaderboard.interface';
import { UpdatedParticipantBalance } from './interfaces/updated-bankroll-balance.interface';
import { getContestInstanceParticipantsDto } from './interfaces/contestInstanceParticipiants.dto';
import { Knex } from 'modules/integrations/knex';
import { ContestInstanceStatus } from '../enums/contestInstanceStatus.enum';
import { ContestInstanceParticipant } from 'interfaces/db/tables';
import { User } from 'interfaces/user.interface';
import { getContestInstanceUserDto } from './interfaces/contestInstanceUser.dto';
export declare class ContestInstanceParticipantsRepository {
    private readonly knex;
    constructor(knex: Knex);
    replenishBalanceFromBetsToSettle(txManager: TransactionManagerService, betsSettlementDetails: BetsSettlementDetails): Promise<Array<UpdatedParticipantBalance>>;
    getUserByPromoCode(promoCode: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    getBetsAndOutcomeStatus(txManager: TransactionManagerService, betsSettlementDetails: BetsSettlementDetails): Promise<{
        betOutcome: BetOutcome;
        betStatus: BetStatus;
    }>;
    refundOnResettleBets(txManager: TransactionManagerService, betsSettlementDetails: BetsSettlementDetails): Promise<Array<UpdatedParticipantBalance>>;
    private replanishBalancesByStrategies;
    getParticipantLeaderboard(txManager: TransactionManagerService, contestInstanceId: string, lastPlaceNumber: number): Promise<ParticipantLeaderboard>;
    getContestAndParticipantsDetailsByInstanceId(instanceId: string): Promise<Array<getContestInstanceParticipantsDto>>;
    getUsersByInstanceId(instanceId: string): Promise<Array<User>>;
    getUsersByContestId(contestId: string): Promise<Array<getContestInstanceUserDto & {
        contestInstanceId: string;
    }>>;
    getContestInstanceStatus(instanceId: string, trx: TransactionManagerService): Promise<{
        status: ContestInstanceStatus;
    }>;
    isUserParticipant(instanceId: string, userId: string): Promise<{
        id: string;
    }>;
    isParticipantExcluded(participantid: string, instanceId: string): Promise<{
        isExcluded: boolean;
    }>;
    excludeParticipant(participantId: string, instanceId: string, reasonOfExclude: string, txManager: TransactionManagerService): Promise<number>;
    decrementInstanceValues(instanceId: string, txManager: TransactionManagerService, value?: number, fieldToDecrement?: string): Promise<number>;
    getUserById(userId: string): Promise<any>;
    getParticipantBetInfo(marketLineId: string): Promise<Array<{
        marketName: string;
        lineName: string;
        userId: string;
        contestName: string;
        contestId: string;
        contestInstanceId: string;
        winAmount: string;
    }>>;
    getUserNotificationsStatus(userId: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: "notificationsEnabled";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    viewParticipantBets(contestInstanceId: string, userId: string, page: string, size: string, orderBy: string, direction: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: "priceId" | "marketName" | "lineName" | "winAmount" | "betStatus" | "betOutcome" | "betTime" | "betAmount as risk" | "americanOdds as odds" | "bets.id as betId";
        _aliases: import("knex").Knex.Raw<any>;
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    getUserAsParticipantInstances(userId: string, deleteTime: number): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    getContestInstanceParticipantInfo(userId: string, contestInstanceId: string): import("knex").Knex.QueryBuilder<import("knex").Knex.CompositeTableType<ContestInstanceParticipant, Omit<ContestInstanceParticipant, "id" | "updatedAt" | "createdAt" | "isExcluded" | "reasonOfExclude">, Partial<Omit<ContestInstanceParticipant, "id" | "createdAt">>, Partial<Omit<ContestInstanceParticipant, "id" | "updatedAt" | "createdAt" | "isExcluded" | "reasonOfExclude">>>, {
        _base: ContestInstanceParticipant;
        _hasSelection: false;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    getFixtureAndContestNameByContestId(contestId: string): Promise<{
        fixtureName: string;
        contestName: string;
    }>;
}
