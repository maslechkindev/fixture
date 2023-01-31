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
exports.WrappedGetFixtureResponseDto = exports.GetFixtureResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tables_1 = require("../../../interfaces/db/tables");
const marketSuspensionRule_1 = require("../../../enums/marketSuspensionRule");
class GetFixtureResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
            name: 'Portland Trail Blazers vs New York Knicksssss',
            sportId: '5',
            startTime: '2022-04-17 17:00:00.000',
            endTime: '2022-04-17 18:00:00.000',
            isLive: true,
            competitionId: '145083608899571712',
            competition: 'NFL',
            sport: 'Am. Football',
            display: true,
            delay: 5,
            marketSuspensionRules: marketSuspensionRule_1.MarketSuspensionRule.DO_NOT_SUSPEND,
            templateId: '54',
            currentPeriodId: '31',
        },
    }),
    __metadata("design:type", Object)
], GetFixtureResponseDto.prototype, "fixture", void 0);
exports.GetFixtureResponseDto = GetFixtureResponseDto;
class WrappedGetFixtureResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetFixtureResponseDto)
], WrappedGetFixtureResponseDto.prototype, "data", void 0);
exports.WrappedGetFixtureResponseDto = WrappedGetFixtureResponseDto;
//# sourceMappingURL=getFixture.dto.js.map