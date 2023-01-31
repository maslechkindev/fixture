import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { FixtureController } from './fixture.controller';
import { FixtureService } from './fixture.service';
import { FixtureRepository } from './fixture.repository';
import { GetActiveFixturesRequestDto } from './dto/getActiveFixtures.dto';
import { MarketSuspensionRule } from 'enums/marketSuspensionRule';
import { ERRORS } from 'helpers/errors';
import { ContestService } from '../contest/contest.service';
import { ContestRepository } from '../contest/contest.repository';
import { CancelContestInstanceService } from 'modules/contest-instance/cancel/cancel.service';
import { ContestInstanceParticipantsService } from 'modules/contest-instance/contest-instance-participants/contest-instance-participants.service';
import { ContestInstanceService } from '../contest-instance/contest-instance.service';
import { ContestInstanceRepository } from '../contest-instance/contest-instance.repository';
import { JobQueueService } from '../ancillary/job-queue/job-queue.service';
import { CmsService } from '../integrations/cms/cms.service';
import { FixturesCmsController } from './fixtures.cms.controller';
import { TransactionManager } from '../ancillary/transaction-manager/transaction-manager.service';
import { MarketsService } from '../markets/markets.service';
import { NotificationsService } from 'modules/integrations/firebase/messages/notifications/notifications.service';
import { FirestoreService } from '../integrations/firebase/firestore/firestore.service';
import { MarketLinesService } from '../market-lines/market-lines.service';
import { BetsService } from '../contest-instance/bets/bets.service';
import { BetsRepository } from '../contest-instance/bets/bets.repository';
import { RealtimeDbService } from '../integrations/firebase/realtime-db/realtime-db.service';
import { FirebaseAdminService } from '../integrations/firebase/admin/firebase-admin.service';

describe('FixtureController', () => {
  let fixtureController: FixtureController;
  let fixturesCmsController: FixturesCmsController;
  let fixtureRepository: FixtureRepository;
  let cmsService: CmsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let notificationsService: NotificationsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let contestInstanceParticipants: ContestInstanceParticipantsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let cancelContestInstanceService: CancelContestInstanceService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FixtureController, FixturesCmsController],
      providers: [
        FixtureService,
        {
          provide: FixtureRepository,
          useFactory: () => ({
            getFixtures: () => ({}),
            getActiveFixtures: () => ({}),
            getFixtureById: () => ({}),
            updateFixture: () => ({}),
            getFixtureContestsByFixtureId: () => ({}),
            getFixtureCustomContestIds: () => ({}),
            getFixtureDetailsById: () => ({}),
            updateContestsOrder: () => ({}),
            getContests: () => ({}),
          }),
        },
        {
          provide: ContestService,
          useFactory: () => ({
            createContest: () => ({}),
          }),
        },
        { provide: ContestInstanceParticipantsService, useFactory: () => ({}) },
        {
          provide: ContestRepository,
          useFactory: () => ({}),
        },
        { provide: NotificationsService, useFactory: () => ({}) },
        {
          provide: ContestInstanceService,
          useFactory: () => ({
            createContestInstance: () => ({}),
          }),
        },
        { provide: CancelContestInstanceService, useFactory: () => ({}) },
        {
          provide: ContestInstanceRepository,
          useFactory: () => ({}),
        },
        {
          provide: JobQueueService,
          useFactory: () => ({}),
        },
        {
          provide: CmsService,
          useFactory: () => ({
            getRealMoneyState: () => ({}),
          }),
        },
        {
          provide: TransactionManager,
          useFactory: () => ({
            begin: () => ({
              knex: () => ({}),
              transaction: () => ({}),
              commit: () => ({}),
              rollback: () => ({}),
            }),
          }),
        },
        {
          provide: MarketsService,
          useFactory: () => ({}),
        },
        {
          provide: FirestoreService,
          useValue: {
            mergeUpdate: jest.fn(),
          },
        },
        MarketLinesService,
        BetsService,
        {
          provide: BetsRepository,
          useValue: {
            setBetsStatus: jest.fn(),
          },
        },
        {
          provide: FirebaseAdminService,
          useValue: {
            firebase: jest.fn(),
          },
        },
        RealtimeDbService,
      ],
    }).compile();

    fixtureController = app.get<FixtureController>(FixtureController);
    fixturesCmsController = app.get<FixturesCmsController>(
      FixturesCmsController,
    );
    fixtureRepository = app.get<FixtureRepository>(FixtureRepository);
    cmsService = app.get<CmsService>(CmsService);
  });

  describe('Init purchase', () => {
    const fixtures = [
      {
        id: '1-2-3-4',
        name: 'name',
        competition: 'competition',
        startTime: new Date(),
        state: 'in progress',
        currentPeriod: 'test period',
        active: true,
        fullcount: 1,
      },
    ];

    const requestParams = {
      page: 1,
      size: 10,
      orderBy: 'name',
      direction: 'DESC',
      statuses: [1, 2, 3],
      search: 'string',
    };

    describe(`Check response if fixtures exist`, () => {
      it('#1 success: returns fixtures: not empty array and parameter count > 0', async () => {
        jest
          .spyOn(fixtureRepository, 'getFixtures')
          .mockImplementation(async () => fixtures);

        const data = await fixturesCmsController.getFixtures(requestParams);
        expect(data).toHaveProperty('fixtures');
        expect(data).toHaveProperty('count');
        expect(data.count).toBeGreaterThan(0);
      });
    });

    describe(`Check response if fixtures not exist`, () => {
      it('#1 success: returns fixtures: empty array and parameter count = 0', async () => {
        jest
          .spyOn(fixtureRepository, 'getFixtures')
          .mockImplementation(async () => []);

        const data = await fixturesCmsController.getFixtures(requestParams);
        expect(data).toHaveProperty('fixtures');
        expect(data).toHaveProperty('count');
        expect(data.count).toEqual(0);
      });
    });

    describe(`Check response  current period if state: not in progress`, () => {
      it('#3 success: returns fixture with current period != "-" ', async () => {
        fixtures[0].state = 'not in progress';
        jest
          .spyOn(fixtureRepository, 'getFixtures')
          .mockImplementation(async () => fixtures);

        const data = await fixturesCmsController.getFixtures(requestParams);
        expect(data.fixtures[0].currentPeriod).toEqual('-');
      });
    });
  });
  describe('getActiveFixtures function', () => {
    const fixtures = [
      {
        fixtureId: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
        name: 'fixture',
        competitionId: 'a4cf795f-37d2-4eea-a5a0-2b5323978539',
        isLive: true,
        startTime: new Date(),
        currentPeriodId: '60',
        currentPeriodName: 'Ordinary Time',
        competitionName: 'NBA 2021/2022',
        sportIcon:
          'https://storage.googleapis.com/sp-dev-b1/sport-icons/basketball.svg',
        competitionIdCMS: '98',
      },
    ];
    const params = new GetActiveFixturesRequestDto();
    describe(`Check response if fixtures exist`, () => {
      it('#1 success: returns fixtures: not empty array', async () => {
        jest.spyOn(cmsService, 'getRealMoneyState').mockResolvedValue(false);

        jest
          .spyOn(fixtureRepository, 'getActiveFixtures')
          .mockImplementation(async () => fixtures);

        const data = await fixtureController.getActiveFixtures(params);
        expect(Array.isArray(data)).toBe(true);
        expect(fixtures).toStrictEqual(expect.arrayContaining(data));
      });
    });
    describe(`Check response if fixtures not exist`, () => {
      it('#1 success: returns fixtures: empty array and parameter count = 0', async () => {
        jest
          .spyOn(cmsService, 'getRealMoneyState')
          .mockImplementation(async () => false);
        jest
          .spyOn(fixtureRepository, 'getActiveFixtures')
          .mockImplementation(async () => []);

        const data = await fixtureController.getActiveFixtures(params);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBe(0);
      });
    });
  });
  describe('getFixture function', () => {
    const fixture = {
      id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
      name: 'Portland Trail Blazers vs New York Knicksssss',
      sportId: '5',
      startTime: new Date(),
      endTime: '2022-04-17 18:00:00.000',
      isLive: true,
      competitionId: '145083608899571712',
      competition: 'NFL',
      sport: 'Am. Football',
      display: true,
      delay: 5,
      marketSuspensionRules: MarketSuspensionRule.DO_NOT_SUSPEND,
      templateId: '54',
    };
    it('#1 success: returns fixture information', async () => {
      jest
        .spyOn(fixtureRepository, 'getFixtureById')
        .mockResolvedValue(fixture);

      const data = await fixturesCmsController.getFixture(fixture.id);
      expect(data.fixture).toEqual(fixture);
    });
  });
  describe('updateFixture function', () => {
    const fixture = {
      id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
      name: 'Portland Trail Blazers vs New York Knicksssss',
      sportId: '5',
      startTime: new Date(),
      endTime: '2022-04-17 18:00:00.000',
      isLive: true,
      competitionId: '145083608899571712',
      competition: 'NFL',
      sport: 'Am. Football',
      display: true,
      delay: 5,
      marketSuspensionRules: MarketSuspensionRule.DO_NOT_SUSPEND,
      templateId: '54',
    };
    const defaultContest = {
      id: '0a57462f-9be4-4af0-ade2-c69e7bfc6e19',
      templateId: '98',
      cmsContestTemplateId: 2,
      fixtureId: fixture.id,
      minParticipants: 10,
      maxParticipants: 30,
      leavingAllowed: true,
      entryCurrency: 'token',
      bankrollAmount: 1000,
      prizeAmount: '100',
      prizeType: 'tokens',
      createdAt: '2020-03-31T18:08.123Z',
      contestName: 'Default Contest',
      type: 'Default',
      entryFee: 10,
      periodId: '60',
      cancellationTime: 10,
      registrationStartTime: 0,
      registrationStartPeriodId: '',
      prizeWinnerShare: '[]',
      order: 2,
      isHidden: false,
    };
    const updateData = {
      id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
      name: 'New name',
      display: false,
    };
    it('#1 fail: returns Not found error id fixture doesnt exist', async () => {
      jest.spyOn(fixtureRepository, 'getFixtureById').mockResolvedValue(null);

      await expect(
        fixturesCmsController.updateFixture(fixture.id, {
          fixture: updateData,
          markets: [],
          contests: [],
          marketLines: [],
        }),
      ).rejects.toMatchObject(
        errorWithCode(ERRORS.FIXTURE_MANAGEMENT.FIXTURE_NOT_FOUND.code),
      );
    });
    it('#2 success: returns success', async () => {
      jest
        .spyOn(fixtureRepository, 'getFixtureById')
        .mockResolvedValue(fixture);
      jest.spyOn(fixtureRepository, 'updateFixture').mockResolvedValue(null);
      jest
        .spyOn(fixtureRepository, 'getContests')
        .mockResolvedValue([defaultContest]);

      const data = await fixturesCmsController.updateFixture(fixture.id, {
        fixture: updateData,
        markets: [],
        contests: [],
        marketLines: [],
      });
      expect(data.success).toEqual(true);
    });
    it('#3 success: return success with not empty contets', async () => {
      const contests = [
        { id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538', order: 2 },
        {
          id: 'a4cf795f-37d2-4eea-a5a0-2b5323978539',
          order: 3,
        },
      ];
      const updateContestOrder = jest.spyOn(
        fixtureRepository,
        'updateContestsOrder',
      );
      jest
        .spyOn(fixtureRepository, 'getContests')
        .mockResolvedValue([defaultContest]);
      const data = await fixturesCmsController.updateFixture(fixture.id, {
        fixture: updateData,
        markets: [],
        contests,
        marketLines: [],
      });
      expect(updateContestOrder).toHaveBeenCalledTimes(2);
      expect(data).toEqual({ success: true });
    });
  });

  describe('getFixtureContests function', () => {
    const fixtureContests = [
      {
        id: 'a1d5ea45-edbf-4409-a313-6ca223cf4718',
        contestName: 'NFL contest',
        type: 'Default',
        createdAt: '2022-03-31T07:51:49.983Z',
        period: 'Whole Match',
        instancesNumber: '3',
        fullcount: '2',
      },
      {
        id: 'a1d5ea45-edbf-4409-a313-6ca223cf4719',
        contestName: 'NFL contest v2',
        type: 'Default',
        createdAt: '2022-03-31T07:51:49.983Z',
        period: 'Whole Match',
        instancesNumber: '6',
        fullcount: '2',
      },
    ];
    it('#1 success: returns fixture contests list and count', async () => {
      jest
        .spyOn(fixtureRepository, 'getFixtureContestsByFixtureId')
        .mockResolvedValue(fixtureContests);

      const data = await fixturesCmsController.getFixtureContests(
        'a1d5ea45-edbf-4409-a313-6ca223cf4719',
        {
          page: 1,
          size: 10,
          direction: 'ASC',
          orderBy: 'contestName',
          search: '',
        },
      );
      expect(data.contests).toEqual(fixtureContests);
      expect(data.count).toEqual(2);
    });
  });

  describe('getFixtureCustomContestIds function', () => {
    const fixtureCustomContestIds = [14, 23];
    it('#1 success: returns fixture added custom contest ids', async () => {
      jest
        .spyOn(fixtureRepository, 'getFixtureCustomContestIds')
        .mockResolvedValue(fixtureCustomContestIds);

      const data = await fixturesCmsController.getFixtureCustomContestIds(
        'a1d5ea45-edbf-4409-a313-6ca223cf4719',
      );
      expect(data).toEqual(fixtureCustomContestIds);
    });
  });

  const errorWithCode = (errorCode: string) => ({
    response: { errorCodes: [errorCode] },
  });
});
