"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const TX_TYPES = [
    'PMD_sign_up',
    'PMD_referral_code_sign_up',
    'PMD_referral',
    'PMD_personal_details',
    'PMD_username',
];
async function up(knex) {
    await knex('real_money_transactions').whereIn('type', TX_TYPES).del();
    await knex('token_transactions').whereIn('type', TX_TYPES).del();
    return knex('transaction_types').whereIn('transactionType', TX_TYPES).del();
}
exports.up = up;
async function down(knex) {
    return knex('transaction_types').insert(TX_TYPES.map((type) => ({ transactionType: type })));
}
exports.down = down;
//# sourceMappingURL=20220111165042_remove_old_transaction_types.js.map