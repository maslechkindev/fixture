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
exports.WrappedReplenishBalanceResponseDto = exports.ReplenishBalanceResponseDto = exports.ReplenishBalanceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const userBalancesRecord_1 = require("../../../../../interfaces/entities/userBalancesRecord");
const class_transformer_1 = require("class-transformer");
const recursivePartial_1 = require("../../../../../helpers/recursivePartial");
class ReplenishEntry {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReplenishEntry.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Reason...' }),
    (0, class_validator_1.ValidateIf)((e) => Number.isFinite(e.amount) && e.amount !== 0),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplenishEntry.prototype, "reason", void 0);
class ReplenishBalanceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateIf)((e) => !e.real_money || e.tokens),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => ReplenishEntry),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ReplenishEntry)
], ReplenishBalanceDto.prototype, "tokens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateIf)((e) => !e.tokens || e.real_money),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => ReplenishEntry),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ReplenishEntry)
], ReplenishBalanceDto.prototype, "real_money", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ReplenishBalanceDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReplenishBalanceDto.prototype, "createdBy", void 0);
exports.ReplenishBalanceDto = ReplenishBalanceDto;
class ReplenishBalanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    __metadata("design:type", Boolean)
], ReplenishBalanceResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            real_money: {
                amount: 0,
            },
            tokens: {
                amount: 0,
            },
        },
    }),
    __metadata("design:type", Object)
], ReplenishBalanceResponseDto.prototype, "balances", void 0);
exports.ReplenishBalanceResponseDto = ReplenishBalanceResponseDto;
class WrappedReplenishBalanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ReplenishBalanceResponseDto)
], WrappedReplenishBalanceResponseDto.prototype, "data", void 0);
exports.WrappedReplenishBalanceResponseDto = WrappedReplenishBalanceResponseDto;
//# sourceMappingURL=replenishBalance.dto.js.map