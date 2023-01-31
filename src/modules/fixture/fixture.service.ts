import { forwardRef, Inject, Injectable, Query, Logger } from '@nestjs/common';
import { GetFixturesDto, GetFixturesRequestDto } from './dto/getfixtures.dto';
import * as R from 'ramda';
import { FixtureDto } from './dto/fixture.dto';
import { FixtureRepository } from './fixture.repository';

import {
  ActiveFixtureDto,
  GetActiveFixturesRequestDto,
} from './dto/getActiveFixtures.dto';
import { Contest, Fixture, Market } from 'interfaces/db/tables';
import {
  GetFixtureContestsRequestDto,
  GetFixtureContestsResponseDto,
} from './dto/getFixtureContests.dto';
import { FixtureContestDto } from './dto/fixtureContest.dto';
import { BadRequestExceptionCustom, ERRORS } from 'helpers/errors';
import { FixtureStatusId } from './enums/fixture-status-id.enum';
import { operationTypes } from './enums/operationType.enum';
import { CmsService } from 'modules/integrations/cms/cms.service';
import {
  GetFixtureMarketsRequestDto,
  GetFixtureMarketsResponseDto,
} from './dto/getFixtureMarkets.dto';
import { FixtureMarketDto } from './dto/fixtureMarket.dto';
import { isEmpty } from 'ramda';
import { TransactionManager } from '../ancillary/transaction-manager/transaction-manager.service';
import { ContestService } from 'modules/contest/contest.service';
import { ContestInstanceService } from 'modules/contest-instance/contest-instance.service';
import { ContestInstanceStatus } from 'modules/contest-instance/enums/contestInstanceStatus.enum';
import { CancelContestInstanceService } from 'modules/contest-instance/cancel/cancel.service';
import { TemplateGeneratorParamsType } from './types/templateGeneratorType';
import { MarketsService } from '../markets/markets.service';
import { FirestoreService } from '../integrations/firebase/firestore/firestore.service';
import { memoizedHierarchyChecker } from 'helpers/common/memoizedHierarchyChecker';
import { MarketLinesService } from '../market-lines/market-lines.service';
import { firestore } from 'firebase-admin';

@Injectable()
export class FixtureService {
  private readonly logger = new Logger(FixtureService.name);

  constructor(
    private fixtureRepository: FixtureRepository,
    private cmsService: CmsService,
    private transactionManager: TransactionManager,
    @Inject(forwardRef(() => ContestService))
    private readonly contestService: ContestService,
    private readonly contestInstanceService: ContestInstanceService,
    private readonly cancelContestInstanceService: CancelContestInstanceService,
    private marketsService: MarketsService,
    private firestoreService: FirestoreService,
    private marketsLinesService: MarketLinesService,
  ) {}

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
    return this.fixtureRepository.getFixtureDetails(fixtureId);
  }

  async getFixturesByTemplateIdsWithFilterByStatus(
    templateIds: Array<number>,
    fixtureStatusId: FixtureStatusId,
  ): Promise<Array<Fixture>> {
    return this.fixtureRepository.getFixturesByTemplateIdsWithFilterByStatus(
      templateIds,
      fixtureStatusId,
    );
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
    return this.fixtureRepository.getFixtureDetailsById(id);
  }

  async getAll(params: GetFixturesRequestDto): Promise<GetFixturesDto> {
    const fullFixtures: Array<Partial<FixtureDto> & { fullcount?: string }> =
      await this.fixtureRepository.getFixtures(params);
    let count = 0;
    if (fullFixtures.length > 0) {
      count = +fullFixtures[0].fullcount;
    }

    const fixtures = fullFixtures.map((fixture) => {
      fixture.currentPeriod =
        fixture.state === 'In Progress' ? fixture.currentPeriod : '-';
      fixture.active = fixture.active ? 'Yes' : 'No';
      return R.omit(['fullcount'], fixture);
    });

    return {
      fixtures: count > 0 ? fixtures : [],
      count,
    };
  }

  async getActive(
    @Query() params: GetActiveFixturesRequestDto,
  ): Promise<Array<Partial<ActiveFixtureDto>>> {
    const realMoneyState = await this.cmsService.getRealMoneyState();
    return this.fixtureRepository.getActiveFixtures({
      ...params,
      realMoneyState,
    });
  }

  getFixtureById(id: string): Promise<
    Partial<Fixture> & {
      competition: string;
      sport: string;
      templateId: string;
    }
  > {
    return this.fixtureRepository.getFixtureById(id);
  }

  async updateFixture(data: Partial<Fixture>, fixture: Partial<Fixture>) {
    const intersectObj = (
      a: Partial<Fixture>,
      b: Partial<Fixture>,
    ): Partial<Fixture> =>
      R.pickBy(
        (val, key: keyof Fixture) =>
          !R.equals(JSON.stringify(val), JSON.stringify(a[key])),
        b,
      );

    const changedFields: Partial<Fixture> = intersectObj(fixture, data);
    if (isEmpty(changedFields)) {
      return;
    }
    if (changedFields.name) {
      const txManager = await this.transactionManager.begin();
      try {
        const contests = await this.fixtureRepository.getContests(txManager, {
          fixtureId: fixture.fixtureId,
        });
        contests.map(async (contest) => {
          await this.firestoreService.mergeUpdate(`/contests`, contest.id, {
            fixtureName: changedFields.name,
          });
        });
        await txManager.commit();
      } catch (err) {
        await txManager.rollback();
        throw err;
      }
    }

    return this.fixtureRepository.updateFixture(data.id, changedFields);
  }

  async updateFixtureMarkets(
    fixture: Partial<Fixture>,
    markets: Array<Partial<Market>>,
  ) {
    const txManager = await this.transactionManager.begin();
    try {
      await this.fixtureRepository.updateFixtureMarkets(
        txManager,
        fixture.id,
        markets,
      );
      const contests = await this.fixtureRepository.getContests(txManager, {
        fixtureId: fixture.fixtureId,
      });
      const syncMarkets = await this.marketsService.getMarketsByIds(
        txManager,
        markets.map((m) => m.id),
      );
      const mappedSyncMarkets: { [key: string]: Partial<Market> } =
        Array.isArray(syncMarkets)
          ? syncMarkets.reduce((acc, m) => {
              acc[m.id] = m;
              return acc;
            }, {})
          : {};
      let syncedMarkets = await Promise.all(
        markets.map(
          async (m): Promise<Partial<Market> & { isActive?: boolean }> => {
            if (!mappedSyncMarkets[m.id]) {
              return null;
            }
            const result: Partial<Market> & { isActive?: boolean } = R.merge(
              mappedSyncMarkets[m.id],
              m,
            );
            result.isActive = await this.marketsService.isActiveMarket(
              txManager,
              {
                typeId: result.typeId,
                marketId: result.marketId,
                isClosed: result.isClosed,
                toggle: result.toggle,
                fixturePeriodId: result.fixturePeriodId,
              },
              { checkToggle: true },
            );
            return result;
          },
        ),
      );
      syncedMarkets = syncedMarkets.filter((m) => m !== null);
      Promise.allSettled(
        contests.map(async (contest) => {
          return Promise.allSettled(
            syncedMarkets.map(async (market) => {
              try {
                if (market.toggle !== true) {
                  await this.fixtureRepository.deleteActiveMarket(
                    market.marketId,
                    contest.id,
                  );
                  return this.firestoreService.delete(
                    `/contests/${contest.id}/markets`,
                    market.marketId,
                  );
                }
                if (market.isActive === true) {
                  await this.fixtureRepository.setActiveMarket(
                    market.marketId,
                    contest.id,
                  );
                  return this.firestoreService.mergeUpdate(
                    `/contests/${contest.id}/markets`,
                    market.marketId,
                    market,
                  );
                }
              } catch (err) {
                this.logger.error(err.message, err.stack);
              }
            }),
          );
        }),
      );
      await txManager.commit();
    } catch (err) {
      await txManager.rollback();
      throw err;
    }
  }

  async updateContests(contests: Array<Partial<Contest>>) {
    await Promise.all(
      contests.map((contest) =>
        this.fixtureRepository.updateContestsOrder(contest.id, contest.order),
      ),
    );
  }

  async updateMarketLines(
    marketLines: Array<{
      marketLineId: string;
      status: string;
      marketId: string;
    }>,
  ) {
    return Promise.all(
      marketLines.map(async (ml) => {
        await this.fixtureRepository.updateMarketLineStatusManual(
          ml.marketLineId,
          ml.status,
        );
        await this.marketsLinesService.onMarketLineChangeStatus(
          ml.marketLineId,
          ml.status,
        );
      }),
    );
  }

  async getFixtureContestsByFixtureId(
    id: string,
    params: GetFixtureContestsRequestDto,
  ): Promise<GetFixtureContestsResponseDto> {
    const contests: Array<FixtureContestDto> =
      await this.fixtureRepository.getFixtureContestsByFixtureId(id, params);
    return {
      contests,
      count: contests.length ? +contests[0].fullcount : 0,
    };
  }

  async getActiveFixtureMarketsByFixtureId(
    id: string,
    params: GetFixtureMarketsRequestDto,
  ): Promise<Omit<GetFixtureMarketsResponseDto, 'marketLines'>> {
    const cmsInfo =
      await this.fixtureRepository.getCmsMarketsForFixtureContestFreeBets(id);
    const markets: Array<
      FixtureMarketDto & {
        marketLineStatus?: Array<string>;
        betStatus?: Array<string>;
      }
    > = await this.fixtureRepository.getFixtureMarketsByFixtureId(id, params);
    return {
      markets: markets,
      cmsInfo: cmsInfo?.cmsInfo,
      count: markets.length ? Number(markets[0].fullcount) : 0,
    };
  }

  async getMarketLinesForMarket(marketId: string, fixtureId: string) {
    return this.fixtureRepository.getMarketLinesForMarket(marketId, fixtureId);
  }

  async getExpiredFixtureContestIds(fixtureId: string): Promise<Array<string>> {
    const expiredFixtureContests = [];

    const allFixtureContests =
      await this.fixtureRepository.getAllFixtureContests(fixtureId);

    const { fixtureStatusId, fixtureCurrentPeriodId } =
      await this.fixtureRepository.getFixtureStatusIdAndCurrentPeriodId(
        fixtureId,
      );

    if (this.isFixtureEnded({ fixtureStatusId })) {
      expiredFixtureContests.push(...allFixtureContests);
    } else {
      const periods = await this.getAllFixturePeriods();
      const outOfFixtureCurrentPeriodContests = allFixtureContests.filter(
        ({ periodId }) => {
          const isFixtureCurrentPeriodInContestPeriodHierarchy =
            this.checkIsInHierarchy(periodId, fixtureCurrentPeriodId, periods);
          return !isFixtureCurrentPeriodInContestPeriodHierarchy;
        },
      );
      expiredFixtureContests.push(...outOfFixtureCurrentPeriodContests);
    }

    return expiredFixtureContests.map(({ id }) => id);
  }

  async haveFixtureEnded(fixtureId: string): Promise<boolean> {
    const { fixtureStatusId } =
      await this.fixtureRepository.getFixtureStatusIdAndCurrentPeriodId(
        fixtureId,
      );
    return this.isFixtureEnded({ fixtureStatusId });
  }

  private isFixtureEnded({
    fixtureStatusId,
  }: Pick<Fixture, 'fixtureStatusId'>) {
    const endedStatuses = [
      FixtureStatusId.ENDED,
      FixtureStatusId.CANCELED,
      FixtureStatusId.WALKOVER,
      FixtureStatusId.ABANDONED,
      FixtureStatusId.RETIRED,
    ];

    return endedStatuses.includes(fixtureStatusId as FixtureStatusId);
  }

  async getAllFixturePeriods() {
    return this.fixtureRepository.getAllFixturePeriods();
  }

  memoizedHierarchyChecker = () => {
    const cache = {} as {
      [key: string]: boolean;
    };

    return (
      main: string,
      secondary: string,
      periods: Array<{
        name: string;
        periodId: string;
        parentId: string;
      }>,
    ) => {
      if (`${secondary}-${main}` in cache) {
        return cache[`${secondary}-${main}`];
      }

      if (!main || !secondary) {
        return false;
      }

      if (main === secondary) {
        cache[`${secondary}-${main}`] = true;
        return true;
      }

      let periodId = secondary;
      while (periodId) {
        const period = periods.find((p) => p.periodId === periodId);
        if (!period) {
          cache[`${secondary}-${main}`] = false;
          return false;
        }

        const parentPeriod = periods.find(
          (p) => p.periodId === period.parentId,
        );
        if (!parentPeriod) {
          cache[`${secondary}-${main}`] = false;
          return false;
        }

        if (parentPeriod.periodId === main) {
          cache[`${secondary}-${main}`] = true;
          return true;
        }

        periodId = parentPeriod.periodId;
      }
      cache[`${secondary}-${main}`] = false;
      return false;
    };
  };

  checkIsInHierarchy = memoizedHierarchyChecker();

  parseContestTemplateIds(ids: string) {
    try {
      const parsedData = JSON.parse(ids);
      return parsedData;
    } catch (e) {
      throw new BadRequestExceptionCustom(
        ERRORS.FIXTURE_MANAGEMENT.INVALID_CONTEST_TEMPLATE_IDS_PASSED,
      );
    }
  }

  getFixtureCustomContestIds(id: string) {
    return this.fixtureRepository.getFixtureCustomContestIds(id);
  }

  async countFixtureContests(fixtureId: string): Promise<string | number> {
    const [{ count }] = await this.fixtureRepository.countFixtureContests(
      fixtureId,
    );

    return count;
  }

  async getFixtureContestById(fixtureId: string, contestId: string) {
    const contest = await this.fixtureRepository.getFixtureContestById(
      fixtureId,
      contestId,
    );
    return contest;
  }
  async updateFixtureContestById(
    contestId: string,
    updateData: Pick<
      Contest,
      | 'contestName'
      | 'contestOwnerResourceLink'
      | 'contestOwnerLabelName'
      | 'streamLive'
    >,
  ) {
    await this.fixtureRepository.updateFixtureContestById(
      contestId,
      updateData,
    );
    if (updateData.contestName) {
      const contestInstancesId =
        await this.contestInstanceService.getInstancesByContestId(contestId);

      await this.fixtureRepository.updateContestInstancesByContestId(
        contestId,
        {
          instanceName: updateData.contestName,
        },
      );

      await this.firestoreService.update(
        '/contests',
        contestId,
        R.pick(['contestName'], updateData),
      );
      await Promise.all(
        contestInstancesId.map(async ({ id }) => {
          await this.firestoreService.update(
            `/contests/${contestId}/instances`,
            id,
            { instanceName: updateData.contestName },
          );
        }),
      );
    }
    await this.firestoreService.update('/contests', contestId, {
      contestOwnerResourceLink:
        updateData.contestOwnerResourceLink || firestore.FieldValue.delete(),
      contestOwnerLabelName:
        updateData.contestOwnerLabelName || firestore.FieldValue.delete(),
      streamLive: updateData.streamLive,
    });

    const collection = `/contests/${contestId}/instances`;
    const instanceIds = await this.firestoreService.getCollectionIds(
      collection,
    );
    await Promise.all(
      instanceIds.map(async (instanceId) => {
        await this.firestoreService.mergeUpdate(collection, instanceId, {
          instanceName: String(updateData.contestName),
        });
      }),
    );
  }
  private templateComparer(params: TemplateGeneratorParamsType) {
    if (params.instanceStatus === ContestInstanceStatus.IN_PROGRESS) {
      return `Get ${params.place} prize  in the ${params.contestName}`;
    }
    if (
      params.instanceStatus === ContestInstanceStatus.REG_OPEN ||
      params.instanceStatus === ContestInstanceStatus.IN_QUEUE
    ) {
      return `Refund of entry fee to ${params.fixtureName} - ${params.contestName}' if contest not free`;
    }
  }

  async performAction(operationType: string, fixtureId: string) {
    const instances =
      await this.fixtureRepository.getActiveContestInstancesByFixtureId(
        fixtureId,
      );

    const transactionNameTemplateGenerator = (
      operationType: string,
      fixtureName: string,
    ): ((params: TemplateGeneratorParamsType) => string) => {
      if (operationType === operationTypes.FINISH) {
        return (params: TemplateGeneratorParamsType) =>
          this.templateComparer(params);
      }
      return (params: TemplateGeneratorParamsType) =>
        `Refund of entry fee to ${fixtureName} - ${params.contestName}`;
    };

    const resolveAction: { [key: string]: () => unknown } = {
      finish: async () => {
        try {
          await Promise.allSettled(
            instances.map((instance) => {
              const templateGenerator = transactionNameTemplateGenerator(
                operationType,
                instance.fixtureName,
              );
              if (instance.status === ContestInstanceStatus.IN_PROGRESS) {
                return this.contestInstanceService.finishContestInstance(
                  instance.id,
                  instance.contestId,
                  instance.contestName,
                  instance.status,
                  templateGenerator,
                );
              } else {
                return this.cancelContestInstanceService.cancelContest(
                  { contestId: instance.contestId, instanceId: instance.id },
                  true,
                  instance.fixtureName,
                  transactionNameTemplateGenerator(
                    operationTypes.CANCEL,
                    instance.fixtureName,
                  ),
                  instance.entryFee,
                );
              }
            }),
          );

          await this.fixtureRepository.updateFixture(fixtureId, {
            display: false,
          });
          return { success: true };
        } catch (err) {
          this.logger.error(
            `finishingFixtureProcess:${err.message}`,
            err.stack,
          );
          throw err;
        }
      },
      cancel: async () => {
        try {
          await Promise.allSettled(
            instances.map((instance) => {
              const templateGenerator = transactionNameTemplateGenerator(
                operationType,
                instance.fixtureName,
              );
              return this.cancelContestInstanceService.cancelContest(
                { contestId: instance.contestId, instanceId: instance.id },
                true,
                instance.fixtureName,
                templateGenerator,
                instance.entryFee,
              );
            }),
          );
          await this.fixtureRepository.updateFixture(fixtureId, {
            display: false,
          });
          return { success: true };
        } catch (err) {
          this.logger.error(
            `cancelingFixtureProcess:${err.message}`,
            err.stack,
          );
          throw err;
        }
      },
      hide: async () => {
        try {
          await this.fixtureRepository.updateFixture(fixtureId, {
            display: false,
          });
          return { success: true };
        } catch (err) {
          this.logger.error(`hidingFixtureProcess:${err.message}`, err.stack);
          throw err;
        }
      },
    };
    const resolver = resolveAction[operationType];
    const result = await resolver();
    return result;
  }
}
