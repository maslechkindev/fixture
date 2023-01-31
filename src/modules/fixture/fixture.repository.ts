import { InjectKnex, Knex } from 'modules/integrations/knex';
import { FixtureDto } from './dto/fixture.dto';
import { GetFixturesRequestDto } from './dto/getfixtures.dto';
import {
  ActiveFixtureDto,
  GetActiveFixturesRequestDto,
} from './dto/getActiveFixtures.dto';
import { Query } from '@nestjs/common';
import {
  Contest,
  ContestInstance,
  Fixture,
  Market,
} from 'interfaces/db/tables';
import { GetFixtureContestsRequestDto } from './dto/getFixtureContests.dto';
import { FixtureContestDto } from './dto/fixtureContest.dto';
import { CmsContestTemplateContestType } from '../../enums/cmsContestTemplateContestType';
import { FixtureStatusId } from './enums/fixture-status-id.enum';
import { contestType } from './enums/contestTypes.enum';
import { ContestInstanceStatus } from 'modules/contest-instance/enums/contestInstanceStatus.enum';
import { FixtureMarketDto } from './dto/fixtureMarket.dto';
import { GetFixtureMarketsRequestDto } from './dto/getFixtureMarkets.dto';
import { TransactionManagerService } from '../ancillary/transaction-manager/transaction-manager.service';
import { PostFixtureStartFreeBetsDto } from './dto/postFixtureStatFreeBets.dto';
import { MarketLineStatus } from 'modules/contest-instance/enums/marketLineStatus.enum';
import { BetStatus } from 'modules/contest-instance/enums/betStatus';
export class FixtureRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getFixtureDetails(fixtureId: string): Promise<{
    templateId: string;
    startTime: Date;
    currentPeriodId: string;
    sportId: string;
    fixtureName: string;
    isComplete: boolean;
    fixtureId: string;
    statusId: string;
  }> {
    return this.knex('fixtures')
      .first()
      .select(
        'fixtures.fixtureId',
        'competitions.templateId as templateId',
        'fixtures.startTime as startTime',
        'fixtures.currentPeriodId as currentPeriodId',
        'fixtures.sportId as sportId',
        'fixtures.name as fixtureName',
        'fixtures.isComplete as isComplete',
        'fixtures.fixtureStatusId as statusId',
      )
      .innerJoin(
        'competitions',
        'fixtures.competitionId',
        'competitions.competitionId',
      )
      .innerJoin(
        'fixture_statuses',
        'fixtures.fixtureStatusId',
        'fixture_statuses.fixtureStatusId',
      )
      .where({ fixtureId });
  }

  async getFixturesByTemplateIdsWithFilterByStatus(
    templateIds: Array<number>,
    fixtureStatusId: FixtureStatusId,
  ): Promise<Array<Fixture>> {
    return this.knex('fixtures')
      .innerJoin(
        'competitions',
        'fixtures.competitionId',
        'competitions.competitionId',
      )
      .whereIn('templateId', templateIds)
      .where({ fixtureStatusId });
  }

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
  }> {
    return this.knex('fixtures')
      .first()
      .select(
        'fixtures.id as id',
        'competitions.templateId as templateId',
        'fixtures.startTime as startTime',
        'fixtures.currentPeriodId as currentPeriodId',
        'fixtures.isComplete as isComplete',
        'fixtures.fixtureId as fixtureId',
        'fixtures.fixtureStatusId as fixtureStatusId',
        'fixtures.sportId as sportId',
        'fixtures.name as fixtureName',
      )
      .innerJoin(
        'competitions',
        'fixtures.competitionId',
        'competitions.competitionId',
      )
      .where({ 'fixtures.id': id });
  }

  getFixtures(
    params: GetFixturesRequestDto,
  ): Promise<Array<Partial<FixtureDto>>> {
    const { statuses } = params;
    const mappedStatuses = statuses.map((el) => '' + el);
    const query = this.knex
      .from('fixtures')
      .innerJoin(
        'competitions',
        'fixtures.competitionId',
        'competitions.competitionId',
      )
      .innerJoin(
        'fixture_statuses',
        'fixtures.fixtureStatusId',
        'fixture_statuses.fixtureStatusId',
      )
      .leftJoin('periods', 'fixtures.currentPeriodId', 'periods.periodId')
      .leftJoin('contests', 'fixtures.fixtureId', 'contests.fixtureId')
      .select(
        'fixtures.id as id',
        'fixtures.name as name',
        'competitions.name as competition',
        'fixtures.display as active',
        'fixtures.fixtureStatusId as fixtureStatusId',
        'fixtures.startTime as startTime',
        'periods.name as currentPeriod',
        this.knex.raw('count(*) OVER() as fullcount'),
      )
      .where(function () {
        this.where(function () {
          this.where('fixtures.isComplete', true).whereIn(
            'fixture_statuses.fixtureStatusId',
            mappedStatuses,
          );
        }).orWhere(function () {
          this.where('fixtures.isComplete', false)
            .whereNot(
              'fixture_statuses.fixtureStatusId',
              FixtureStatusId.PENDING,
            )
            .whereNotNull('contests.id');
        });
      })
      .groupBy([
        'fixtures.id',
        'fixtures.startTime',
        'competitions.name',
        'periods.name',
      ])
      .orderBy(params.orderBy, params.direction)
      .limit(params.size)
      .offset((params.page - 1) * params.size);

    if (typeof params.search === 'string' && params.search.length > 0) {
      const raw =
        'LOWER(:name:) like :search or LOWER(:competitionName:) like :search';
      query.where(
        this.knex.raw(raw, {
          name: `fixtures.name`,
          competitionName: `competitions.name`,
          search: `%${params.search.toLowerCase()}%`,
        }),
      );
    }

    return query;
  }

  async getActiveFixtures(
    @Query() params: GetActiveFixturesRequestDto,
  ): Promise<Array<Partial<ActiveFixtureDto>>> {
    const { realMoneyState } = params;
    const contestTypesParams = params?.contestTypes
      ? params.contestTypes.filter((el) => el.trim().length)
      : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = this.knex
      .from('fixtures')
      .innerJoin(
        'competitions',
        'fixtures.competitionId',
        'competitions.competitionId',
      )
      .innerJoin('contests', 'contests.fixtureId', 'fixtures.fixtureId')
      .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
      .innerJoin(
        'contest_instances',
        'contest_instances.contestId',
        'contests.id',
      )
      .innerJoin(
        'contest_instance_statuses',
        'contest_instance_statuses.id',
        'contest_instances.status',
      )
      .leftJoin('periods', 'fixtures.currentPeriodId', 'periods.periodId')
      .innerJoin('sports', 'competitions.sportId', 'sports.sportId')
      .select(
        'fixtures.fixtureId as fixtureId',
        'fixtures.name as name',
        'fixtures.isLive as isLive',
        'fixtures.startTime as startTime',
        'fixtures.currentPeriodId as currentPeriodId',
        'periods.name as currentPeriodName',
        'competitions.competitionId as competitionId',
        'competitions.templateId as competitionIdCMS',
        'competitions.name as competitionName',
        'sports.sportIcon as sportIcon',
      )
      .where(function () {
        this.where(
          'contest_instance_statuses.status',
          '=',
          ContestInstanceStatus.REG_OPEN,
        );
        this.orWhere(function () {
          this.where(
            'contest_instance_statuses.status',
            '=',
            ContestInstanceStatus.IN_PROGRESS,
          )
            .andWhere('contest_instances.lateEntryPeriodPassed', '=', false)
            .whereNotNull('contest_instances.lateEntryPeriodId');
        });
      })
      .where({ 'fixtures.display': true, 'fixtures.isComplete': true })
      .where(function () {
        if (contestTypesParams.length) {
          const modifiedContestTypesParams = !realMoneyState
            ? contestTypesParams.filter((el) => el !== 'real_money')
            : contestTypesParams;
          this.where('currencies.currency', 'in', modifiedContestTypesParams);
          if (contestTypesParams.includes(contestType.FREE)) {
            this.orWhere('contests.entryFee', '=', 0);
          } else {
            this.andWhere('contests.entryFee', '>', 0);
          }
          return;
        }
        if (!realMoneyState) {
          this.andWhere('currencies.currency', '=', 'token');
        }
      });

    if (params.fixtureId) {
      query.where('fixtures.fixtureId', '=', params.fixtureId);
    }
    if (params.competitionTemplateId) {
      query.where('competitions.templateId', '=', params.competitionTemplateId);
    }
    query

      .orderBy(params.orderBy, params.direction)
      .limit(params.size)
      .offset((params.page - 1) * params.size)
      .distinct('fixtures.fixtureId');
    return query;
  }

  getFixtureById(id: string): Promise<
    Partial<Fixture> & {
      competition: string;
      sport: string;
      templateId: string;
    }
  > {
    return this.knex('fixtures')
      .innerJoin(
        'competitions',
        'fixtures.competitionId',
        'competitions.competitionId',
      )
      .innerJoin('sports', 'fixtures.sportId', 'sports.sportId')
      .where({ 'fixtures.id': id })
      .first()
      .select([
        'fixtures.id as id',
        'fixtures.name as name',
        'fixtures.sportId as sportId',
        'fixtures.competitionId as competitionId',
        'fixtures.startTime as startTime',
        'fixtures.isLive as isLive',
        'fixtures.marketSuspensionRules as marketSuspensionRules',
        'fixtures.delay as delay',
        'fixtures.fixtureStatusId',
        'fixtures.display as display',
        'fixtures.currentPeriodId as currentPeriodId',
        'fixtures.fixtureId as fixtureId',
        'competitions.name as competition',
        'competitions.templateId as templateId',
        'sports.name as sport',
      ]);
  }

  updateFixture(id: string, changedFields: Partial<Fixture>) {
    return this.knex('fixtures').update(changedFields).where({ id });
  }

  updateFixtureMarkets(
    txManager: TransactionManagerService,
    id: string,
    markets: Array<Partial<Market>>,
  ) {
    const conn = txManager?.transaction || this.knex;
    return Promise.all(
      markets.map(async (market) => {
        return conn('markets').update(market).where({ id: market.id });
      }),
    );
  }
  countFixtureContests(fixtureId: string) {
    const query = this.knex('contests')
      .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
      .innerJoin(
        'contest_instances',
        'contests.id',
        '=',
        'contest_instances.contestId',
      )
      .innerJoin(
        'contest_instance_statuses',
        'contest_instances.status',
        '=',
        'contest_instance_statuses.id',
      )
      .count('contest_instances.id')
      .where('fixtures.id', '=', fixtureId)
      .whereIn('contest_instance_statuses.status', [
        ContestInstanceStatus.IN_PROGRESS,
        ContestInstanceStatus.IN_QUEUE,
        ContestInstanceStatus.REG_OPEN,
      ]);
    return query;
  }
  async getContests(
    txManager: TransactionManagerService,
    contest: Partial<Contest>,
  ) {
    const conn = txManager?.transaction || this.knex;
    return conn('contests').select('*').where(contest);
  }

  async getFixtureContestsByFixtureId(
    id: string,
    params: GetFixtureContestsRequestDto,
  ): Promise<Array<FixtureContestDto>> {
    const query = this.knex('contests')
      .innerJoin('periods', 'contests.periodId', 'periods.periodId')
      .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
      .innerJoin(
        'contest_instances',
        'contest_instances.contestId',
        '=',
        'contests.id',
      )
      .innerJoin(
        'contest_instance_statuses',
        'contest_instance_statuses.id',
        '=',
        'contest_instances.status',
      )
      .where('fixtures.id', '=', id)
      .select<Array<FixtureContestDto>>([
        'contests.id as id',
        'contests.contestName as contestName',
        'contests.type as type',
        'contests.createdAt as createdAt',
        'periods.name as period',
        'contests.order',
        this.knex.raw(
          '(SELECT COUNT(*) FROM contest_instances WHERE "contestId" = contests.id) as "instancesNumber"',
        ),
        this.knex.raw('COUNT(*) OVER() as fullcount'),
      ])
      .orderBy(params.orderBy, params.direction)
      .limit(params.size)
      .offset((params.page - 1) * params.size);

    if (typeof params.search === 'string' && params.search.length > 0) {
      const raw = 'LOWER(:name:) like :search';
      query.where(
        this.knex.raw(raw, {
          name: `contests.contestName`,
          search: `%${params.search.toLowerCase()}%`,
        }),
      );
    }

    return query;
  }

  async getFixtureMarketsByFixtureId(
    fixtureId: string,
    params: GetFixtureMarketsRequestDto,
  ): Promise<
    Array<
      FixtureMarketDto & {
        marketLineStatus?: Array<string>;
        betStatus?: Array<string>;
      }
    >
  > {
    const isActiveClause = [
      this.knex('active_markets')
        .distinct('active_markets.marketId')
        .join('contests', 'contests.id', 'active_markets.contestId')
        .join('fixtures', 'fixtures.fixtureId', 'contests.fixtureId')
        .where('fixtures.id', fixtureId),
    ];

    return this.knex
      .with(
        'markets_alias',
        this.knex('markets')
          .innerJoin('fixtures', 'markets.fixtureId', 'fixtures.fixtureId')
          .leftJoin(
            'market_lines_market_relations',
            'market_lines_market_relations.marketId',
            'markets.marketId',
          )
          .leftJoin(
            'market_lines',
            'market_lines.marketLineId',
            'market_lines_market_relations.marketLineId',
          )
          .leftJoin('bets', 'bets.marketId', 'markets.marketId')
          .where('fixtures.id', fixtureId)
          .select<Array<FixtureMarketDto>>([
            'markets.id as id',
            'markets.name as name',
            'markets.fixturePeriodId as fixturePeriodId',
            'markets.order as order',
            'markets.toggle as toggle',
            'markets.marketId as marketId',
            'markets.typeId as typeId',
            this.knex.raw(
              'ARRAY_AGG(market_lines."statusId") as "marketLineStatuses"',
            ),
            this.knex.raw('ARRAY_AGG(bets."betStatus") as "betStatuses"'),
          ])
          .groupBy('markets.id'),
      )
      .select([
        '*',
        this.knex.raw(
          'markets_alias."marketId" in (??) as "isActive"',
          isActiveClause,
        ),
        this.knex.raw(
          `?=ANY("marketLineStatuses") and ?=ANY("betStatuses") as "withPendingBets"`,
          [MarketLineStatus.UNKNOWN_BUT_RESOLVED, BetStatus.PENDING],
        ),
        this.knex.raw('COUNT(*) OVER() as fullcount'),
      ])
      .from('markets_alias')
      .whereRaw('markets_alias."marketId" in (??)', isActiveClause)
      .orWhere((builder) => {
        builder
          .whereRaw(`?=ANY("marketLineStatuses")`, [
            MarketLineStatus.UNKNOWN_BUT_RESOLVED,
          ])
          .whereRaw(`?=ANY("betStatuses")`, [BetStatus.PENDING]);
      })
      .limit(params.size)
      .offset((params.page - 1) * params.size)
      .orderBy('withPendingBets', 'ASC')
      .orderBy(params.orderBy, params.direction);
  }

  async getMarketLinesForMarket(marketId: string, fixtureId: string) {
    return this.knex('market_lines')
      .innerJoin(
        'market_lines_market_relations',
        'market_lines_market_relations.marketLineId',
        'market_lines.marketLineId',
      )
      .innerJoin('fixtures', 'fixtures.fixtureId', 'market_lines.fixtureId')
      .innerJoin(
        'markets',
        'markets.marketId',
        'market_lines_market_relations.marketId',
      )
      .where({
        'markets.id': marketId,
        'fixtures.id': fixtureId,
      })
      .select([
        'market_lines.marketLineId as marketLineId',
        'market_lines.status as status',
        'market_lines.name as name',
        'market_lines.id as id',
      ]);
  }

  async updateMarketLineStatusManual(marketLineId: string, statusId: string) {
    const status = await this.knex('market_line_statuses')
      .first()
      .where({ marketLineStatusId: statusId });
    return this.knex('market_lines')
      .update({ statusId, status: status.name, settledManually: true })
      .where({ marketLineId });
  }

  async getCmsMarketsForFixtureContestFreeBets(
    id: string,
  ): Promise<{ cmsInfo: PostFixtureStartFreeBetsDto }> {
    return this.knex('fixtures')
      .join('contests', 'fixtures.fixtureId', 'contests.fixtureId')
      .join('force_bets', 'contests.id', 'force_bets.contestId')
      .where({ 'fixtures.id': id, 'force_bets.isActive': true })
      .select('force_bets.cmsInfo as cmsInfo')
      .first();
  }

  async getAllFixtureContests(fixtureId: string) {
    return this.knex('contests').select('id', 'periodId').where({ fixtureId });
  }

  async getFixtureStatusIdAndCurrentPeriodId(fixtureId: string): Promise<{
    fixtureStatusId: FixtureStatusId;
    fixtureCurrentPeriodId: string;
  }> {
    const fixtureStatusIdAndCurrentPeriodId = await this.knex('fixtures')
      .first(
        'fixtureStatusId',
        this.knex.ref('currentPeriodId').as('fixtureCurrentPeriodId'),
      )
      .where({ fixtureId });

    return fixtureStatusIdAndCurrentPeriodId;
  }

  // TODO: add cache here as an example https://www.npmjs.com/package/memoizee
  async getAllFixturePeriods(): Promise<
    Array<{
      name: string;
      periodId: string;
      parentId: string;
    }>
  > {
    return this.knex('periods').select(['name', 'periodId', 'parentId']);
  }

  async getFixtureCustomContestIds(id: string) {
    const result = await this.knex('contests')
      .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
      .where('fixtures.id', '=', id)
      .whereIn('contests.type', [
        CmsContestTemplateContestType.CUSTOM,
        CmsContestTemplateContestType.PERSONAL,
      ])
      .select<Array<{ cmsContestTemplateId: number }>>(
        'contests.cmsContestTemplateId as cmsContestTemplateId',
      );
    return result.map((contest) => contest.cmsContestTemplateId);
  }

  async getFixtureContestById(fixtureId: string, contestId: string) {
    const contest = this.knex('contests')
      .innerJoin(
        'contest_instances',
        'contests.id',
        '=',
        'contest_instances.contestId',
      )
      .innerJoin(
        'contest_instance_statuses',
        'contest_instance_statuses.id',
        '=',
        'contest_instances.status',
      )
      .innerJoin('fixtures', 'contests.fixtureId', 'fixtures.fixtureId')
      .innerJoin('currencies', 'contests.entryCurrency', 'currencies.id')
      .select([
        'contests.id as id',
        'contests.contestName as contestName',
        'contests.minParticipants as minParticipants',
        'contests.maxParticipants as maxParticipants',
        'contests.bankrollAmount as bankrollAmount',
        'contests.contestName as contestName',
        'contests.fixtureId as fixtureId',
        'contests.cmsContestTemplateId as cmsContestTemplateId',
        'contests.type as type',
        'contests.contestOwnerResourceLink as contestOwnerResourceLink',
        'contests.contestOwnerLabelName as contestOwnerLabelName',
        'contests.streamLive as streamLive',
        'fixtures.name as fixtureName',
        'currencies.currency as productType',
        'contest_instances.createdAt',
      ])
      .where('contests.id', '=', contestId)
      .andWhere('fixtures.id', '=', fixtureId)
      .first();

    const result = await contest;
    return result;
  }
  async updateFixtureContestById(
    contestId: string,
    updateData: Pick<Contest, 'contestName'>,
  ) {
    return this.knex('contests').update(updateData).where({ id: contestId });
  }
  async updateContestInstancesByContestId(
    contestId: string,
    updateData: Pick<ContestInstance, 'instanceName'>,
  ) {
    return this.knex('contest_instances')
      .update(updateData)
      .where({ contestId });
  }
  getActiveContestInstancesByFixtureId(fixtureId: string) {
    return this.knex('fixtures')
      .innerJoin('contests', 'contests.fixtureId', '=', 'fixtures.fixtureId')
      .innerJoin(
        'contest_instances',
        'contest_instances.contestId',
        '=',
        'contests.id',
      )
      .innerJoin(
        'contest_instance_statuses',
        'contest_instance_statuses.id',
        'contest_instances.status',
      )
      .select(
        'contest_instances.id',
        'contest_instances.contestId',
        'contests.contestName',
        'contest_instance_statuses.status as status',
        'contests.entryFee',
        'fixtures.name as fixtureName',
      )
      .where('fixtures.id', '=', fixtureId)
      .whereIn('contest_instance_statuses.status', [
        ContestInstanceStatus.IN_PROGRESS,
        ContestInstanceStatus.IN_QUEUE,
        ContestInstanceStatus.REG_OPEN,
      ]);
  }
  updateContests(contests: Array<Partial<Contest>>) {
    const updatedContest = contests.map((contest) =>
      this.knex('contests')
        .update({ order: contest.order })
        .where({ id: contest.id }),
    );
    return updatedContest;
  }
  updateContestsOrder(contestId: string, order: number) {
    return this.knex('contests').update({ order }).where({ id: contestId });
  }

  setActiveMarket(marketId: string, contestId: string) {
    return this.knex('active_markets').insert({ marketId, contestId });
  }

  deleteActiveMarket(marketId: string, contestId: string) {
    return this.knex('active_markets').where({ marketId, contestId }).del();
  }
}
