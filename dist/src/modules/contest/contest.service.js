"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ContestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestService = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("../integrations/cms/cms.service");
const fixture_service_1 = require("../fixture/fixture.service");
const date_fns_1 = require("date-fns");
const job_queue_service_1 = require("../ancillary/job-queue/job-queue.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const contest_repository_1 = require("./contest.repository");
const memoizedHierarchyChecker_1 = require("../../helpers/common/memoizedHierarchyChecker");
const dynamic_links_1 = require("../integrations/firebase/dynamic-links");
const tables_1 = require("../../interfaces/db/tables");
const transactions_interface_1 = require("../user-management/profile/balance/interfaces/transactions.interface");
const firestore_service_1 = require("../integrations/firebase/firestore/firestore.service");
const ramda_1 = require("ramda");
const errors_1 = require("../../helpers/errors");
const contestPrizeType_enum_1 = require("./enums/contestPrizeType.enum");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
const force_bets_service_1 = require("./force-bets/force-bets.service");
const config_1 = require("../../config");
const types_1 = require("../integrations/firebase/messages/notifications/types");
const contest_instance_participants_service_1 = require("../contest-instance/contest-instance-participants/contest-instance-participants.service");
const fixture_status_id_enum_1 = require("../fixture/enums/fixture-status-id.enum");
const enums_1 = require("../ancillary/job-queue/enums");
const markets_service_1 = require("../markets/markets.service");
const realtime_db_service_1 = require("../integrations/firebase/realtime-db/realtime-db.service");
const cmsContestTemplateContestType_1 = require("../../enums/cmsContestTemplateContestType");
const DEFAULT_CONTEST_TEMPLATE = 'Default';
let ContestService = ContestService_1 = class ContestService {
    constructor(cmsService, fixtureService, jobQueueService, contestInstanceService, contestRepository, firestoreService, firebaseDynamicLinksService, forceBetsService, transactionManager, contestInstanceParticipantsService, marketsService, realtimeDbService) {
        this.cmsService = cmsService;
        this.fixtureService = fixtureService;
        this.jobQueueService = jobQueueService;
        this.contestInstanceService = contestInstanceService;
        this.contestRepository = contestRepository;
        this.firestoreService = firestoreService;
        this.firebaseDynamicLinksService = firebaseDynamicLinksService;
        this.forceBetsService = forceBetsService;
        this.transactionManager = transactionManager;
        this.contestInstanceParticipantsService = contestInstanceParticipantsService;
        this.marketsService = marketsService;
        this.realtimeDbService = realtimeDbService;
        this.logger = new common_1.Logger(ContestService_1.name);
        this.checkIsInHierarchy = (0, memoizedHierarchyChecker_1.memoizedHierarchyChecker)();
        this.onChangeCurrentPeriodHandler = async (fixtureId) => {
            const fixture = await this.fixtureService.getFixtureDetails(fixtureId);
            if (!fixture) {
                throw new Error(`Fixture not found for ${fixtureId}`);
            }
            if (![fixture_status_id_enum_1.FixtureStatusId.PENDING, fixture_status_id_enum_1.FixtureStatusId.IN_PROGRESS].includes(fixture.statusId)) {
                throw new Error(`Wring status ${fixtureId} ${fixture.statusId}`);
            }
            const contestTemplates = await this.cmsService.getContestTemplates(fixture.templateId, DEFAULT_CONTEST_TEMPLATE);
            for (const { contestTemplate, originalData } of contestTemplates) {
                await this.createContestWithStartPeriod(contestTemplate, originalData, fixture);
                if (Array.isArray(contestTemplate.forceBets) &&
                    contestTemplate.forceBets.length > 0) {
                    contestTemplate.forceBets.forEach((forceBet) => {
                        if (forceBet.startPeriod.periodId === fixture.currentPeriodId) {
                            const forceBetStartTimestamp = (0, date_fns_1.addMinutes)(new Date(), forceBet.delayMin);
                            this.jobQueueService.addToQueue(forceBetStartTimestamp.toISOString(), enums_1.QueueName.FORCE_BET_START, {
                                action: enums_1.ActionName.FORCE_BET_START,
                                meta: {
                                    fixtureId,
                                    contestTemplateId: contestTemplate.id,
                                    forceBetId: forceBet.id,
                                    forceBetDelay: forceBet.delayMin,
                                    forceBetPeriodId: forceBet.startPeriod.periodId,
                                },
                            });
                        }
                    });
                }
            }
        };
        this.jobHandler = async (job) => {
            const { fixtureId, contestTemplateData, originalData } = job.data.meta;
            const fixture = await this.fixtureService.getFixtureDetails(fixtureId);
            try {
                await this.createContestWithInstance(contestTemplateData, originalData, fixture);
                return job.done(null);
            }
            catch (err) {
                console.error(err);
                return job.done(err);
            }
        };
        this.createForceBetForContest = async (txManager, fixtureId, forceBetPeriodId, contestTemplateId, forceBet, contest) => {
            const forceBets = await this.forceBetsService.getForceBets(null, {
                contestId: contest.id,
                isActive: true,
            });
            if (Array.isArray(forceBets) && forceBets.length > 0) {
                this.logger.debug(`Force bet is already running for contest ${contest.id}`, new Error().stack);
                return;
            }
            const markets = await this.contestRepository.getMarketsForMarketTypes(txManager, {
                fixtureId: fixtureId,
                isClosed: false,
            }, forceBet.marketTypes.map((mt) => mt.typeId));
            let activeMarkets = await Promise.all(markets.map(async (market) => {
                const isActive = await this.marketsService.isActiveMarket(txManager, market, {
                    cmsContestTemplateId: contestTemplateId,
                });
                return isActive ? market.id : null;
            }));
            activeMarkets = activeMarkets.filter(Boolean);
            if (Array.isArray(activeMarkets) && activeMarkets.length > 0) {
                const lockOdds = await this.resolveLockedOdds(forceBet, activeMarkets);
                const [newForceBet] = await this.forceBetsService.addForceBet(txManager, forceBet, contest.id, lockOdds, contestTemplateId);
                await this.firestoreService.set(`contests/${contest.id}/forceBets`, `${newForceBet.id}`, {
                    markets: activeMarkets,
                    startTime: newForceBet.createdAt,
                    endTime: (0, date_fns_1.addMinutes)(newForceBet.createdAt, newForceBet.durationMin),
                    durationMin: newForceBet.durationMin,
                    isActive: true,
                    betLimit: newForceBet.betLimit,
                    title: newForceBet.title,
                    info: newForceBet.info,
                    notifyInSec: newForceBet.notifyInSec,
                    lockOdds,
                });
                const forceBetStopTimestamp = (0, date_fns_1.addMinutes)(newForceBet.createdAt, newForceBet.durationMin);
                await this.jobQueueService.addToQueue(forceBetStopTimestamp.toISOString(), enums_1.QueueName.FORCE_BET_STOP, {
                    action: enums_1.ActionName.FORCE_BET_STOP,
                    meta: {
                        forceBetId: newForceBet.id,
                        contestId: contest.id,
                    },
                });
                await this.contestInstanceParticipantsService.notifyUsersContestForceBetStart(contest, types_1.NotificationEnumType.FREE_BET_START);
            }
        };
        this.forceBetJobHandler = async (job) => {
            const { fixtureId, contestTemplateId, forceBetId, forceBetPeriodId, forceBetDelay, } = job.data.meta;
            const txManager = await this.transactionManager.begin();
            try {
                const { contestTemplate } = await this.cmsService.getContestTemplateByCmsId(contestTemplateId);
                const forceBet = contestTemplate.forceBets.find((fb) => fb.id === forceBetId);
                if (forceBet) {
                    if (forceBet.startPeriod.periodId !== forceBetPeriodId.toString()) {
                        return;
                    }
                    if (forceBet.delayMin !== forceBetDelay) {
                        const diff = forceBet.delayMin - forceBetDelay;
                        if (Number.isFinite(diff) && diff > 0) {
                            const forceBetStartTimestamp = (0, date_fns_1.addMinutes)(new Date(), forceBet.delayMin);
                            await this.jobQueueService.addToQueue(forceBetStartTimestamp.toISOString(), enums_1.QueueName.FORCE_BET_START, {
                                action: enums_1.ActionName.FORCE_BET_START,
                                meta: {
                                    fixtureId,
                                    contestTemplateId,
                                    forceBetId: forceBet.id,
                                    forceBetDelay: forceBet.delayMin,
                                    forceBetPeriodId: parseInt(forceBet.startPeriod.periodId),
                                },
                            });
                            return;
                        }
                    }
                    const contests = await this.contestRepository.getContests(txManager, {
                        cmsContestTemplateId: contestTemplateId,
                        fixtureId,
                    });
                    if (Array.isArray(contests) && contests.length > 0) {
                        await Promise.all(contests.map(async (contest) => {
                            return this.createForceBetForContest(txManager, fixtureId, forceBetPeriodId, contestTemplateId, forceBet, contest);
                        }));
                    }
                }
                await txManager.commit();
                return job.done();
            }
            catch (err) {
                console.error(err);
                await txManager.rollback();
                return job.done(err);
            }
        };
        this.forceBetStopJobHandler = async (job) => {
            try {
                const { contestId, forceBetId } = job.data.meta;
                await this.forceBetsService.stopForceBet(null, forceBetId);
                await this.firestoreService.mergeUpdate(`contests/${contestId}/forceBets`, `${forceBetId}`, {
                    isActive: false,
                });
            }
            catch (err) {
                console.error(err);
            }
        };
        this.jobQueueService.init(enums_1.QueueName.CONTEST_CREATE, this.jobHandler);
        this.jobQueueService.init(enums_1.QueueName.FORCE_BET_START, this.forceBetJobHandler);
        this.jobQueueService.init(enums_1.QueueName.FORCE_BET_STOP, this.forceBetStopJobHandler);
    }
    async onContestTemplateChange(contestTemplateId) {
        try {
            const activeJobs = await this.jobQueueService.getJobsByMetadata(enums_1.QueueName.CONTEST_CREATE, 'created', {
                contestTemplateId,
            });
            await Promise.all(activeJobs.map(({ id }) => this.jobQueueService.cancelJob(id)));
            const { contestTemplate, originalData } = await this.cmsService.getContestTemplateById(contestTemplateId, DEFAULT_CONTEST_TEMPLATE);
            const competitions = contestTemplate.competitionAndPeriod.competitions.map(({ competitionId }) => competitionId);
            const fixtures = await this.fixtureService.getFixturesByTemplateIdsWithFilterByStatus(competitions, fixture_status_id_enum_1.FixtureStatusId.PENDING);
            const filteredFixtures = await fixtures.reduce(async (prev, fixture) => {
                const result = await prev;
                const { fixtureId } = fixture;
                const fixtureContests = await this.contestRepository.getContestsByFixtureId(fixtureId);
                if ((fixtureContests === null || fixtureContests === void 0 ? void 0 : fixtureContests.contestCount) &&
                    (fixtureContests === null || fixtureContests === void 0 ? void 0 : fixtureContests.overedContests)) {
                    if ((fixtureContests === null || fixtureContests === void 0 ? void 0 : fixtureContests.contestCount) !== (fixtureContests === null || fixtureContests === void 0 ? void 0 : fixtureContests.overedContests)) {
                        result.push(fixture);
                    }
                }
                else {
                    result.push(fixture);
                }
                return result;
            }, Promise.resolve([]));
            for (const fixture of filteredFixtures) {
                await this.createContestWithStartTime(contestTemplate, originalData, fixture);
            }
        }
        catch (error) {
            this.logger.error(`onContestTemplateChange: ${error.message}`);
        }
    }
    async createContestWithStartTime(contestTemplate, data, fixture) {
        const { registrationStartTime } = contestTemplate.registrationTime;
        if (Number.isFinite(registrationStartTime) && registrationStartTime !== 0) {
            const fixtureStartTime = fixture.startTime;
            const creationDate = (0, date_fns_1.subMinutes)(fixtureStartTime, registrationStartTime);
            await this.jobQueueService.addToQueue(creationDate.toISOString(), enums_1.QueueName.CONTEST_CREATE, {
                action: enums_1.ActionName.CONTEST_CREATE,
                meta: {
                    fixtureId: fixture.fixtureId,
                    contestTemplateId: contestTemplate.id,
                    contestTemplateData: contestTemplate,
                    originalData: data,
                },
            });
        }
    }
    async instanceCreation(contestTemplate, contest) {
        if (contestTemplate.registrationTime.lateEntryPeriodId) {
            const periods = await this.fixtureService.getAllFixturePeriods();
            const isPeriodInHierarchy = this.checkIsInHierarchy(String(contestTemplate.competitionAndPeriod.period.periodId), contestTemplate.registrationTime.lateEntryPeriodId, periods);
            return isPeriodInHierarchy
                ? this.contestInstanceService.createContestInstance(null, contest, contestTemplate.registrationTime.lateEntryPeriodId)
                : this.contestInstanceService.createContestInstance(null, contest);
        }
        return this.contestInstanceService.createContestInstance(null, contest);
    }
    async createContestWithInstance(contestTemplate, data, fixture) {
        const contest = await this.createContest(contestTemplate, fixture.templateId, fixture.fixtureId, fixture.fixtureName, fixture.sportId, data);
        const instance = await this.instanceCreation(contestTemplate, contest);
        if ((contestTemplate === null || contestTemplate === void 0 ? void 0 : contestTemplate.contestType) !== 'Personal') {
            return { contest, instance };
        }
        const user = await this.contestInstanceParticipantsService.getUserByPromoCode(contestTemplate.contestOwner);
        await this.contestInstanceService.registerParticipantToContestInstance(user, instance.id);
        return { contest, instance };
    }
    async onCompleteHandler(fixtureId) {
        try {
            const fixture = await this.fixtureService.getFixtureDetails(fixtureId);
            this.logger.debug(`onCompleteHandler: point_1 ${JSON.stringify(fixture)}`);
            if (!fixture) {
                this.logger.error(`onCompleteHandler: Fixture not found for ${fixtureId}`);
                return;
            }
            if (![fixture_status_id_enum_1.FixtureStatusId.PENDING, fixture_status_id_enum_1.FixtureStatusId.IN_PROGRESS].includes(fixture.statusId)) {
                throw new Error(`Wring status ${fixtureId} ${fixture.statusId}`);
            }
            const contestTemplates = await this.cmsService.getContestTemplates(fixture.templateId, DEFAULT_CONTEST_TEMPLATE);
            await Promise.allSettled(contestTemplates.map(({ contestTemplate, originalData }) => this.createContestWithStartTime(contestTemplate, originalData, fixture)));
        }
        catch (err) {
            console.error(err);
        }
    }
    async createContestWithStartPeriod(contestTemplate, data, fixture) {
        const { registrationStartPeriod } = contestTemplate.registrationTime;
        if ((registrationStartPeriod === null || registrationStartPeriod === void 0 ? void 0 : registrationStartPeriod.periodId) &&
            registrationStartPeriod.periodId === fixture.currentPeriodId) {
            await this.createContestWithInstance(contestTemplate, data, fixture);
        }
    }
    getEntryFee(cmsContestTemplate) {
        if (cmsContestTemplate.productType === 'Tokens') {
            if (cmsContestTemplate.entryRules.freeEntry) {
                return 0;
            }
            else {
                return cmsContestTemplate.entryRules.tokensAmount;
            }
        }
        if (cmsContestTemplate.productType === 'Real_money') {
            return cmsContestTemplate.RMEntryRules.amount;
        }
        throw new Error(`Could not derive entry fee for cmsContestTemplate ${cmsContestTemplate.id}`);
    }
    getPrize(cmsContestTemplate) {
        const contestPrize = cmsContestTemplate.prizes[0];
        const prizeType = (() => {
            if (contestPrize.component === 'prizes.prize-tangible') {
                return contestPrizeType_enum_1.ContestPrizeType.TANGIBLE;
            }
            if (contestPrize.component === 'prizes.prize-tokens') {
                return contestPrizeType_enum_1.ContestPrizeType.TOKENS;
            }
            return contestPrizeType_enum_1.ContestPrizeType.REAL_MONEY;
        })();
        const prizeAmount = contestPrize.shortDescription || contestPrize.amount.toString();
        const prizeWinnerShare = JSON.stringify(contestPrize.winnerShare || []);
        return {
            prizeType,
            prizeAmount,
            prizeWinnerShare,
        };
    }
    async disableLockOddsForForceBets(params) {
        const txManager = await this.transactionManager.begin();
        try {
            await Promise.all(params.lockOdds.map(async (lo) => {
                const query = {};
                if (lo.contestTemplate) {
                    query.cmsContestTemplateId = lo.contestTemplate;
                }
                if (lo.fixtureId) {
                    query.fixtureId = lo.fixtureId;
                }
                const contests = await this.contestRepository.getContests(txManager, query);
                const forceBets = await this.forceBetsService.lockOddsUpdateOnActiveForceBets(txManager, contests.map((c) => c.id));
                Promise.allSettled(forceBets.map(async (fb) => {
                    await this.firestoreService.mergeUpdate(`contests/${fb.contestId}/forceBets`, `${fb.id}`, {
                        lockOdds: null,
                    });
                }));
            }));
            await txManager.commit();
        }
        catch (err) {
            this.logger.error(err.stack || err);
            await txManager.rollback();
        }
    }
    async createContest(cmsContestTemplate, templateId, fixtureId, fixtureName, sportId, originalData) {
        var _a, _b, _c, _d;
        const entryFee = this.getEntryFee(cmsContestTemplate);
        const balanceLong = await this.cmsService.getBalanceLongState(false);
        const max = await this.contestRepository.checkMaxOrderByFixture(fixtureId);
        const currentOrder = max ? max + 1 : 1;
        const marketTypes = await this.cmsService.getMarketTypesByMarketGroupId(cmsContestTemplate.marketGroupId);
        const { prizeType, prizeAmount, prizeWinnerShare } = this.getPrize(cmsContestTemplate);
        const contest = {
            bankrollAmount: cmsContestTemplate.bankrollAmount,
            entryCurrency: cmsContestTemplate.productType === 'Tokens'
                ? transactions_interface_1.TRANSACTION_CURRENCY_TYPE.TOKEN
                : transactions_interface_1.TRANSACTION_CURRENCY_TYPE.REAL_MONEY,
            leavingAllowed: cmsContestTemplate.contestSize.allowsLeaving,
            maxParticipants: cmsContestTemplate.contestSize.maxParticipantsNumber || null,
            minParticipants: cmsContestTemplate.contestSize.minParticipantsNumber,
            prizeAmount,
            prizeType,
            prizeWinnerShare,
            templateId: templateId,
            cmsContestTemplateId: cmsContestTemplate.id,
            fixtureId,
            contestName: cmsContestTemplate.contestName,
            type: cmsContestTemplate.contestType,
            entryFee,
            periodId: cmsContestTemplate.competitionAndPeriod.period.periodId,
            cancellationTime: (_a = cmsContestTemplate.registrationTime) === null || _a === void 0 ? void 0 : _a.cancellationTime,
            registrationStartPeriodId: (_c = (_b = cmsContestTemplate.registrationTime) === null || _b === void 0 ? void 0 : _b.registrationStartPeriod) === null || _c === void 0 ? void 0 : _c.periodId,
            registrationStartTime: (_d = cmsContestTemplate.registrationTime) === null || _d === void 0 ? void 0 : _d.registrationStartTime,
            balanceLong,
            order: currentOrder,
            contestOwnerPromoCode: cmsContestTemplate.contestOwner,
            cmsHomeVisible: cmsContestTemplate.homeVisible,
            streamLive: cmsContestTemplate.contestType ===
                cmsContestTemplateContestType_1.CmsContestTemplateContestType.PERSONAL || null,
        };
        const createdContest = await this.contestRepository.createContest(contest);
        const dataToFirestore = Object.assign(Object.assign({}, (0, ramda_1.pick)([
            'minParticipants',
            'maxParticipants',
            'leavingAllowed',
            'entryCurrency',
            'entryFee',
            'prizeAmount',
            'templateId',
            'cmsContestTemplateId',
            'balanceLong',
            'fixtureId',
            'streamLive',
        ], createdContest)), { cmsContestTemplate: JSON.parse(JSON.stringify(originalData)), fixtureName, marketTypes: JSON.parse(JSON.stringify(marketTypes)), sportId });
        try {
            await this.firestoreService.set('contests', `${createdContest.id}`, dataToFirestore);
        }
        catch (err) {
            console.error(new errors_1.InternalError(errors_1.ERRORS.INTERNAL_SYSTEM_MSG.FIRESTORE_INTEGRATION_ERROR, err.message));
        }
        return createdContest;
    }
    async resolveLockedOdds(forceBet, activeMarkets) {
        let lockOdds = null;
        if (forceBet.lockOdds === true) {
            const marketLines = await this.marketsService.getMarketLineIdsForMarkets(activeMarkets);
            lockOdds = (await Promise.allSettled(marketLines.map(async (ml) => {
                const marketLinePricePath = `market-line-prices/${ml.priceId}`;
                return {
                    id: ml.marketLineId,
                    odds: await this.realtimeDbService.get(marketLinePricePath),
                };
            })))
                .filter((result) => result.status === 'fulfilled')
                .map((result) => result.value);
            lockOdds = lockOdds.reduce((acc, lo) => {
                acc[lo.id] = lo.odds;
                return acc;
            }, {});
        }
        return lockOdds;
    }
    async createCustomForceBetForContest(txManager, fixtureId, freeBetOpts, contest) {
        const forceBets = await this.forceBetsService.getForceBets(null, {
            contestId: contest.id,
            isActive: true,
        });
        if (Array.isArray(forceBets) && forceBets.length > 0) {
            this.logger.debug(`Force bet is already running for contest ${contest.id}`, new Error().stack);
            return;
        }
        const marketTypes = await this.contestRepository.getTypesForMarkets(txManager, freeBetOpts.markets);
        const markets = await this.contestRepository.getMarketsByIds(txManager, {
            fixtureId: fixtureId,
            isClosed: false,
        }, freeBetOpts.markets);
        let activeMarkets = await Promise.all(markets.map(async (market) => {
            const isActive = await this.marketsService.isActiveMarketForCustomFreeBet(txManager, market);
            return isActive ? market.id : null;
        }));
        activeMarkets = activeMarkets.filter(Boolean);
        if (Array.isArray(activeMarkets) && activeMarkets.length > 0) {
            const lockOdds = await this.resolveLockedOdds(freeBetOpts, activeMarkets);
            const [newForceBet] = await this.forceBetsService.addCustomForceBet(txManager, freeBetOpts, marketTypes, contest.id, lockOdds);
            await this.firestoreService.set(`contests/${contest.id}/forceBets`, `${newForceBet.id}`, {
                markets: activeMarkets,
                startTime: newForceBet.createdAt,
                endTime: (0, date_fns_1.addMinutes)(newForceBet.createdAt, newForceBet.durationMin),
                durationMin: newForceBet.durationMin,
                isActive: true,
                betLimit: newForceBet.betLimit,
                title: newForceBet.title,
                info: newForceBet.info,
                notifyInSec: newForceBet.notifyInSec,
                lockOdds,
            });
            const forceBetStopTimestamp = (0, date_fns_1.addMinutes)(newForceBet.createdAt, newForceBet.durationMin);
            await this.jobQueueService.addToQueue(forceBetStopTimestamp.toISOString(), enums_1.QueueName.FORCE_BET_STOP, {
                action: enums_1.ActionName.FORCE_BET_STOP,
                meta: {
                    forceBetId: newForceBet.id,
                    contestId: contest.id,
                },
            });
            await this.contestInstanceParticipantsService.notifyUsersContestForceBetStart(contest, types_1.NotificationEnumType.FREE_BET_START);
        }
    }
    async runCustomFreeBet(fixtureId, freeBetOpts) {
        const txManager = await this.transactionManager.begin();
        try {
            const contests = await this.contestRepository.getContests(txManager, {
                fixtureId,
            });
            if (Array.isArray(contests) && contests.length > 0) {
                await Promise.all(contests.map(async (contest) => {
                    return this.createCustomForceBetForContest(txManager, fixtureId, freeBetOpts, contest);
                }));
            }
            await txManager.commit();
        }
        catch (err) {
            console.error(err);
            await txManager.rollback();
        }
    }
    async getContest(txManager, contestId) {
        return this.contestRepository.getContest(txManager, contestId);
    }
    async getContestIdsWithNoActiveMarkets(contestIds) {
        const emptyContests = await this.contestRepository.getContestsWithNoActiveMarketsFromList(contestIds);
        return emptyContests;
    }
    async getContestInstancesByContestId(contestId, { page, size }) {
        const contestInstances = await this.contestRepository.getContestInstancesByContestId(contestId, {
            page,
            size,
        });
        return contestInstances;
    }
    async hideContest(contestId) {
        await this.contestRepository.hideContest(contestId);
    }
    getLinkInfo(contestId) {
        return this.contestRepository.getLinkInfo(contestId);
    }
    async getDynamicLink(contestId) {
        const { LINK_PREFIX } = config_1.default;
        const { ANDROID_PACKAGE_NAME, DOMAIN_URI_PREFIX, IOS_BUNDLE_ID, IOS_APP_STORE_ID, } = config_1.default.FIREBASE.DYNAMIC_LINKS;
        const { contestOwnerPromoCode, instanceId } = await this.getLinkInfo(contestId);
        if (!contestOwnerPromoCode) {
            return {
                success: Boolean(contestOwnerPromoCode),
                link: Boolean(contestOwnerPromoCode),
            };
        }
        this.logger.debug(`contestOwnerLink:${contestOwnerPromoCode}, instanceId:${instanceId}`);
        const link = `${LINK_PREFIX}contest/details/${contestId}/${instanceId}?contestOwnerResourceLink=${contestOwnerPromoCode}`;
        const { shortLink } = await this.firebaseDynamicLinksService.createLink({
            dynamicLinkInfo: {
                domainUriPrefix: DOMAIN_URI_PREFIX,
                link,
                androidInfo: {
                    androidPackageName: ANDROID_PACKAGE_NAME,
                },
                iosInfo: {
                    iosBundleId: IOS_BUNDLE_ID,
                    iosAppStoreId: IOS_APP_STORE_ID,
                },
            },
        });
        this.logger.debug(`loggingLink:${shortLink}`);
        return { success: true, link: shortLink };
    }
};
ContestService = ContestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => fixture_service_1.FixtureService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => contest_instance_service_1.ContestInstanceService))),
    __param(6, (0, dynamic_links_1.InjectFirebaseDynamicLinks)()),
    __metadata("design:paramtypes", [cms_service_1.CmsService,
        fixture_service_1.FixtureService,
        job_queue_service_1.JobQueueService,
        contest_instance_service_1.ContestInstanceService,
        contest_repository_1.ContestRepository,
        firestore_service_1.FirestoreService,
        dynamic_links_1.FirebaseDynamicLinksService,
        force_bets_service_1.ForceBetsService,
        transaction_manager_service_1.TransactionManager,
        contest_instance_participants_service_1.ContestInstanceParticipantsService,
        markets_service_1.MarketsService,
        realtime_db_service_1.RealtimeDbService])
], ContestService);
exports.ContestService = ContestService;
//# sourceMappingURL=contest.service.js.map