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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceRepository = exports.TRANSACTION_STATUS = exports.TRANSACTION_TYPES = void 0;
const knex_1 = require("../integrations/knex");
const common_1 = require("@nestjs/common");
const userBalancesRecord_1 = require("../../interfaces/entities/userBalancesRecord");
const recursivePartial_1 = require("../../helpers/recursivePartial");
const errors_1 = require("../../helpers/errors");
const currency_1 = require("../../enums/currency");
var TRANSACTION_TYPES;
(function (TRANSACTION_TYPES) {
    TRANSACTION_TYPES["TD_SIGN_UP"] = "TD_sign_up";
    TRANSACTION_TYPES["TD_REFERRAL_CODE_SIGN_UP"] = "TD_referral_code_sign_up";
    TRANSACTION_TYPES["TD_REFERRAL"] = "TD_referral";
    TRANSACTION_TYPES["TD_USERNAME"] = "TD_username";
    TRANSACTION_TYPES["TD_PERSONAL_DETAILS"] = "TD_personal_details";
    TRANSACTION_TYPES["MANUAL"] = "manual";
    TRANSACTION_TYPES["TD_PURCHASE_CARD"] = "TD_purchase_card";
})(TRANSACTION_TYPES = exports.TRANSACTION_TYPES || (exports.TRANSACTION_TYPES = {}));
var TRANSACTION_STATUS;
(function (TRANSACTION_STATUS) {
    TRANSACTION_STATUS[TRANSACTION_STATUS["PENDING"] = 0] = "PENDING";
    TRANSACTION_STATUS[TRANSACTION_STATUS["RESOLVED"] = 1] = "RESOLVED";
})(TRANSACTION_STATUS = exports.TRANSACTION_STATUS || (exports.TRANSACTION_STATUS = {}));
const currencyToBalanceEntity = {
    [currency_1.Currency.TOKEN]: 'tokens',
    [currency_1.Currency.REAL_MONEY]: 'real_money',
};
const BALANCE_ENTITY_TO_TABLES_MAP = {
    tokens: {
        transactions: 'token_transactions',
        balance: 'token_balance',
        roundOut: 'ROUND(amount) as amount',
    },
    real_money: {
        transactions: 'real_money_transactions',
        balance: 'real_money_balance',
        roundOut: 'ROUND(amount, 2) as amount',
    },
};
const roundTokenAmount = (amount) => Math.ceil(amount);
let BalanceRepository = class BalanceRepository {
    constructor(knex) {
        this.knex = knex;
        this.logger = new common_1.Logger(BalanceRepository.name);
    }
    async setupTokenBalance(txManager, userId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const [balance] = await conn('token_balance')
            .insert({ userId, amount: 0 })
            .returning(['id', 'amount']);
        return balance;
    }
    async setupRealMoneyBalance(txManager, userId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const [balance] = await conn('real_money_balance')
            .insert({ userId, amount: 0 })
            .returning(['id', 'amount']);
        return balance;
    }
    async setupRewardTransactions(txManager, userId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const balancesUpdated = [];
        const { id } = await conn('token_balance')
            .first()
            .select('id')
            .where({ userId });
        const transactionTypes = await conn('transaction_types')
            .select('transactionType', 'description')
            .whereIn('transactionType', [
            TRANSACTION_TYPES.TD_REFERRAL,
            TRANSACTION_TYPES.TD_SIGN_UP,
            TRANSACTION_TYPES.TD_REFERRAL_CODE_SIGN_UP,
        ]);
        const transactionTypesMap = transactionTypes.reduce((acc, e) => {
            acc[e.transactionType] = {
                type: e.transactionType,
                description: e.description,
            };
            return acc;
        }, {});
        const rewards = await conn('registration_rewards')
            .first()
            .select([
            'registrationNotReferred',
            'registrationReferred',
            'registrationReferredHolder',
        ]);
        const referrer = await conn('user_referred_by')
            .first()
            .select('referrerId')
            .where({ userId });
        await this.makeTokenTransactionAndUpdateBalance(txManager, transactionTypesMap[TRANSACTION_TYPES.TD_SIGN_UP].type, TRANSACTION_STATUS.RESOLVED, rewards.registrationNotReferred, id, { reason: transactionTypesMap[TRANSACTION_TYPES.TD_SIGN_UP].description });
        balancesUpdated.push(userId);
        if (referrer && referrer.referrerId) {
            await this.makeTokenTransactionAndUpdateBalance(txManager, transactionTypesMap[TRANSACTION_TYPES.TD_REFERRAL_CODE_SIGN_UP].type, TRANSACTION_STATUS.RESOLVED, rewards.registrationReferred, id, {
                reason: transactionTypesMap[TRANSACTION_TYPES.TD_REFERRAL_CODE_SIGN_UP]
                    .description,
            });
        }
    }
    async promoCodeUsedReward(txManager, userId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const referrers = await conn('user_referred_by')
            .update({ usedAt: conn.raw('now()') })
            .where({ userId, usedAt: null })
            .returning('*');
        const referrer = Array.isArray(referrers) && referrers[0];
        if (referrer) {
            const { transactionType, description } = await conn('transaction_types')
                .first()
                .select('transactionType', 'description')
                .where({ transactionType: TRANSACTION_TYPES.TD_REFERRAL });
            const rewards = await conn('registration_rewards')
                .first()
                .select([
                'registrationNotReferred',
                'registrationReferred',
                'registrationReferredHolder',
            ]);
            const referrerTokenBalance = await conn('token_balance')
                .first()
                .select('id')
                .where({ userId: referrer.referrerId });
            if (!referrerTokenBalance) {
                this.logger.error(new Error(`token balance doesn't exist for userId: ${referrer.referrerId}`));
                throw new common_1.InternalServerErrorException();
            }
            await this.makeTokenTransactionAndUpdateBalance(txManager, transactionType, TRANSACTION_STATUS.RESOLVED, rewards.registrationReferredHolder, referrerTokenBalance.id, { reason: description });
            return referrer.referrerId;
        }
    }
    async changeUsernameReward(txManager, userId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const { transactionType, description } = await conn('transaction_types')
            .first()
            .select('transactionType', 'description')
            .where({ transactionType: TRANSACTION_TYPES.TD_USERNAME });
        const rewards = await conn('registration_rewards')
            .first()
            .select('username');
        const tokenBalance = await conn('token_balance')
            .first()
            .select('id')
            .where({ userId });
        await this.makeTokenTransactionAndUpdateBalance(txManager, transactionType, TRANSACTION_STATUS.RESOLVED, rewards.username, tokenBalance.id, { reason: description });
    }
    async fillPersonalDetailsReward(txManager, userId) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const { transactionType, description } = await conn('transaction_types')
            .first()
            .select('transactionType', 'description')
            .where({ transactionType: TRANSACTION_TYPES.TD_PERSONAL_DETAILS });
        const rewards = await conn('registration_rewards')
            .first()
            .select(['personalDetails']);
        const userTokenBalance = await conn('token_balance')
            .first()
            .select('id')
            .where({ userId });
        if (!userTokenBalance) {
            this.logger.error(new Error(`token balance doesn't exist for userId: ${userId}`));
            throw new common_1.InternalServerErrorException();
        }
        await this.makeTokenTransactionAndUpdateBalance(txManager, transactionType, TRANSACTION_STATUS.RESOLVED, rewards.personalDetails, userTokenBalance.id, { reason: description });
    }
    async makeTokenTransactionAndUpdateBalance(txManager, type, status, amount, balanceId, meta = {}) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const roundedAmount = roundTokenAmount(amount);
        if (roundedAmount === 0) {
            this.logger.log('makeTokenTransactionAndUpdateBalance: token transaction with 0 amount');
            return;
        }
        this.logger.log(roundedAmount, { roundedAmount });
        const [{ amount: balanceAmountAfterTransaction }] = await conn('token_balance')
            .where({ id: balanceId })
            .increment('amount', roundedAmount)
            .returning('amount');
        await conn('token_transactions').insert({
            type,
            status,
            amount: roundedAmount,
            balanceAmountAfter: balanceAmountAfterTransaction,
            meta,
            balanceId,
        });
    }
    async getUserBalancesAmounts(txManager, userId, ignoreRealMoneyState, realMoneyState) {
        var _a, _b;
        const balances = await this.getUserBalances(txManager, userId, ignoreRealMoneyState, realMoneyState);
        return {
            tokenBalance: (_a = balances === null || balances === void 0 ? void 0 : balances.tokenBalance) === null || _a === void 0 ? void 0 : _a.amount,
            realMoneyBalance: (_b = balances === null || balances === void 0 ? void 0 : balances.realMoneyBalance) === null || _b === void 0 ? void 0 : _b.amount,
        };
    }
    async getUserBalances(txManager, userId, ignoreRealMoneyState, realMoneyState = false, roundAmounts = true) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const tokenBalance = await conn('token_balance')
            .first()
            .select(conn.raw(`id, "userId", ${roundAmounts ? 'ROUND(amount) as amount' : 'amount'}, "updatedAt"`))
            .where({ userId });
        let realMoneyBalance;
        if (ignoreRealMoneyState !== true && realMoneyState !== true) {
            realMoneyBalance = {};
        }
        else {
            realMoneyBalance = await conn('real_money_balance')
                .first()
                .select(conn.raw(`id, "userId", ${roundAmounts ? 'ROUND(amount, 2) as amount' : 'amount'}, "updatedAt"`))
                .where({ userId });
        }
        if (!tokenBalance || !realMoneyBalance) {
            this.logger.error(new Error(`tokenBalance or realMoneyBalance doesn't exist for userId: ${userId}`));
            throw new common_1.InternalServerErrorException();
        }
        return { tokenBalance, realMoneyBalance };
    }
    async getUserTransactions(userId, params, filters, ignoreRealMoneyState, realMoneyState = false, roundAmounts = true) {
        const knex = this.knex;
        const query = knex
            .select(knex.raw('"txId", type, status, "createdAt", amount, meta, currency, "createdBy", count(*) OVER() as fullcount'))
            .from(function () {
            this.select(knex.raw(`token_transactions.id as "txId", type, status, "createdAt", ${roundAmounts
                ? 'ROUND(token_transactions.amount) as amount'
                : 'amount'}, meta, meta::jsonb->>\'createdBy\' as "createdBy", \'token_transactions\' as currency`))
                .from('token_balance')
                .join('token_transactions', 'token_transactions.balanceId', 'token_balance.id')
                .where({ userId });
            if (ignoreRealMoneyState !== true && realMoneyState === true) {
                this.unionAll(function () {
                    this.select(knex.raw(`real_money_transactions.id as "txId", type, status, "createdAt", ${roundAmounts
                        ? 'ROUND(real_money_transactions.amount, 2) as amount'
                        : 'amount'}, meta, meta::jsonb->>\'createdBy\' as "createdBy", \'real_money_transactions\' as currency`))
                        .from('real_money_balance')
                        .join('real_money_transactions', 'real_money_transactions.balanceId', 'real_money_balance.id')
                        .where({ userId });
                });
            }
            this.as('transactions');
        })
            .orderBy(params.orderBy, params.direction)
            .limit(params.size)
            .offset((params.page - 1) * params.size);
        if (filters && filters.where) {
            query.where(filters.where);
        }
        if (filters && Array.isArray(filters.wheres)) {
            filters.wheres.forEach((f) => {
                if (Array.isArray(f)) {
                    query.where(...f);
                }
            });
        }
        if (filters && filters.whereNot) {
            query.whereNot(filters.whereNot);
        }
        return await query;
    }
    async changeBalance(txManager, balanceChangeDetails) {
        return this.createTransactionAndUpdateBalance(txManager, balanceChangeDetails.userId, currencyToBalanceEntity[balanceChangeDetails.currency], balanceChangeDetails.transactionType, balanceChangeDetails.amount, TRANSACTION_STATUS.RESOLVED, { reason: balanceChangeDetails.transactionName });
    }
    async createTransactionAndUpdateBalance(txManager, userId, field, type, amount, status, meta = {}) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        let finalAmount = amount;
        const tables = BALANCE_ENTITY_TO_TABLES_MAP[field];
        if (field === 'tokens') {
            finalAmount = roundTokenAmount(amount);
        }
        if (finalAmount === 0) {
            this.logger.log('createTransactionAndUpdateBalance: token transaction with 0 amount');
            return;
        }
        const balance = await conn(tables.balance)
            .first()
            .select('*')
            .where({ userId });
        try {
            const [{ amount: balanceAmountAfterTransaction }] = await conn(tables.balance)
                .where({ id: balance.id })
                .increment('amount', finalAmount)
                .returning('amount');
            await conn(tables.transactions).insert({
                type,
                status,
                amount: finalAmount,
                balanceAmountAfter: balanceAmountAfterTransaction,
                meta,
                balanceId: balance.id,
            });
            const { amount } = await conn(tables.balance)
                .select(conn.raw(tables.roundOut))
                .first()
                .where({ id: balance.id });
            return amount;
        }
        catch (err) {
            if (err.constraint === 'balance_check_bte_zero') {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.BALANCE.NEGATIVE_BALANCE);
            }
            throw err;
        }
    }
    async manualReplenishUserBalance(txManager, replenish) {
        var e_1, _a;
        const result = {};
        try {
            for (var _b = __asyncValues(Object.keys(replenish)), _c; _c = await _b.next(), !_c.done;) {
                const field = _c.value;
                const entry = replenish[field];
                const amount = entry && entry.amount;
                const reason = entry && entry.reason;
                const createdBy = replenish.createdBy;
                const type = TRANSACTION_TYPES.MANUAL;
                if (entry && Number.isFinite(amount) && amount !== 0) {
                    const newAmount = await this.createTransactionAndUpdateBalance(txManager, replenish.userId, field, type, amount, TRANSACTION_STATUS.RESOLVED, { reason, createdBy });
                    result[field] = { amount: newAmount };
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    }
};
BalanceRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], BalanceRepository);
exports.BalanceRepository = BalanceRepository;
//# sourceMappingURL=balance.repository.js.map