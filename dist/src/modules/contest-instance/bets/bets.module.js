"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetsModule = void 0;
const common_1 = require("@nestjs/common");
const contest_instance_participants_module_1 = require("../contest-instance-participants/contest-instance-participants.module");
const contest_instance_module_1 = require("../contest-instance.module");
const bets_repository_1 = require("./bets.repository");
const bets_service_1 = require("./bets.service");
let BetsModule = class BetsModule {
};
BetsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            contest_instance_participants_module_1.ContestInstanceParticipantsModule,
            (0, common_1.forwardRef)(() => contest_instance_module_1.ContestInstanceModule),
        ],
        providers: [bets_service_1.BetsService, bets_repository_1.BetsRepository],
        controllers: [],
    })
], BetsModule);
exports.BetsModule = BetsModule;
//# sourceMappingURL=bets.module.js.map