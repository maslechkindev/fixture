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
exports.MarketLinesService = void 0;
const common_1 = require("@nestjs/common");
const betOutcome_1 = require("../contest-instance/enums/betOutcome");
const marketLineStatus_enum_1 = require("../contest-instance/enums/marketLineStatus.enum");
const bets_service_1 = require("../contest-instance/bets/bets.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
let MarketLinesService = class MarketLinesService {
    constructor(betsService, contestInstanceService) {
        this.betsService = betsService;
        this.contestInstanceService = contestInstanceService;
    }
    async onMarketLineChangeStatus(marketLineId, statusId) {
        const statusIdToBetOutcome = {
            [marketLineStatus_enum_1.MarketLineStatus.CAN_HAPPEN]: betOutcome_1.BetOutcome.OPEN,
            [marketLineStatus_enum_1.MarketLineStatus.DID_HAPPEN]: betOutcome_1.BetOutcome.WON,
            [marketLineStatus_enum_1.MarketLineStatus.DID_NOT_HAPPEN]: betOutcome_1.BetOutcome.LOST,
            [marketLineStatus_enum_1.MarketLineStatus.VOID]: betOutcome_1.BetOutcome.PUSH,
            [marketLineStatus_enum_1.MarketLineStatus.CANCELLED]: betOutcome_1.BetOutcome.VOID,
            [marketLineStatus_enum_1.MarketLineStatus.HALF_WON]: betOutcome_1.BetOutcome.HALF_WON,
            [marketLineStatus_enum_1.MarketLineStatus.HALF_LOST]: betOutcome_1.BetOutcome.HALF_LOST,
        };
        const betOutcome = statusIdToBetOutcome[statusId];
        const shouldSettleMarketLineBets = !!betOutcome;
        if (shouldSettleMarketLineBets) {
            await this.betsService.settleBets({
                marketLineId: marketLineId,
                betOutcome,
            });
            const fixtureId = await this.contestInstanceService.getMarketLineFixtureId(marketLineId);
            if (betOutcome !== betOutcome_1.BetOutcome.OPEN) {
                await this.contestInstanceService.finishContestInstancesWhichAreReady(fixtureId);
            }
        }
    }
};
MarketLinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bets_service_1.BetsService,
        contest_instance_service_1.ContestInstanceService])
], MarketLinesService);
exports.MarketLinesService = MarketLinesService;
//# sourceMappingURL=market-lines.service.js.map