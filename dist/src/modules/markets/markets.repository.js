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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketsRepository = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("../integrations/knex");
const transaction_manager_service_1 = require("../ancillary/transaction-manager/transaction-manager.service");
let MarketsRepository = class MarketsRepository {
    constructor(knex) {
        this.knex = knex;
        this.logger = new common_1.Logger(MarketsRepository.name);
    }
    async getActiveMarketLines(txManager, marketId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('market_lines')
            .innerJoin('market_lines_market_relations', 'market_lines.marketLineId', 'market_lines_market_relations.marketLineId')
            .select('market_lines.*')
            .where('market_lines_market_relations.marketId', '=', marketId)
            .where('market_lines.isActive', '=', true);
    }
    async getMarketLineIdsForMarkets(marketIds) {
        return this.knex('market_lines')
            .innerJoin('market_lines_market_relations', 'market_lines.marketLineId', 'market_lines_market_relations.marketLineId')
            .innerJoin('markets', 'markets.marketId', 'market_lines_market_relations.marketId')
            .innerJoin('prices', 'prices.marketLineId', 'market_lines.marketLineId')
            .select(this.knex.raw('DISTINCT ON (market_lines.id) market_lines.id, market_lines."marketLineId", prices."priceId"'))
            .whereIn('markets.id', marketIds);
    }
    async getMarketsByIds(txManager, ids) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        return conn('markets')
            .select('markets.*', 'market_templates.name as marketTemplateName')
            .join('market_templates', 'market_templates.id', 'markets.marketTemplateId')
            .whereIn('markets.id', ids);
    }
};
MarketsRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], MarketsRepository);
exports.MarketsRepository = MarketsRepository;
//# sourceMappingURL=markets.repository.js.map