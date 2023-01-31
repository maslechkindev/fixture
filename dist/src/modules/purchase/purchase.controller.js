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
exports.PurchaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const purchase_service_1 = require("./purchase.service");
const decorators_1 = require("../../helpers/swagger/decorators");
const errors_1 = require("../../helpers/errors");
const initBody_dto_1 = require("./dto/initBody.dto");
const initResponse_dto_1 = require("./dto/initResponse.dto");
const decorators_2 = require("../../helpers/swagger/decorators");
const user_decorator_1 = require("../../decorators/user.decorator");
const R = require("ramda");
const user_interface_1 = require("../../interfaces/user.interface");
const successResponseBuyPurchaseCard_dto_1 = require("./dto/successResponseBuyPurchaseCard.dto");
const getUserTransactions_dto_1 = require("../user-management/profile/balance/dto/getUserTransactions.dto");
let PurchaseController = class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }
    async init(user, requestData) {
        const emptyUserDetails = R.pickBy((v) => v === null || v === '', user);
        if (!R.isEmpty(emptyUserDetails)) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.MISSING_PERSONAL_DETAILS(Object.keys(emptyUserDetails)));
        }
        return this.purchaseService.init(requestData);
    }
    async buyPurchaseCard(user, purchaseInfo) {
        const emptyUserDetails = R.pickBy((v) => v === null || v === '', user);
        if (!R.isEmpty(emptyUserDetails)) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.MISSING_PERSONAL_DETAILS(Object.keys(emptyUserDetails)));
        }
        const sessionId = await this.purchaseService.buyPurchaseCard(user, purchaseInfo);
        return { sessionId };
    }
    async getTransactionsHistiory({ id: userId }, params) {
        const transactions = await this.purchaseService.getTransactionsHistiory(userId, params);
        return transactions;
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: initResponse_dto_1.WrappedPurchaseInitResponse,
        description: 'Get purchase final price',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.NOT_EXIST).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.MISSING_PERSONAL_DETAILS([
                        'lastName',
                        'firstName',
                        'dateOfBirth',
                    ])).getResponse(),
                },
            ],
        },
        description: 'Error when purchase init',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.NOT_LOGGED_IN).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('init'),
    __param(0, (0, user_decorator_1.User)(['lastName', 'firstName', 'dateOfBirth'])),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, initBody_dto_1.InitBodyDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "init", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: successResponseBuyPurchaseCard_dto_1.successResponseBuyPurchaseCard,
    }),
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.PURCHASE.INVALID_PURCHASE_ID },
        { exceptionBody: errors_1.ERRORS.PURCHASE.INVALID_MONTH_NUMBER },
        {
            exceptionBody: errors_1.ERRORS.PURCHASE.MISSING_PERSONAL_DETAILS(['email', 'id']),
        },
        { exceptionBody: errors_1.ERRORS.PURCHASE.NOT_EXIST },
    ]),
    (0, common_1.Post)('/buy'),
    __param(0, (0, user_decorator_1.User)(['email', 'id'])),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, initBody_dto_1.InitBodyDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "buyPurchaseCard", null);
__decorate([
    (0, decorators_1.ApiBadRequestResponseWithMultipleExceptions)([
        { exceptionBody: errors_1.ERRORS.BALANCE.NO_TRANSACTIONS_FOR_PERIOD },
    ]),
    (0, common_1.Get)('/transactions/history'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, getUserTransactions_dto_1.GetUserTransactionsQueryDto]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getTransactionsHistiory", null);
PurchaseController = __decorate([
    (0, decorators_2.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Purchase'),
    (0, common_1.Controller)('purchase'),
    __metadata("design:paramtypes", [purchase_service_1.PurchaseService])
], PurchaseController);
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchase.controller.js.map