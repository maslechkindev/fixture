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
exports.WrappedGetContestInstanceUserMaxBetLimitResponseDto = exports.GetContestInstanceUserMaxBetLimitResponseDto = exports.GetContestInstanceUserMaxBetLimitRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class GetContestInstanceUserMaxBetLimitRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contestInstanceId' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetContestInstanceUserMaxBetLimitRequestDto.prototype, "contestInstanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'marketLineId' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetContestInstanceUserMaxBetLimitRequestDto.prototype, "marketLineId", void 0);
exports.GetContestInstanceUserMaxBetLimitRequestDto = GetContestInstanceUserMaxBetLimitRequestDto;
class GetContestInstanceUserMaxBetLimitResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GetContestInstanceUserMaxBetLimitResponseDto.prototype, "maxBetLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GetContestInstanceUserMaxBetLimitResponseDto.prototype, "minBetLimit", void 0);
exports.GetContestInstanceUserMaxBetLimitResponseDto = GetContestInstanceUserMaxBetLimitResponseDto;
class WrappedGetContestInstanceUserMaxBetLimitResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetContestInstanceUserMaxBetLimitResponseDto)
], WrappedGetContestInstanceUserMaxBetLimitResponseDto.prototype, "data", void 0);
exports.WrappedGetContestInstanceUserMaxBetLimitResponseDto = WrappedGetContestInstanceUserMaxBetLimitResponseDto;
//# sourceMappingURL=getContestInstanceUserMaxBetLimit.dto.js.map