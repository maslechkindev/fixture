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
exports.WrappedGetLatestUserTransactionsResponse = exports.GetLatestUserTransactionsResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const transactions_interface_1 = require("../interfaces/transactions.interface");
const getUserTransactions_dto_1 = require("./getUserTransactions.dto");
class GetLatestUserTransactionsResponse extends getUserTransactions_dto_1.UserTransaction {
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: transactions_interface_1.TRANSACTION_CURRENCY_TYPE }),
    __metadata("design:type", String)
], GetLatestUserTransactionsResponse.prototype, "currencyType", void 0);
exports.GetLatestUserTransactionsResponse = GetLatestUserTransactionsResponse;
class WrappedGetLatestUserTransactionsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetLatestUserTransactionsResponse)
], WrappedGetLatestUserTransactionsResponse.prototype, "data", void 0);
exports.WrappedGetLatestUserTransactionsResponse = WrappedGetLatestUserTransactionsResponse;
//# sourceMappingURL=getLatestUserTransactions.dto.js.map