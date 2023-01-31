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
exports.PurchaseService = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("../integrations/cms/cms.service");
const componentNames_enum_1 = require("./enums/componentNames.enum");
const errors_1 = require("../../helpers/errors");
const payment_service_1 = require("../integrations/payments/payment.service");
const user_interface_1 = require("../../interfaces/user.interface");
const purchase_repository_1 = require("./purchase.repository");
const R = require("ramda");
const getUserTransactions_dto_1 = require("../user-management/profile/balance/dto/getUserTransactions.dto");
let PurchaseService = class PurchaseService {
    constructor(cmsService, purchaseRepository, paymentService) {
        this.cmsService = cmsService;
        this.purchaseRepository = purchaseRepository;
        this.paymentService = paymentService;
    }
    async init(purchaseDetails) {
        const purchase = await this.cmsService.getPurchaseById(purchaseDetails.id);
        if (!purchase) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.NOT_EXIST);
        }
        return {
            finalPrice: this.getFinalPurchase(purchase, purchaseDetails.options),
        };
    }
    async buyPurchaseCard(user, purchaseInfo) {
        const defaultFieldsToPick = [
            'premium',
            'startDate',
            'endDate',
            'tokens',
            'tokensOptions',
        ];
        const particularCard = await this.cmsService.getPurchaseById(purchaseInfo.id);
        const { DynamicZone } = particularCard;
        const [{ description }] = DynamicZone;
        const { component } = DynamicZone[0];
        const fieldsToPick = component === componentNames_enum_1.componentNames.TOKENS_ONETIME
            ? R.without(['premium', 'startDate', 'endDate', 'tokens'], defaultFieldsToPick)
            : component === componentNames_enum_1.componentNames.MIX_ONETIME
                ? R.without(['tokensOptions', 'startDate', 'endDate'], defaultFieldsToPick)
                : component === componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP
                    ? R.without(['tokensOptions'], defaultFieldsToPick)
                    : null;
        const componentTypeAttributes = R.pick(fieldsToPick, DynamicZone[0]);
        const isPublishedPurchase = await this.cmsService.isPublishedPurchase(purchaseInfo.id);
        if (component === componentNames_enum_1.componentNames.MIX_ONETIME && !isPublishedPurchase) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.INVALID_PURCHASE_ID);
        }
        const { currency, name } = particularCard;
        if (purchaseInfo.options.monthQty &&
            componentTypeAttributes.allowedMonthsNumber &&
            purchaseInfo.options.monthQty >
                componentTypeAttributes.allowedMonthsNumber) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.INVALID_MONTH_NUMBER);
        }
        const finalPurchase = this.getFinalPurchase(particularCard, purchaseInfo.options);
        const chargedAmount = (parseFloat(finalPurchase.toString()) * 100).toFixed(2);
        const purchasePrice = parseFloat(finalPurchase.toString()).toFixed(2);
        const metaAboutPurchase = Object.assign(Object.assign(Object.assign(Object.assign({}, componentTypeAttributes), { component,
            purchasePrice, purchaseName: name }), (component === componentNames_enum_1.componentNames.TOKENS_ONETIME
            ? { tokenQty: purchaseInfo.options.tokenQty }
            : {})), (component === componentNames_enum_1.componentNames.TOKENS_ONETIME ||
            component === componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP
            ? {}
            : { monthQty: purchaseInfo.options.monthQty }));
        const [{ id: paymentId }] = await this.purchaseRepository.startPayment(user, metaAboutPurchase);
        const sessionId = await this.paymentService.initPayment(user, Number(chargedAmount), paymentId, { detail1_text: name, currency, detail1_description: description });
        return sessionId;
    }
    async getTransactionsHistiory(userId, params) {
        const transactionsHistiory = await this.purchaseRepository.getTransactionsHistory(userId, params);
        if (!transactionsHistiory.length) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.BALANCE.NO_TRANSACTIONS_FOR_PERIOD);
        }
        return transactionsHistiory;
    }
    getFinalPurchase(purchase, options) {
        const data = purchase.DynamicZone[0];
        if (data.component === componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP) {
            return data.pricePerPeriod;
        }
        if (data.component === componentNames_enum_1.componentNames.MIX_ONETIME && options.monthQty > 0) {
            return options.monthQty * data.pricePerMonth * (1 - data.Discount / 100);
        }
        if (data.component === componentNames_enum_1.componentNames.TOKENS_ONETIME) {
            const token = data.tokensOptions.find((option) => options.tokenQty && option.tokens === options.tokenQty);
            if (!token) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.NOT_EXIST);
            }
            return token.price;
        }
        throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.PURCHASE.NOT_EXIST);
    }
};
PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cms_service_1.CmsService,
        purchase_repository_1.PurchaseRepository,
        payment_service_1.PaymentService])
], PurchaseService);
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=purchase.service.js.map