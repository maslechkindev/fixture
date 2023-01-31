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
exports.WrappedGetFixtureMarketsResponseDto = exports.GetFixtureMarketsResponseDto = exports.GetFixtureMarketsRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const postFixtureStatFreeBets_dto_1 = require("./postFixtureStatFreeBets.dto");
var Direction;
(function (Direction) {
    Direction["ASC"] = "ASC";
    Direction["DESC"] = "DESC";
})(Direction || (Direction = {}));
class GetFixtureMarketsRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetFixtureMarketsRequestDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetFixtureMarketsRequestDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Direction }),
    (0, class_validator_1.IsEnum)(Direction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetFixtureMarketsRequestDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'createdAt' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetFixtureMarketsRequestDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1d5ea45-edbf-4409-a313-6ca223cf4718' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetFixtureMarketsRequestDto.prototype, "marketLines", void 0);
exports.GetFixtureMarketsRequestDto = GetFixtureMarketsRequestDto;
class GetFixtureMarketsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a1d5ea45-edbf-4409-a313-6ca223cf4718',
            name: 'First To 55 Points, 2nd Half (Ordinary Time)',
            status: true,
            order: 0,
        },
    }),
    __metadata("design:type", Array)
], GetFixtureMarketsResponseDto.prototype, "markets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], GetFixtureMarketsResponseDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", postFixtureStatFreeBets_dto_1.PostFixtureStartFreeBetsDto)
], GetFixtureMarketsResponseDto.prototype, "cmsInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], GetFixtureMarketsResponseDto.prototype, "marketLines", void 0);
exports.GetFixtureMarketsResponseDto = GetFixtureMarketsResponseDto;
class WrappedGetFixtureMarketsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetFixtureMarketsResponseDto)
], WrappedGetFixtureMarketsResponseDto.prototype, "data", void 0);
exports.WrappedGetFixtureMarketsResponseDto = WrappedGetFixtureMarketsResponseDto;
//# sourceMappingURL=getFixtureMarkets.dto.js.map