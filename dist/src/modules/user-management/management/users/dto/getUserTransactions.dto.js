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
exports.WrappedGetUserTransactionsResponseDto = exports.GetUserTransactionsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const transactionsList_interface_1 = require("../../../../balance/interfaces/transactionsList.interface");
class GetUserTransactionsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                txId: '0a47291b-a25e-45b0-b281-2a5abdee7b19',
                type: 'PMD_sign_up',
                status: 1,
                createdAt: '2021-12-21T12:23:59.850Z',
                amount: '123123.00000000',
                meta: {},
                currency: 'token_transactions',
                createdBy: null,
                fullcount: '11',
            },
        ],
    }),
    __metadata("design:type", Array)
], GetUserTransactionsResponseDto.prototype, "userTransactions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], GetUserTransactionsResponseDto.prototype, "count", void 0);
exports.GetUserTransactionsResponseDto = GetUserTransactionsResponseDto;
class WrappedGetUserTransactionsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetUserTransactionsResponseDto)
], WrappedGetUserTransactionsResponseDto.prototype, "data", void 0);
exports.WrappedGetUserTransactionsResponseDto = WrappedGetUserTransactionsResponseDto;
//# sourceMappingURL=getUserTransactions.dto.js.map