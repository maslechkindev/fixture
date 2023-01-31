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
var FixtureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const fixture_repository_1 = require("./fixture.repository");
const getActiveFixtures_dto_1 = require("./dto/getActiveFixtures.dto");
const tables_1 = require("../../interfaces/db/tables");
const errors_1 = require("../../helpers/errors");
const fixture_status_id_enum_1 = require("./enums/fixture-status-id.enum");
const operationType_enum_1 = require("./enums/operationType.enum");
const cms_service_1 = require("../integrations/cms/cms.service");
const ramda_1 = require("ramda");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
const contest_service_1 = require("../contest/contest.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const contestInstanceStatus_enum_1 = require("../contest-instance/enums/contestInstanceStatus.enum");
const cancel_service_1 = require("../contest-instance/cancel/cancel.service");
const markets_service_1 = require("../markets/markets.service");
const firestore_service_1 = require("../integrations/firebase/firestore/firestore.service");
const memoizedHierarchyChecker_1 = require("../../helpers/common/memoizedHierarchyChecker");
const market_lines_service_1 = require("../market-lines/market-lines.service");
const firebase_admin_1 = require("firebase-admin");
let FixtureService = FixtureService_1 = class FixtureService {
    constructor(fixtureRepository, cmsService, transactionManager, contestService, contestInstanceService, cancelContestInstanceService, marketsService, firestoreService, marketsLinesService) {
        this.fixtureRepository = fixtureRepository;
        this.cmsService = cmsService;
        this.transactionManager = transactionManager;
        this.contestService = contestService;
        this.contestInstanceService = contestInstanceService;
        this.cancelContestInstanceService = cancelContestInstanceService;
        this.marketsService = marketsService;
        this.firestoreService = firestoreService;
        this.marketsLinesService = marketsLinesService;
        this.logger = new common_1.Logger(FixtureService_1.name);
        this.memoizedHierarchyChecker = () => {
            const cache = {};
            return (main, secondary, periods) => {
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
                    const parentPeriod = periods.find((p) => p.periodId === period.parentId);
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
        this.checkIsInHierarchy = (0, memoizedHierarchyChecker_1.memoizedHierarchyChecker)();
    }
    async getFixtureDetails(fixtureId) {
        return this.fixtureRepository.getFixtureDetails(fixtureId);
    }
    async getFixturesByTemplateIdsWithFilterByStatus(templateIds, fixtureStatusId) {
        return this.fixtureRepository.getFixturesByTemplateIdsWithFilterByStatus(templateIds, fixtureStatusId);
    }
    getFixtureDetailsById(id) {
        return this.fixtureRepository.getFixtureDetailsById(id);
    }
    async getAll(params) {
        const fullFixtures = await this.fixtureRepository.getFixtures(params);
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
    async getActive(params) {
        const realMoneyState = await this.cmsService.getRealMoneyState();
        return this.fixtureRepository.getActiveFixtures(Object.assign(Object.assign({}, params), { realMoneyState }));
    }
    getFixtureById(id) {
        return this.fixtureRepository.getFixtureById(id);
    }
    async updateFixture(data, fixture) {
        const intersectObj = (a, b) => R.pickBy((val, key) => !R.equals(JSON.stringify(val), JSON.stringify(a[key])), b);
        const changedFields = intersectObj(fixture, data);
        if ((0, ramda_1.isEmpty)(changedFields)) {
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
            }
            catch (err) {
                await txManager.rollback();
                throw err;
            }
        }
        return this.fixtureRepository.updateFixture(data.id, changedFields);
    }
    async updateFixtureMarkets(fixture, markets) {
        const txManager = await this.transactionManager.begin();
        try {
            await this.fixtureRepository.updateFixtureMarkets(txManager, fixture.id, markets);
            const contests = await this.fixtureRepository.getContests(txManager, {
                fixtureId: fixture.fixtureId,
            });
            const syncMarkets = await this.marketsService.getMarketsByIds(txManager, markets.map((m) => m.id));
            const mappedSyncMarkets = Array.isArray(syncMarkets)
                ? syncMarkets.reduce((acc, m) => {
                    acc[m.id] = m;
                    return acc;
                }, {})
                : {};
            let syncedMarkets = await Promise.all(markets.map(async (m) => {
                if (!mappedSyncMarkets[m.id]) {
                    return null;
                }
                const result = R.merge(mappedSyncMarkets[m.id], m);
                result.isActive = await this.marketsService.isActiveMarket(txManager, {
                    typeId: result.typeId,
                    marketId: result.marketId,
                    isClosed: result.isClosed,
                    toggle: result.toggle,
                    fixturePeriodId: result.fixturePeriodId,
                }, { checkToggle: true });
                return result;
            }));
            syncedMarkets = syncedMarkets.filter((m) => m !== null);
            Promise.allSettled(contests.map(async (contest) => {
                return Promise.allSettled(syncedMarkets.map(async (market) => {
                    try {
                        if (market.toggle !== true) {
                            await this.fixtureRepository.deleteActiveMarket(market.marketId, contest.id);
                            return this.firestoreService.delete(`/contests/${contest.id}/markets`, market.marketId);
                        }
                        if (market.isActive === true) {
                            await this.fixtureRepository.setActiveMarket(market.marketId, contest.id);
                            return this.firestoreService.mergeUpdate(`/contests/${contest.id}/markets`, market.marketId, market);
                        }
                    }
                    catch (err) {
                        this.logger.error(err.message, err.stack);
                    }
                }));
            }));
            await txManager.commit();
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
    async updateContests(contests) {
        await Promise.all(contests.map((contest) => this.fixtureRepository.updateContestsOrder(contest.id, contest.order)));
    }
    async updateMarketLines(marketLines) {
        return Promise.all(marketLines.map(async (ml) => {
            await this.fixtureRepository.updateMarketLineStatusManual(ml.marketLineId, ml.status);
            await this.marketsLinesService.onMarketLineChangeStatus(ml.marketLineId, ml.status);
        }));
    }
    async getFixtureContestsByFixtureId(id, params) {
        const contests = await this.fixtureRepository.getFixtureContestsByFixtureId(id, params);
        return {
            contests,
            count: contests.length ? +contests[0].fullcount : 0,
        };
    }
    async getActiveFixtureMarketsByFixtureId(id, params) {
        const cmsInfo = await this.fixtureRepository.getCmsMarketsForFixtureContestFreeBets(id);
        const markets = await this.fixtureRepository.getFixtureMarketsByFixtureId(id, params);
        return {
            markets: markets,
            cmsInfo: cmsInfo === null || cmsInfo === void 0 ? void 0 : cmsInfo.cmsInfo,
            count: markets.length ? Number(markets[0].fullcount) : 0,
        };
    }
    async getMarketLinesForMarket(marketId, fixtureId) {
        return this.fixtureRepository.getMarketLinesForMarket(marketId, fixtureId);
    }
    async getExpiredFixtureContestIds(fixtureId) {
        const expiredFixtureContests = [];
        const allFixtureContests = await this.fixtureRepository.getAllFixtureContests(fixtureId);
        const { fixtureStatusId, fixtureCurrentPeriodId } = await this.fixtureRepository.getFixtureStatusIdAndCurrentPeriodId(fixtureId);
        if (this.isFixtureEnded({ fixtureStatusId })) {
            expiredFixtureContests.push(...allFixtureContests);
        }
        else {
            const periods = await this.getAllFixturePeriods();
            const outOfFixtureCurrentPeriodContests = allFixtureContests.filter(({ periodId }) => {
                const isFixtureCurrentPeriodInContestPeriodHierarchy = this.checkIsInHierarchy(periodId, fixtureCurrentPeriodId, periods);
                return !isFixtureCurrentPeriodInContestPeriodHierarchy;
            });
            expiredFixtureContests.push(...outOfFixtureCurrentPeriodContests);
        }
        return expiredFixtureContests.map(({ id }) => id);
    }
    async haveFixtureEnded(fixtureId) {
        const { fixtureStatusId } = await this.fixtureRepository.getFixtureStatusIdAndCurrentPeriodId(fixtureId);
        return this.isFixtureEnded({ fixtureStatusId });
    }
    isFixtureEnded({ fixtureStatusId, }) {
        const endedStatuses = [
            fixture_status_id_enum_1.FixtureStatusId.ENDED,
            fixture_status_id_enum_1.FixtureStatusId.CANCELED,
            fixture_status_id_enum_1.FixtureStatusId.WALKOVER,
            fixture_status_id_enum_1.FixtureStatusId.ABANDONED,
            fixture_status_id_enum_1.FixtureStatusId.RETIRED,
        ];
        return endedStatuses.includes(fixtureStatusId);
    }
    async getAllFixturePeriods() {
        return this.fixtureRepository.getAllFixturePeriods();
    }
    parseContestTemplateIds(ids) {
        try {
            const parsedData = JSON.parse(ids);
            return parsedData;
        }
        catch (e) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FIXTURE_MANAGEMENT.INVALID_CONTEST_TEMPLATE_IDS_PASSED);
        }
    }
    getFixtureCustomContestIds(id) {
        return this.fixtureRepository.getFixtureCustomContestIds(id);
    }
    async countFixtureContests(fixtureId) {
        const [{ count }] = await this.fixtureRepository.countFixtureContests(fixtureId);
        return count;
    }
    async getFixtureContestById(fixtureId, contestId) {
        const contest = await this.fixtureRepository.getFixtureContestById(fixtureId, contestId);
        return contest;
    }
    async updateFixtureContestById(contestId, updateData) {
        await this.fixtureRepository.updateFixtureContestById(contestId, updateData);
        if (updateData.contestName) {
            const contestInstancesId = await this.contestInstanceService.getInstancesByContestId(contestId);
            await this.fixtureRepository.updateContestInstancesByContestId(contestId, {
                instanceName: updateData.contestName,
            });
            await this.firestoreService.update('/contests', contestId, R.pick(['contestName'], updateData));
            await Promise.all(contestInstancesId.map(async ({ id }) => {
                await this.firestoreService.update(`/contests/${contestId}/instances`, id, { instanceName: updateData.contestName });
            }));
        }
        await this.firestoreService.update('/contests', contestId, {
            contestOwnerResourceLink: updateData.contestOwnerResourceLink || firebase_admin_1.firestore.FieldValue.delete(),
            contestOwnerLabelName: updateData.contestOwnerLabelName || firebase_admin_1.firestore.FieldValue.delete(),
            streamLive: updateData.streamLive,
        });
        const collection = `/contests/${contestId}/instances`;
        const instanceIds = await this.firestoreService.getCollectionIds(collection);
        await Promise.all(instanceIds.map(async (instanceId) => {
            await this.firestoreService.mergeUpdate(collection, instanceId, {
                instanceName: String(updateData.contestName),
            });
        }));
    }
    templateComparer(params) {
        if (params.instanceStatus === contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS) {
            return `Get ${params.place} prize  in the ${params.contestName}`;
        }
        if (params.instanceStatus === contestInstanceStatus_enum_1.ContestInstanceStatus.REG_OPEN ||
            params.instanceStatus === contestInstanceStatus_enum_1.ContestInstanceStatus.IN_QUEUE) {
            return `Refund of entry fee to ${params.fixtureName} - ${params.contestName}' if contest not free`;
        }
    }
    async performAction(operationType, fixtureId) {
        const instances = await this.fixtureRepository.getActiveContestInstancesByFixtureId(fixtureId);
        const transactionNameTemplateGenerator = (operationType, fixtureName) => {
            if (operationType === operationType_enum_1.operationTypes.FINISH) {
                return (params) => this.templateComparer(params);
            }
            return (params) => `Refund of entry fee to ${fixtureName} - ${params.contestName}`;
        };
        const resolveAction = {
            finish: async () => {
                try {
                    await Promise.allSettled(instances.map((instance) => {
                        const templateGenerator = transactionNameTemplateGenerator(operationType, instance.fixtureName);
                        if (instance.status === contestInstanceStatus_enum_1.ContestInstanceStatus.IN_PROGRESS) {
                            return this.contestInstanceService.finishContestInstance(instance.id, instance.contestId, instance.contestName, instance.status, templateGenerator);
                        }
                        else {
                            return this.cancelContestInstanceService.cancelContest({ contestId: instance.contestId, instanceId: instance.id }, true, instance.fixtureName, transactionNameTemplateGenerator(operationType_enum_1.operationTypes.CANCEL, instance.fixtureName), instance.entryFee);
                        }
                    }));
                    await this.fixtureRepository.updateFixture(fixtureId, {
                        display: false,
                    });
                    return { success: true };
                }
                catch (err) {
                    this.logger.error(`finishingFixtureProcess:${err.message}`, err.stack);
                    throw err;
                }
            },
            cancel: async () => {
                try {
                    await Promise.allSettled(instances.map((instance) => {
                        const templateGenerator = transactionNameTemplateGenerator(operationType, instance.fixtureName);
                        return this.cancelContestInstanceService.cancelContest({ contestId: instance.contestId, instanceId: instance.id }, true, instance.fixtureName, templateGenerator, instance.entryFee);
                    }));
                    await this.fixtureRepository.updateFixture(fixtureId, {
                        display: false,
                    });
                    return { success: true };
                }
                catch (err) {
                    this.logger.error(`cancelingFixtureProcess:${err.message}`, err.stack);
                    throw err;
                }
            },
            hide: async () => {
                try {
                    await this.fixtureRepository.updateFixture(fixtureId, {
                        display: false,
                    });
                    return { success: true };
                }
                catch (err) {
                    this.logger.error(`hidingFixtureProcess:${err.message}`, err.stack);
                    throw err;
                }
            },
        };
        const resolver = resolveAction[operationType];
        const result = await resolver();
        return result;
    }
};
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getActiveFixtures_dto_1.GetActiveFixturesRequestDto]),
    __metadata("design:returntype", Promise)
], FixtureService.prototype, "getActive", null);
FixtureService = FixtureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => contest_service_1.ContestService))),
    __metadata("design:paramtypes", [fixture_repository_1.FixtureRepository,
        cms_service_1.CmsService,
        transaction_manager_service_1.TransactionManager,
        contest_service_1.ContestService,
        contest_instance_service_1.ContestInstanceService,
        cancel_service_1.CancelContestInstanceService,
        markets_service_1.MarketsService,
        firestore_service_1.FirestoreService,
        market_lines_service_1.MarketLinesService])
], FixtureService);
exports.FixtureService = FixtureService;
//# sourceMappingURL=fixture.service.js.map