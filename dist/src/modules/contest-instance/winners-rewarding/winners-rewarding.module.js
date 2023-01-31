"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinnersRewardingModule = void 0;
const common_1 = require("@nestjs/common");
const balance_module_1 = require("../../balance/balance.module");
const contest_instance_participants_module_1 = require("../contest-instance-participants/contest-instance-participants.module");
const win_amount_calculation_service_1 = require("./win-amount-calculation.service");
const winners_rewarding_service_1 = require("./winners-rewarding.service");
let WinnersRewardingModule = class WinnersRewardingModule {
};
WinnersRewardingModule = __decorate([
    (0, common_1.Module)({
        imports: [contest_instance_participants_module_1.ContestInstanceParticipantsModule, balance_module_1.BalanceModule],
        providers: [winners_rewarding_service_1.WinnersRewardingService, win_amount_calculation_service_1.WinAmountCalculationService],
        exports: [winners_rewarding_service_1.WinnersRewardingService, win_amount_calculation_service_1.WinAmountCalculationService],
    })
], WinnersRewardingModule);
exports.WinnersRewardingModule = WinnersRewardingModule;
//# sourceMappingURL=winners-rewarding.module.js.map