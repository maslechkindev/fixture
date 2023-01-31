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
exports.WrappedGetFixtureContestsResponseDto = exports.GetFixtureContestsResponseDto = exports.GetFixtureContestsRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Direction;
(function (Direction) {
    Direction["ASC"] = "ASC";
    Direction["DESC"] = "DESC";
})(Direction || (Direction = {}));
class GetFixtureContestsRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetFixtureContestsRequestDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetFixtureContestsRequestDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Direction }),
    (0, class_validator_1.IsEnum)(Direction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetFixtureContestsRequestDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'createdAt' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetFixtureContestsRequestDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string' }),
    __metadata("design:type", String)
], GetFixtureContestsRequestDto.prototype, "search", void 0);
exports.GetFixtureContestsRequestDto = GetFixtureContestsRequestDto;
class GetFixtureContestsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a1d5ea45-edbf-4409-a313-6ca223cf4718',
            contestName: 'NFL contest',
            type: 'Default',
            createdAt: '2022-03-31T07:51:49.983Z',
            period: 'Whole Match',
            instancesNumber: '3',
        },
    }),
    __metadata("design:type", Array)
], GetFixtureContestsResponseDto.prototype, "contests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], GetFixtureContestsResponseDto.prototype, "count", void 0);
exports.GetFixtureContestsResponseDto = GetFixtureContestsResponseDto;
class WrappedGetFixtureContestsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetFixtureContestsResponseDto)
], WrappedGetFixtureContestsResponseDto.prototype, "data", void 0);
exports.WrappedGetFixtureContestsResponseDto = WrappedGetFixtureContestsResponseDto;
//# sourceMappingURL=getFixtureContests.dto.js.map