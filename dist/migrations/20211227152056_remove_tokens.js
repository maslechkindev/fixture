"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const TRANSACTION_TYPES_RENAME_MAP = {
    PMD_sign_up: 'TD_sign_up',
    PMD_referral_code_sign_up: 'TD_referral_code_sign_up',
    PMD_referral: 'TD_referral',
    PMD_personal_details: 'TD_personal_details',
    PMD_username: 'TD_username',
};
async function up(knex) {
    var e_1, _a, e_2, _b, e_3, _c;
    await knex('token_transactions').del();
    await knex('token_balance').del();
    const txs = await knex('play_cash_transactions').select('*');
    const balances = await knex('play_cash_balance').select('*');
    try {
        for (var balances_1 = __asyncValues(balances), balances_1_1; balances_1_1 = await balances_1.next(), !balances_1_1.done;) {
            const bl = balances_1_1.value;
            await knex('token_balance').insert(Object.assign({}, bl));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (balances_1_1 && !balances_1_1.done && (_a = balances_1.return)) await _a.call(balances_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var txs_1 = __asyncValues(txs), txs_1_1; txs_1_1 = await txs_1.next(), !txs_1_1.done;) {
            const tx = txs_1_1.value;
            await knex('token_transactions').insert(Object.assign({}, tx));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (txs_1_1 && !txs_1_1.done && (_b = txs_1.return)) await _b.call(txs_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var _d = __asyncValues(Object.entries(TRANSACTION_TYPES_RENAME_MAP)), _e; _e = await _d.next(), !_e.done;) {
            const [otx, ntx] = _e.value;
            await knex('transaction_types').insert({ transactionType: ntx });
            await knex('token_transactions').update({ type: ntx }).where({ type: otx });
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_c = _d.return)) await _c.call(_d);
        }
        finally { if (e_3) throw e_3.error; }
    }
    await knex.schema.dropTableIfExists('play_cash_transactions');
    await knex.schema.dropTableIfExists('play_cash_balance');
}
exports.up = up;
async function down(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('play_cash_balance', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').unique().notNullable();
        table.foreign('userId').references('users.id');
        table.decimal('amount', 20, 8).notNullable();
        table.timestamp('updatedAt').notNullable().defaultTo('now()');
    });
    await knex.schema
        .withSchema('public')
        .createTable('play_cash_transactions', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('type').notNullable();
        table.foreign('type').references('transaction_types.transactionType');
        table.integer('status');
        table.timestamp('createdAt').notNullable().defaultTo('now()');
        table.timestamp('updatedAt').notNullable().defaultTo('now()');
        table.decimal('amount', 20, 8).notNullable();
        table.jsonb('meta').defaultTo('{}');
        table.uuid('balanceId').notNullable();
        table.foreign('balanceId').references('play_cash_balance.id');
    });
}
exports.down = down;
//# sourceMappingURL=20211227152056_remove_tokens.js.map