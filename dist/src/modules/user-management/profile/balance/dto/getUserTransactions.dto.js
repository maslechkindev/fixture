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
exports.WrappedGetUserTransactionsResponse = exports.GetUserTransactionsResponse = exports.UserTransaction = exports.GetUserTransactionsQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetUserTransactionsPaginationQueryParams {
    constructor() {
        this.page = 1;
        this.pageSize = 10;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], GetUserTransactionsPaginationQueryParams.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, default: 10 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(45),
    __metadata("design:type", Object)
], GetUserTransactionsPaginationQueryParams.prototype, "pageSize", void 0);
class GetUserTransactionsQueryDto extends GetUserTransactionsPaginationQueryParams {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2022-01-18T00:00:00.000',
        description: 'Start date in ISO format (in UTC) ' +
            '(included, transaction date >= start date)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetUserTransactionsQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2022-01-19T00:00:00.000',
        description: 'End date in ISO format (in UTC) ' +
            '(not included, transaction date < end date)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetUserTransactionsQueryDto.prototype, "endDate", void 0);
exports.GetUserTransactionsQueryDto = GetUserTransactionsQueryDto;
class UserTransaction {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserTransaction.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '28a565eb-2d20-42c6-9417-29fed92456b6' }),
    __metadata("design:type", String)
], UserTransaction.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-01-19T14:38:34.191Z',
        description: 'ISO string (in UTC)',
    }),
    __metadata("design:type", String)
], UserTransaction.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserTransaction.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserTransaction.prototype, "balanceAmountAfter", void 0);
exports.UserTransaction = UserTransaction;
class GetUserTransactionsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UserTransaction] }),
    __metadata("design:type", Array)
], GetUserTransactionsResponse.prototype, "transactions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GetUserTransactionsResponse.prototype, "itemsTotalCount", void 0);
exports.GetUserTransactionsResponse = GetUserTransactionsResponse;
class WrappedGetUserTransactionsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetUserTransactionsResponse)
], WrappedGetUserTransactionsResponse.prototype, "data", void 0);
exports.WrappedGetUserTransactionsResponse = WrappedGetUserTransactionsResponse;
//# sourceMappingURL=getUserTransactions.dto.js.map