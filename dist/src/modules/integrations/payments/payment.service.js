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
var PaymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const user_interface_1 = require("../../../interfaces/user.interface");
const config_1 = require("../../../config");
const paymentStatus_1 = require("./enums/paymentStatus");
const currency_1 = require("../../../enums/currency");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const paymentTypes_1 = require("./enums/paymentTypes");
const balance_service_1 = require("../../balance/balance.service");
const componentNames_enum_1 = require("../../purchase/enums/componentNames.enum");
const balance_repository_1 = require("../../balance/balance.repository");
const stripe_1 = require("stripe");
const date_fns_1 = require("date-fns");
const payments_repository_1 = require("./payments.repository");
const metaInfoType_1 = require("../../purchase/types/metaInfoType");
const firestore_service_1 = require("../firebase/firestore/firestore.service");
let PaymentService = PaymentService_1 = class PaymentService {
    constructor(transactionManager, balanceService, paymentRepository, stripe, firestoreService) {
        this.transactionManager = transactionManager;
        this.balanceService = balanceService;
        this.paymentRepository = paymentRepository;
        this.stripe = stripe;
        this.firestoreService = firestoreService;
        this.logger = new common_1.Logger(PaymentService_1.name);
        this.defaultCurrency = 'usd';
        this.transactionNameGetters = {
            [componentNames_enum_1.componentNames.TOKENS_ONETIME]: (meta) => `${meta.purchaseName}${meta.coins ? ' - ' + meta.coins + ' ' + 'coins' : ''}`,
            [componentNames_enum_1.componentNames.MIX_ONETIME]: (meta) => {
                const { Tokens_amount: amount } = meta.tokens;
                const monthQnty = meta.premium && this.getMonthQuantityForTransactionName(meta);
                return `${meta.purchaseName}${amount ? ' - ' + amount + ' ' + 'coins' : ''}${monthQnty ? ' - ' + monthQnty + ' ' + 'months' : ''}`;
            },
            [componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP]: (meta) => {
                const { Tokens_amount: amount } = meta.tokens;
                const monthQnty = meta.premium && this.getMonthQuantityForTransactionName(meta);
                if (monthQnty === 0) {
                    const diffInDays = (0, date_fns_1.differenceInDays)(new Date(meta.endDate), new Date(meta.startDate));
                    return `${meta.purchaseName}${amount ? ' - ' + amount + ' ' + 'coins' : ''}${' - ' + diffInDays + ' ' + 'days'}`;
                }
                return `${meta.purchaseName}${amount ? ' - ' + amount + ' ' + 'coins' : ''}${monthQnty ? ' - ' + monthQnty + ' ' + 'months' : ''}`;
            },
        };
        this.proceses = {
            ['expired']: async (params) => {
                this.logger.log(`expired procees trigered with this data:${JSON.stringify(params)}`);
                await this.paymentRepository.updateExpiredPayment(params.paymentId);
            },
            ['payment_waiting']: async (params) => {
                this.logger.log(`payment_waiting procees trigered with this data:${JSON.stringify(params)}`);
                await this.paymentRepository.updateAwaitingPayment(params.paymentId, params.paymentStatus);
            },
            ['succeeded']: async (params) => {
                this.logger.log(`succeded procees trigered with this data:${JSON.stringify(params)}`);
                const txManager = await this.transactionManager.begin();
                const [{ paymentType, meta, userId }] = await this.paymentRepository.updateSucceded(params.paymentId, params.paymentStatus, txManager);
                this.logger.log(`metaData about paymens:${JSON.stringify(meta)}`);
                try {
                    if (paymentType !== paymentTypes_1.PaymentType.PURCHASE_CARD || !meta.purchasePrice) {
                        throw new Error('such paymentType can not be processed');
                    }
                    if (meta.component === componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP ||
                        meta.component === componentNames_enum_1.componentNames.MIX_ONETIME) {
                        if (meta.premium) {
                            this.logger.log(`premiumt status should be updated`);
                            await this.premiumStatusSetter(meta, userId, txManager);
                        }
                        await this.updateBalance(meta, userId, txManager);
                    }
                    if (meta.component === componentNames_enum_1.componentNames.TOKENS_ONETIME) {
                        const tokenItem = meta.tokensOptions.find((el) => el.tokens === meta.tokenQty);
                        if (!tokenItem) {
                            throw new Error('Error occured during search of necessary tokens amount');
                        }
                        const financialTransactionName = this.getFinancialTrancsactionName(Object.assign(Object.assign({}, meta), { coins: tokenItem.tokens }));
                        if (tokenItem.tokens) {
                            const tokenBalance = await this.balanceService.changeBalance(txManager, {
                                userId,
                                amount: tokenItem.tokens,
                                currency: currency_1.Currency.TOKEN,
                                transactionName: this.getTokenTransactionNameForPurchaseCardPayment(meta),
                                transactionType: balance_repository_1.TRANSACTION_TYPES.TD_PURCHASE_CARD,
                            });
                            await this.updateFireStoreBalance(userId, tokenBalance);
                        }
                        await this.addFinancialTransaction(meta.purchasePrice, txManager, {
                            reason: financialTransactionName,
                        }, userId);
                        this.logger.log('payment successfully handled');
                    }
                    await txManager.commit();
                    this.logger.log('payment successfully handled');
                }
                catch (err) {
                    this.logger.error(`such errod occured during paymentHandling:${err.message}`);
                    await txManager.rollback();
                    throw err;
                }
            },
        };
    }
    async initPayment(user, amount, paymentId, options) {
        const session = await this.stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            cancel_url: `${config_1.default.LINK_PREFIX}purchases`,
            success_url: `${config_1.default.LINK_PREFIX}payment/success`,
            customer_email: user.email,
            currency: options.currency.toLowerCase(),
            metadata: {
                paymentId,
            },
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        product_data: {
                            name: options.detail1_text,
                            description: options.detail1_description,
                        },
                        currency: (options === null || options === void 0 ? void 0 : options.currency) || this.defaultCurrency,
                        unit_amount: amount,
                    },
                },
            ],
        });
        return session.id;
    }
    async statusUpdater(meta, userId, txManager) {
        if (meta.component === componentNames_enum_1.componentNames.MIX_ONETIME &&
            meta.monthQty) {
            const endTime = (0, date_fns_1.add)(new Date(), { months: meta.monthQty });
            await this.paymentRepository.updatePremiumStatus(userId, new Date(), endTime, txManager);
        }
        if (meta.component === componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP &&
            meta.endDate &&
            meta.startDate) {
            await this.paymentRepository.updatePremiumStatus(userId, new Date(meta.startDate), new Date(meta.endDate), txManager);
        }
    }
    async statusCreator(meta, userId, txManager) {
        if (meta.component === componentNames_enum_1.componentNames.MIX_ONETIME &&
            meta.monthQty) {
            const endTime = (0, date_fns_1.add)(new Date(), { months: meta.monthQty });
            await this.paymentRepository.createPremiumStatus(userId, new Date(), endTime, txManager);
        }
        if (meta.component === componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP &&
            meta.endDate &&
            meta.startDate) {
            await this.paymentRepository.createPremiumStatus(userId, new Date(meta.startDate), new Date(meta.endDate), txManager);
        }
    }
    addFinancialTransaction(purchasePrice, txManager, meta, userId) {
        return this.paymentRepository.addFinancialTransaction(purchasePrice, txManager, JSON.stringify(meta), userId);
    }
    async premiumStatusSetter(meta, userId, txManager) {
        const existedPremiumTerms = await this.paymentRepository.getExistedPremiumTerms(userId, txManager);
        if (existedPremiumTerms.length) {
            await this.statusUpdater(meta, userId, txManager);
            return;
        }
        await this.statusCreator(meta, userId, txManager);
    }
    getMonthQuantityForTransactionName(meta) {
        if (meta.component === componentNames_enum_1.componentNames.MIX_ONETIME) {
            return meta === null || meta === void 0 ? void 0 : meta.monthQty;
        }
        if (meta.component === componentNames_enum_1.componentNames.MIX_ONETIME_WITH_CP) {
            return (0, date_fns_1.differenceInMonths)(new Date(meta.endDate), new Date(meta.startDate));
        }
    }
    getTokenTransactionNameForPurchaseCardPayment(meta) {
        return `Coins Deposit - buying ${meta.purchaseName}`;
    }
    async updateBalance(meta, userId, txManager) {
        var _a;
        if ((_a = meta === null || meta === void 0 ? void 0 : meta.tokens) === null || _a === void 0 ? void 0 : _a.Tokens_amount) {
            const { Tokens_amount: amount } = meta.tokens;
            const tokenBalance = await this.balanceService.changeBalance(txManager, {
                userId,
                amount,
                currency: currency_1.Currency.TOKEN,
                transactionName: this.getTokenTransactionNameForPurchaseCardPayment(meta),
                transactionType: balance_repository_1.TRANSACTION_TYPES.TD_PURCHASE_CARD,
            });
            await this.updateFireStoreBalance(userId, tokenBalance);
        }
        const financialTransactionName = this.getFinancialTrancsactionName(meta);
        await this.addFinancialTransaction(meta.purchasePrice, txManager, { reason: financialTransactionName }, userId);
    }
    updateFireStoreBalance(userId, tokensAmount) {
        return this.firestoreService.mergeUpdate('users', userId, {
            tokenBalance: String(tokensAmount),
        });
    }
    getFinancialTrancsactionName(meta) {
        return this.transactionNameGetters[meta.component](meta);
    }
    async processPaymentInfo(paymentStatus, paymentId) {
        if (!this.proceses[paymentStatus]) {
            throw new Error('no such services');
        }
        if (paymentStatus === paymentStatus_1.PaymentStatus.SUCCEEDED ||
            paymentStatus === paymentStatus_1.PaymentStatus.WAITING_PAYMENT) {
            await this.proceses[paymentStatus]({ paymentId, paymentStatus });
        }
        else {
            await this.proceses[paymentStatus]({ paymentId });
        }
    }
};
PaymentService = PaymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)('STRIPE')),
    __metadata("design:paramtypes", [transaction_manager_service_1.TransactionManager,
        balance_service_1.BalanceService,
        payments_repository_1.PaymentRepository,
        stripe_1.Stripe,
        firestore_service_1.FirestoreService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map