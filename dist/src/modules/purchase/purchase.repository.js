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
exports.PurchaseRepository = void 0;
const user_interface_1 = require("../../interfaces/user.interface");
const balance_repository_1 = require("../balance/balance.repository");
const purchase_dto_1 = require("../integrations/cms/dto/purchase.dto");
const knex_1 = require("../integrations/knex");
const getUserTransactions_dto_1 = require("../user-management/profile/balance/dto/getUserTransactions.dto");
const R = require("ramda");
let PurchaseRepository = class PurchaseRepository {
    constructor(knex) {
        this.knex = knex;
        this.autoTransactionTypeToName = new Map(Object.entries({
            [balance_repository_1.TRANSACTION_TYPES.TD_USERNAME]: 'Coins Deposit - Nickname Change',
            [balance_repository_1.TRANSACTION_TYPES.TD_SIGN_UP]: 'Coins Deposit - Sign Up',
            [balance_repository_1.TRANSACTION_TYPES.TD_REFERRAL_CODE_SIGN_UP]: 'Coins Deposit - Referral Code Sign Up',
            [balance_repository_1.TRANSACTION_TYPES.TD_REFERRAL]: 'Coins Deposit - Referral',
            [balance_repository_1.TRANSACTION_TYPES.TD_PERSONAL_DETAILS]: 'Coins Deposit - Personal Details',
            [balance_repository_1.TRANSACTION_TYPES.TD_PURCHASE_CARD]: 'Tokens Deposit - buying purchase card',
        }));
    }
    async startPayment(user, metaAboutPurchase) {
        const res = await this.knex('payments')
            .insert({
            userId: user.id,
            status: 'pending',
            createdAt: new Date().toISOString(),
            paymentType: 'purchaseCard',
            meta: JSON.stringify(metaAboutPurchase),
        })
            .returning('id');
        return res;
    }
    async getTransactionsHistory(userId, queryParams) {
        const query = this.knex('financial_transactions')
            .where({
            userId,
        })
            .select('meta', 'id', 'createdAt', 'amount');
        if (queryParams.startDate) {
            query.where('createdAt', '>=', queryParams.startDate);
        }
        if (queryParams.endDate) {
            query.where('createdAt', '<=', queryParams.endDate);
        }
        query
            .orderBy('createdAt', 'desc')
            .limit(queryParams.pageSize)
            .offset((queryParams.page - 1) * queryParams.pageSize);
        const result = await query;
        return result.map((tx) => (Object.assign(Object.assign({}, R.pick(['id', 'createdAt', 'amount'], tx)), { name: tx.meta.reason })));
    }
};
PurchaseRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], PurchaseRepository);
exports.PurchaseRepository = PurchaseRepository;
//# sourceMappingURL=purchase.repository.js.map