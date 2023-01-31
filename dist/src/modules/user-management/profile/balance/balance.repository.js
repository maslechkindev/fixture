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
exports.BalanceRepository = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("../../../integrations/knex");
const R = require("ramda");
const balance_repository_1 = require("../../../balance/balance.repository");
const transactions_interface_1 = require("./interfaces/transactions.interface");
let BalanceRepository = class BalanceRepository {
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
    transactionNamesSetter(transactions, txFieldsToPick) {
        return transactions.map((tx) => (Object.assign(Object.assign({}, R.pick(txFieldsToPick, tx)), { name: this.getTransactionName(tx) })));
    }
    balanceAmountAfterRemover(transactions) {
        return transactions.map((transaction) => transaction.currencyType === transactions_interface_1.TRANSACTION_CURRENCY_TYPE.FINANCIAL
            ? Object.assign({}, R.omit(['balanceAmountAfter'], transaction)) : transaction);
    }
    async getLatestUserTransactions(userId, latestTransactionsCount, skipRealMoneyTransactions) {
        const knex = this.knex;
        const txFieldsToPick = [
            'id',
            'createdAt',
            'amount',
            'balanceAmountAfter',
            'currencyType',
        ];
        const defaultBindings = {
            financialCurrencyType: transactions_interface_1.TRANSACTION_CURRENCY_TYPE.FINANCIAL,
            tokenCurrencyType: transactions_interface_1.TRANSACTION_CURRENCY_TYPE.TOKEN,
            userId,
            latestTransactionsCount,
        };
        const defaultQueryString = `
    select "id",
      "createdAt",
      "meta",
      'buyingPurchace' as "type",
      "amount",
      0 as "balanceAmountAfter",
      :financialCurrencyType as "currencyType"
    from financial_transactions where "userId" = :userId
      union all
      select tt."id",
      "createdAt",
      "meta",
      tt."type",
      round(tt."amount")::varchar as "amount",
      round(tt."balanceAmountAfter") as "balanceAmountAfter",
      :tokenCurrencyType as "currencyType" from "token_transactions" tt
        inner join "token_balance" tb on tt."balanceId" = tb."id" where "userId" = :userId
    `;
        if (!skipRealMoneyTransactions) {
            const adiitionToDefaultQueryString = defaultQueryString +
                `
      union all
        select
          rmt."id",
          "createdAt",
          "meta",
          rmt."type",
          round(rmt."amount")::varchar as "amount",
          round(rmt."balanceAmountAfter") as "balanceAmountAfter",
          :realMoneyCurrencyType as "currencyType"
        from "real_money_transactions" rmt 
          inner join "real_money_balance" rmb on rmt."balanceId" = rmb."id" where "userId" = :userId `;
            const resultedQueryString = adiitionToDefaultQueryString +
                'order by "createdAt" desc limit :latestTransactionsCount';
            const transactions = await knex.raw(resultedQueryString, Object.assign(Object.assign({}, defaultBindings), { realMoneyCurrencyType: transactions_interface_1.TRANSACTION_CURRENCY_TYPE.REAL_MONEY }));
            const result = this.transactionNamesSetter(transactions.rows, txFieldsToPick);
            return result.length ? this.balanceAmountAfterRemover(result) : [];
        }
        const resultedQueryString = defaultQueryString +
            'order by "createdAt" desc limit :latestTransactionsCount';
        const transactions = await knex.raw(resultedQueryString, defaultBindings);
        const result = this.transactionNamesSetter(transactions.rows, txFieldsToPick);
        return result.length ? this.balanceAmountAfterRemover(result) : [];
    }
    async getUserTokenTransactions(userId, params) {
        var _a;
        const query = this.getQueryUserTokenTransactions(userId).select(this.knex.raw('count(*) OVER() as "itemsTotalCount"'));
        if (params.filters.startDate) {
            query.where('createdAt', '>=', params.filters.startDate);
        }
        if (params.filters.endDate) {
            query.where('createdAt', '<', params.filters.endDate);
        }
        const userTokenTransactions = (await query
            .orderBy('createdAt', 'desc')
            .limit(params.pagination.size)
            .offset((params.pagination.page - 1) * params.pagination.size));
        const itemsTotalCount = ((_a = userTokenTransactions[0]) === null || _a === void 0 ? void 0 : _a.itemsTotalCount) || 0;
        return {
            transactions: userTokenTransactions.map((tx) => (Object.assign(Object.assign({}, R.pick(['id', 'createdAt', 'amount', 'balanceAmountAfter'], tx)), { name: this.getTransactionName(tx) }))),
            itemsTotalCount,
        };
    }
    async getUserRealMoneyTransactions(userId, params) {
        var _a;
        const query = this.getQueryUserRealMoneyTransactions(userId).select(this.knex.raw('count(*) OVER() as "itemsTotalCount"'));
        if (params.filters.startDate) {
            query.where('createdAt', '>=', params.filters.startDate);
        }
        if (params.filters.endDate) {
            query.where('createdAt', '<', params.filters.endDate);
        }
        const userRealMoneyTransactions = (await query
            .orderBy('createdAt', 'desc')
            .limit(params.pagination.size)
            .offset((params.pagination.page - 1) * params.pagination.size));
        const itemsTotalCount = ((_a = userRealMoneyTransactions[0]) === null || _a === void 0 ? void 0 : _a.itemsTotalCount) || 0;
        return {
            transactions: userRealMoneyTransactions.map((tx) => (Object.assign(Object.assign({}, R.pick(['id', 'createdAt', 'amount', 'balanceAmountAfter'], tx)), { name: this.getTransactionName(tx) }))),
            itemsTotalCount,
        };
    }
    getTransactionName({ type, meta, }) {
        if (type === balance_repository_1.TRANSACTION_TYPES.TD_PURCHASE_CARD) {
            return meta === null || meta === void 0 ? void 0 : meta.reason;
        }
        return this.autoTransactionTypeToName.get(type) || (meta === null || meta === void 0 ? void 0 : meta.reason) || '';
    }
    getQueryUserTokenTransactions(userId) {
        const knex = this.knex;
        return knex
            .queryBuilder()
            .from('token_balance')
            .where({ userId })
            .innerJoin('token_transactions', 'token_balance.id', 'token_transactions.balanceId')
            .select(knex.ref('id').withSchema('token_transactions'), 'type', 'createdAt', 'meta', knex.raw('ROUND(token_transactions.amount) as amount'), knex.raw('ROUND(token_transactions."balanceAmountAfter") as "balanceAmountAfter"'));
    }
    getQueryUserRealMoneyTransactions(userId) {
        const knex = this.knex;
        return knex
            .queryBuilder()
            .from('real_money_balance')
            .where({ userId })
            .innerJoin('real_money_transactions', 'real_money_balance.id', 'real_money_transactions.balanceId')
            .select(knex.ref('id').withSchema('real_money_transactions'), 'type', 'createdAt', 'meta', knex.raw('ROUND(real_money_transactions.amount, 2) as amount'), knex.raw('ROUND(real_money_transactions."balanceAmountAfter", 2) as "balanceAmountAfter"'));
    }
};
BalanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], BalanceRepository);
exports.BalanceRepository = BalanceRepository;
//# sourceMappingURL=balance.repository.js.map