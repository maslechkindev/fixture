import { Knex } from 'modules/integrations/knex';
import { FixtureDto } from './dto/fixture.dto';
import { GetFixturesRequestDto } from './dto/getfixtures.dto';
import { ActiveFixtureDto, GetActiveFixturesRequestDto } from './dto/getActiveFixtures.dto';
import { Contest, ContestInstance, Fixture, Market } from 'interfaces/db/tables';
import { GetFixtureContestsRequestDto } from './dto/getFixtureContests.dto';
import { FixtureContestDto } from './dto/fixtureContest.dto';
import { FixtureStatusId } from './enums/fixture-status-id.enum';
import { FixtureMarketDto } from './dto/fixtureMarket.dto';
import { GetFixtureMarketsRequestDto } from './dto/getFixtureMarkets.dto';
import { TransactionManagerService } from '../ancillary/transaction-manager/transaction-manager.service';
import { PostFixtureStartFreeBetsDto } from './dto/postFixtureStatFreeBets.dto';
export declare class FixtureRepository {
    private readonly knex;
    constructor(knex: Knex);
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
    getFixtures(params: GetFixturesRequestDto): Promise<Array<Partial<FixtureDto>>>;
    getActiveFixtures(params: GetActiveFixturesRequestDto): Promise<Array<Partial<ActiveFixtureDto>>>;
    getFixtureById(id: string): Promise<Partial<Fixture> & {
        competition: string;
        sport: string;
        templateId: string;
    }>;
    updateFixture(id: string, changedFields: Partial<Fixture>): import("knex").Knex.QueryBuilder<any, number>;
    updateFixtureMarkets(txManager: TransactionManagerService, id: string, markets: Array<Partial<Market>>): Promise<number[]>;
    countFixtureContests(fixtureId: string): import("knex").Knex.QueryBuilder<any, {
        _base: {};
        _hasSelection: true;
        _keys: never;
        _aliases: {};
        _single: false;
        _intersectProps: {
            [k: string]: string | number;
        };
        _unionProps: never;
    }[]>;
    getContests(txManager: TransactionManagerService, contest: Partial<Contest>): Promise<Contest[]>;
    getFixtureContestsByFixtureId(id: string, params: GetFixtureContestsRequestDto): Promise<Array<FixtureContestDto>>;
    getFixtureMarketsByFixtureId(fixtureId: string, params: GetFixtureMarketsRequestDto): Promise<Array<FixtureMarketDto & {
        marketLineStatus?: Array<string>;
        betStatus?: Array<string>;
    }>>;
    getMarketLinesForMarket(marketId: string, fixtureId: string): Promise<any[]>;
    updateMarketLineStatusManual(marketLineId: string, statusId: string): Promise<number>;
    getCmsMarketsForFixtureContestFreeBets(id: string): Promise<{
        cmsInfo: PostFixtureStartFreeBetsDto;
    }>;
    getAllFixtureContests(fixtureId: string): Promise<Pick<Contest, "id" | "periodId">[]>;
    getFixtureStatusIdAndCurrentPeriodId(fixtureId: string): Promise<{
        fixtureStatusId: FixtureStatusId;
        fixtureCurrentPeriodId: string;
    }>;
    getAllFixturePeriods(): Promise<Array<{
        name: string;
        periodId: string;
        parentId: string;
    }>>;
    getFixtureCustomContestIds(id: string): Promise<number[]>;
    getFixtureContestById(fixtureId: string, contestId: string): Promise<any>;
    updateFixtureContestById(contestId: string, updateData: Pick<Contest, 'contestName'>): Promise<number>;
    updateContestInstancesByContestId(contestId: string, updateData: Pick<ContestInstance, 'instanceName'>): Promise<number>;
    getActiveContestInstancesByFixtureId(fixtureId: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: "contest_instances.id" | "contest_instances.contestId" | "contests.contestName" | "contests.entryFee" | "fixtures.name as fixtureName" | "contest_instance_statuses.status as status";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    updateContests(contests: Array<Partial<Contest>>): import("knex").Knex.QueryBuilder<import("knex").Knex.CompositeTableType<Contest, Omit<Contest, "id" | "createdAt" | "isHidden">, Partial<Omit<Contest, "id" | "createdAt" | "prizeWinnerShare"> & {
        prizeWinnerShare: import("interfaces/db/tables").PrizeWinnerShare;
    }>, Partial<Omit<Contest, "id" | "createdAt" | "isHidden">>>, number>[];
    updateContestsOrder(contestId: string, order: number): import("knex").Knex.QueryBuilder<import("knex").Knex.CompositeTableType<Contest, Omit<Contest, "id" | "createdAt" | "isHidden">, Partial<Omit<Contest, "id" | "createdAt" | "prizeWinnerShare"> & {
        prizeWinnerShare: import("interfaces/db/tables").PrizeWinnerShare;
    }>, Partial<Omit<Contest, "id" | "createdAt" | "isHidden">>>, number>;
    setActiveMarket(marketId: string, contestId: string): import("knex").Knex.QueryBuilder<any, number[]>;
    deleteActiveMarket(marketId: string, contestId: string): import("knex").Knex.QueryBuilder<any, number>;
}
