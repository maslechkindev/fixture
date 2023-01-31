import { Knex } from 'modules/integrations/knex';
import { Contest, Market } from 'interfaces/db/tables';
import { TransactionManagerService } from '../ancillary/transaction-manager/transaction-manager.service';
export declare class ContestRepository {
    private readonly knex;
    constructor(knex: Knex);
    createContest(contest: Omit<Contest, 'id' | 'createdAt' | 'isHidden'>): Promise<Contest>;
    getContest(txManager: TransactionManagerService, contestId: string): Promise<Contest>;
    getContests(txManager: TransactionManagerService, contest: Partial<Contest>): Promise<Contest[]>;
    getMarkets(txManager: TransactionManagerService, markets: Partial<Market>): Promise<Array<Market>>;
    checkMaxOrderByFixture(fixtureId: string): Promise<number>;
    getTypesForMarkets(txManager: TransactionManagerService, markets: Array<string>): Promise<Array<string>>;
    getMarketsForMarketTypes(txManager: TransactionManagerService, opts: Partial<Market>, types: Array<string>): Promise<Array<Market>>;
    getMarketsByIds(txManager: TransactionManagerService, opts: Partial<Market>, markets: Array<string>): Promise<Array<Market>>;
    getContestInstancesByContestId(contestId: string, params?: {
        page: number;
        size: number;
    }): Promise<any[]>;
    hideContest(contestId: string): import("knex").Knex.QueryBuilder<import("knex").Knex.CompositeTableType<Contest, Omit<Contest, "id" | "createdAt" | "isHidden">, Partial<Omit<Contest, "id" | "createdAt" | "prizeWinnerShare"> & {
        prizeWinnerShare: import("interfaces/db/tables").PrizeWinnerShare;
    }>, Partial<Omit<Contest, "id" | "createdAt" | "isHidden">>>, number>;
    getContestsByFixtureId(fixtureId: string): Promise<any>;
    getFirstInstanceId(contestId: string): import("knex").Knex.QueryBuilder<import("knex").Knex.CompositeTableType<import("interfaces/db/tables").ContestInstance, Omit<import("interfaces/db/tables").ContestInstance, "id" | "createdAt" | "endTime" | "currentParticipants">, Partial<Omit<import("interfaces/db/tables").ContestInstance, "id" | "createdAt">>, Partial<Omit<import("interfaces/db/tables").ContestInstance, "id" | "createdAt" | "endTime" | "currentParticipants">>>, {
        _base: import("interfaces/db/tables").ContestInstance;
        _hasSelection: true;
        _keys: "id as instanceId";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    getLinkInfo(contestId: string): import("knex").Knex.QueryBuilder<Contest & import("interfaces/db/tables").ContestInstance, {
        _base: Contest & import("interfaces/db/tables").ContestInstance;
        _hasSelection: true;
        _keys: "contestOwnerPromoCode" | "contest_instances.id as instanceId";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    getContestsWithNoActiveMarketsFromList(contestIds: Array<string>): Promise<Array<string>>;
}
