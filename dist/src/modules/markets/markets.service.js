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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketsService = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("../integrations/cms/cms.service");
const job_queue_service_1 = require("../ancillary/job-queue/job-queue.service");
const markets_repository_1 = require("./markets.repository");
let MarketsService = class MarketsService {
    constructor(cmsService, jobQueueService, marketsRepository) {
        this.cmsService = cmsService;
        this.jobQueueService = jobQueueService;
        this.marketsRepository = marketsRepository;
    }
    async checkIsTypeIdInMarketTypeIds(cmsContestTemplateId, typeId, period) {
        try {
            const { exists } = await this.cmsService.isMarketTypeInContestTemplateFetch(cmsContestTemplateId, typeId, period);
            return exists;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    async getMarketLineIdsForMarkets(marketIds) {
        const marketLines = await this.marketsRepository.getMarketLineIdsForMarkets(marketIds);
        return marketLines;
    }
    async isActiveMarket(txManager, market, options = {
        checkToggle: true,
    }) {
        if (market.isClosed) {
            return false;
        }
        if (options.checkToggle === true && !market.toggle) {
            return false;
        }
        const activeMarketLines = await this.marketsRepository.getActiveMarketLines(txManager, market.marketId);
        if (!activeMarketLines || !activeMarketLines.length) {
            return false;
        }
        if (options.cmsContestTemplateId) {
            const isTypeIdInContestTemplate = await this.checkIsTypeIdInMarketTypeIds(options.cmsContestTemplateId, market.typeId, market.fixturePeriodId);
            if (!isTypeIdInContestTemplate) {
                return false;
            }
        }
        return true;
    }
    async isActiveMarketForCustomFreeBet(txManager, market) {
        if (market.isClosed) {
            return false;
        }
        if (!market.toggle) {
            return false;
        }
        const activeMarketLines = await this.marketsRepository.getActiveMarketLines(txManager, market.marketId);
        if (!activeMarketLines || !activeMarketLines.length) {
            return false;
        }
        return true;
    }
    async getMarketsByIds(txManager, ids) {
        return this.marketsRepository.getMarketsByIds(txManager, ids);
    }
};
MarketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cms_service_1.CmsService,
        job_queue_service_1.JobQueueService,
        markets_repository_1.MarketsRepository])
], MarketsService);
exports.MarketsService = MarketsService;
//# sourceMappingURL=markets.service.js.map