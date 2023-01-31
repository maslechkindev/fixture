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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../../../decorators/user.decorator");
const errors_1 = require("../../../../helpers/errors");
const decorators_1 = require("../../../../helpers/swagger/decorators");
const user_interface_1 = require("../../../../interfaces/user.interface");
const balance_service_1 = require("./balance.service");
const getLatestUserTransactions_dto_1 = require("./dto/getLatestUserTransactions.dto");
const getUserTransactions_dto_1 = require("./dto/getUserTransactions.dto");
let BalanceController = class BalanceController {
    constructor(balanceService) {
        this.balanceService = balanceService;
    }
    async getLatestUserTransactions({ id: userId }) {
        const defaultLatestTransactionsNumber = 5;
        const result = await this.balanceService.getLatestUserTransactions(userId, defaultLatestTransactionsNumber);
        return result;
    }
    async getUserTokenTransactions({ id: userId }, query) {
        const userTokenTransactions = await this.balanceService.getUserTokenTransactions(userId, {
            pagination: {
                page: query.page,
                size: query.pageSize,
            },
            filters: {
                startDate: query.startDate,
                endDate: query.endDate,
            },
        });
        if (userTokenTransactions.itemsTotalCount === 0) {
            throw new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.BALANCE.NO_TRANSACTIONS_FOR_PERIOD);
        }
        return userTokenTransactions;
    }
    async getUserRealMoneyTransactions({ id: userId }, query) {
        const userRealMoneyTransactions = await this.balanceService.getUserRealMoneyTransactions(userId, {
            pagination: {
                page: query.page,
                size: query.pageSize,
            },
            filters: {
                startDate: query.startDate,
                endDate: query.endDate,
            },
        });
        if (userRealMoneyTransactions.itemsTotalCount === 0) {
            throw new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.BALANCE.NO_TRANSACTIONS_FOR_PERIOD);
        }
        return userRealMoneyTransactions;
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: getLatestUserTransactions_dto_1.WrappedGetLatestUserTransactionsResponse,
        description: 'Latest transactions of the user',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)(),
    (0, common_1.Get)('latest-transactions'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getLatestUserTransactions", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: getUserTransactions_dto_1.WrappedGetUserTransactionsResponse,
        description: 'Token transactions of the user',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiNotFoundResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.BALANCE.NO_TRANSACTIONS_FOR_PERIOD).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('token-transactions'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, getUserTransactions_dto_1.GetUserTransactionsQueryDto]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getUserTokenTransactions", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: getUserTransactions_dto_1.WrappedGetUserTransactionsResponse,
        description: 'Real money transactions of the user',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)(),
    (0, swagger_1.ApiNotFoundResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.NotFoundExceptionCustom(errors_1.ERRORS.BALANCE.NO_TRANSACTIONS_FOR_PERIOD).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('real-money-transactions'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, getUserTransactions_dto_1.GetUserTransactionsQueryDto]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "getUserRealMoneyTransactions", null);
BalanceController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Balance'),
    (0, common_1.Controller)('profile/balance'),
    __metadata("design:paramtypes", [balance_service_1.BalanceService])
], BalanceController);
exports.BalanceController = BalanceController;
//# sourceMappingURL=balance.controller.js.map