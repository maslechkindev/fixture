"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketLinesModule = void 0;
const common_1 = require("@nestjs/common");
const market_lines_service_1 = require("./market-lines.service");
const bets_module_1 = require("../contest-instance/bets/bets.module");
const contest_instance_module_1 = require("../contest-instance/contest-instance.module");
const bets_service_1 = require("../contest-instance/bets/bets.service");
const contest_instance_service_1 = require("../contest-instance/contest-instance.service");
const bets_repository_1 = require("../contest-instance/bets/bets.repository");
const winners_rewarding_service_1 = require("../contest-instance/winners-rewarding/winners-rewarding.service");
const market_lines_pubsub_controller_1 = require("./market-lines.pubsub-controller");
let MarketLinesModule = class MarketLinesModule {
};
MarketLinesModule = __decorate([
    (0, common_1.Module)({
        imports: [bets_module_1.BetsModule, contest_instance_module_1.ContestInstanceModule],
        controllers: [market_lines_pubsub_controller_1.MarketLinesPubsubController],
        providers: [
            market_lines_service_1.MarketLinesService,
            bets_service_1.BetsService,
            contest_instance_service_1.ContestInstanceService,
            bets_repository_1.BetsRepository,
            winners_rewarding_service_1.WinnersRewardingService,
        ],
        exports: [
            market_lines_service_1.MarketLinesService,
            bets_service_1.BetsService,
            contest_instance_service_1.ContestInstanceService,
            bets_repository_1.BetsRepository,
            winners_rewarding_service_1.WinnersRewardingService,
        ],
    })
], MarketLinesModule);
exports.MarketLinesModule = MarketLinesModule;
//# sourceMappingURL=market-lines.module.js.map