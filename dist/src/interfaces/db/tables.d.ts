import { Knex } from 'knex';
import { BetOutcome } from 'modules/contest-instance/enums/betOutcome';
import { BetStatus } from 'modules/contest-instance/enums/betStatus';
export interface Contest {
    id: string;
    templateId: string;
    cmsContestTemplateId: number;
    fixtureId: string;
    minParticipants: number;
    maxParticipants: number | null;
    leavingAllowed: boolean;
    entryCurrency: string;
    bankrollAmount: number;
    prizeAmount: string;
    createdAt: string;
    contestName: string;
    type: string;
    entryFee: number;
    periodId: string;
    registrationStartTime: number;
    registrationStartPeriodId: string;
    cancellationTime: number;
    prizeType: string;
    prizeWinnerShare: string;
    balanceLong?: boolean;
    order: number;
    isHidden: boolean;
    contestOwnerResourceLink?: string;
    contestOwnerLabelName?: string;
    streamLive?: boolean;
    contestOwnerPromoCode?: string;
    cmsHomeVisible?: boolean;
}
export interface PrizeWinnerShareItem {
    id: number;
    winnersNumber: number;
    places: string;
    winSharePerPlace: number;
    totalShare: number;
    exactAmountPerPlace: number;
    fullDescription?: string;
}
export declare type PrizeWinnerShare = Array<PrizeWinnerShareItem>;
export interface ContestInstanceParticipant {
    id: string;
    contestInstanceId: string;
    userId: string;
    createdAt: string;
    updatedAt: string | Date;
    bankrollBalance: number;
    totalBalance: number;
    isExcluded: boolean;
    reasonOfExclude: string;
}
export interface ContestInstance {
    id: string;
    contestId: string;
    instanceName: string;
    currentParticipants: number;
    status: string;
    instanceNumber: number;
    createdAt: string;
    endTime?: string | Date;
    leavingAllowed: boolean;
    lateEntryPeriodId: string;
    lateEntryPeriodPassed?: boolean;
}
export interface Bet {
    id: string;
    userId: string;
    contestInstanceId: string;
    marketId: string;
    marketName: string;
    marketLineId: string;
    lineName: string;
    americanOdds: number;
    betAmount: number;
    winAmount: number;
    betStatus: BetStatus;
    betOutcome: BetOutcome;
    betTime: string;
}
export interface MarketLine {
    id: string;
    fixturePeriodId: string;
    fixtureId: string;
    statusId: string;
    marketLineId: string;
    isActive: boolean;
}
export interface Market {
    id: string;
    fixturePeriodId: number;
    fixtureId: string;
    typeId: string;
    marketId: string;
    isClosed: boolean;
    toggle: boolean;
    order: number;
}
export interface ForceBet {
    id: string;
    contestId: string;
    durationMin: number;
    isActive: boolean;
    createdAt: Date;
    marketTypeId: string;
    betLimit: number;
    cmsContestTemplateId?: number;
    cmsInfo?: string;
    title?: string;
    info?: string;
    notifyInSec?: number;
    lockOdds?: {
        [key: string]: {
            americanOdds: number;
            odds: number;
            referenceId: string;
            statusId: string;
        };
    };
}
export declare class SerializedForceBet implements Omit<ForceBet, 'marketTypeId'> {
    id: string;
    contestId: string;
    durationMin: number;
    isActive: boolean;
    createdAt: Date;
    marketTypeId: Array<string>;
    betLimit: number;
    cmsContestTemplateId?: number;
    cmsInfo?: string;
    title?: string;
    info?: string;
    notifyInSec?: number;
    lockOdds?: {
        [key: string]: {
            americanOdds: number;
            odds: number;
            referenceId: string;
            statusId: string;
        };
    };
}
export interface Fixture {
    id: string;
    fixtureId: string;
    sportId: string;
    name: string;
    startTime: Date;
    endTime: string;
    isLive: boolean;
    fixtureStatusId: string;
    status: string;
    rootPeriodId: string;
    currentPeriodId: string;
    period: string;
    isComplete: boolean;
    competitionId: string;
    createdAt: string;
    updatedAt: string;
    display?: boolean;
}
declare module 'knex/types/tables' {
    interface TokenBalance {
        id: string;
        userId: string;
        amount: string;
        updatedAt: string;
    }
    interface TokenTransaction {
        id: string;
        type: string;
        status: number;
        createdAt: string;
        updatedAt: string;
        amount: string;
        meta: string;
        balanceId: string;
        balanceAmountAfter: string;
    }
    interface RealMoneyBalance {
        id: string;
        userId: string;
        amount: string;
        updatedAt: string;
    }
    interface RealMoneyTransaction {
        id: string;
        type: string;
        status: number;
        createdAt: string;
        updatedAt: string;
        amount: string;
        meta: string;
        balanceId: string;
        balanceAmountAfter: string;
    }
    interface Tables {
        token_balance: Knex.CompositeTableType<TokenBalance, Omit<TokenBalance, 'amount' | 'id' | 'updatedAt'> & {
            amount: number;
        }, Partial<Omit<TokenBalance, 'amount' | 'id' | 'updatedAt'> & {
            amount: number;
        }>>;
        token_transactions: Knex.CompositeTableType<TokenTransaction, Omit<TokenTransaction, 'amount' | 'balanceAmountAfter' | 'meta' | 'id' | 'updatedAt' | 'createdAt'> & {
            amount: number;
            balanceAmountAfter: number;
            meta: Record<string, unknown> | string;
        }, Partial<Omit<TokenTransaction, 'amount' | 'balanceAmountAfter' | 'meta' | 'id' | 'updatedAt' | 'createdAt'> & {
            amount: number;
            balanceAmountAfter: number;
            meta: Record<string, unknown> | string;
        }>>;
        real_money_balance: Knex.CompositeTableType<RealMoneyBalance, Omit<RealMoneyBalance, 'amount' | 'id' | 'updatedAt'> & {
            amount: number;
        }, Partial<Omit<RealMoneyBalance, 'amount' | 'id' | 'updatedAt'> & {
            amount: number;
        }>>;
        real_money_transactions: Knex.CompositeTableType<RealMoneyTransaction, Omit<RealMoneyTransaction, 'amount' | 'balanceAmountAfter' | 'meta' | 'id' | 'updatedAt' | 'createdAt'> & {
            amount: number;
            balanceAmountAfter: number;
            meta: string;
        }, Partial<Omit<RealMoneyTransaction, 'amount' | 'balanceAmountAfter' | 'meta' | 'id' | 'updatedAt' | 'createdAt'> & {
            amount: number;
            balanceAmountAfter: number;
            meta: string;
        }>>;
        contests: Knex.CompositeTableType<Contest, Omit<Contest, 'id' | 'createdAt' | 'isHidden'>, Partial<Omit<Contest, 'id' | 'createdAt' | 'prizeWinnerShare'> & {
            prizeWinnerShare: PrizeWinnerShare;
        }>>;
        contest_instances: Knex.CompositeTableType<ContestInstance, Omit<ContestInstance, 'id' | 'createdAt' | 'currentParticipants' | 'endTime'>, Partial<Omit<ContestInstance, 'id' | 'createdAt'>>>;
        contest_instance_participants: Knex.CompositeTableType<ContestInstanceParticipant, Omit<ContestInstanceParticipant, 'id' | 'createdAt' | 'updatedAt' | 'isExcluded' | 'reasonOfExclude'>, Partial<Omit<ContestInstanceParticipant, 'id' | 'createdAt'>>>;
        bets: Knex.CompositeTableType<Bet, Omit<Bet, 'id' | 'betTime'>, Partial<Omit<Bet, 'id' | 'betTime'>>>;
        force_bets: Knex.CompositeTableType<ForceBet, Omit<ForceBet, 'id' | 'createdAt'>, Partial<Omit<ForceBet, 'id' | 'createdAt'>>>;
    }
}
