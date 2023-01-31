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
exports.WrappedGetFixtureContestResponseDto = exports.GetFixtureContestResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tables_1 = require("../../../interfaces/db/tables");
class GetFixtureContestResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'cc67bf00-033c-4599-8700-e96276fd3918',
            contestName: 'NBA real money name',
            minParticipants: 10,
            maxParticipants: 100,
            bankrollAmount: 25000,
            fixtureId: '161346125478023403',
            fixtureName: 'Portland Trail Blazers vs New York Knicks2',
            productType: 'real_money',
            notFinished: 3,
        },
    }),
    __metadata("design:type", Object)
], GetFixtureContestResponseDto.prototype, "contest", void 0);
exports.GetFixtureContestResponseDto = GetFixtureContestResponseDto;
class WrappedGetFixtureContestResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetFixtureContestResponseDto)
], WrappedGetFixtureContestResponseDto.prototype, "data", void 0);
exports.WrappedGetFixtureContestResponseDto = WrappedGetFixtureContestResponseDto;
//# sourceMappingURL=getFixtureContest.js.map