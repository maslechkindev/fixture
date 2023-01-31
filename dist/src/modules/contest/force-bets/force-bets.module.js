"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceBetsModule = void 0;
const common_1 = require("@nestjs/common");
const force_bets_repository_1 = require("./force-bets.repository");
const force_bets_service_1 = require("./force-bets.service");
let ForceBetsModule = class ForceBetsModule {
};
ForceBetsModule = __decorate([
    (0, common_1.Module)({
        providers: [force_bets_service_1.ForceBetsService, force_bets_repository_1.ForceBetsRepository],
        exports: [force_bets_service_1.ForceBetsService],
    })
], ForceBetsModule);
exports.ForceBetsModule = ForceBetsModule;
//# sourceMappingURL=force-bets.module.js.map