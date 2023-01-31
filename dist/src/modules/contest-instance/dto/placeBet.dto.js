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
exports.WrappedPlaceBetResponseDto = exports.PlaceBetResponseDto = exports.PlaceBetDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("../../../helpers/errors");
const class_transformer_1 = require("class-transformer");
class PlaceBetDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contestInstanceId' }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.CONTEST.INVALID_CONTEST_INSTANCE_ID_PROVIDED,
    }),
    __metadata("design:type", String)
], PlaceBetDto.prototype, "contestInstanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'marketLineId' }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.CONTEST.INVALID_MARKET_LINE_ID_PROVIDED,
    }),
    __metadata("design:type", String)
], PlaceBetDto.prototype, "marketLineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)({
        context: errors_1.ERRORS.CONTEST.BET_AMOUNT_REQUIRED_POSITIVE,
    }),
    __metadata("design:type", Number)
], PlaceBetDto.prototype, "betAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, {
        context: errors_1.ERRORS.CONTEST.ODDS_REQUIRED,
    }),
    __metadata("design:type", Number)
], PlaceBetDto.prototype, "americanOdds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, {
        context: errors_1.ERRORS.CONTEST.WIN_AMOUNT_REQUIRED,
    }),
    __metadata("design:type", Number)
], PlaceBetDto.prototype, "winAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    __metadata("design:type", Boolean)
], PlaceBetDto.prototype, "isForcedBet", void 0);
exports.PlaceBetDto = PlaceBetDto;
class PlaceBetResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlaceBetResponseDto.prototype, "success", void 0);
exports.PlaceBetResponseDto = PlaceBetResponseDto;
class WrappedPlaceBetResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PlaceBetResponseDto)
], WrappedPlaceBetResponseDto.prototype, "data", void 0);
exports.WrappedPlaceBetResponseDto = WrappedPlaceBetResponseDto;
//# sourceMappingURL=placeBet.dto.js.map