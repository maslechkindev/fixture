"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('transaction_types').insert({
        transactionType: 'TD_purchase_card',
    });
}
exports.up = up;
async function down(knex) {
    await knex('transaction_types')
        .where({ transactionType: 'TD_purchase_card' })
        .del();
}
exports.down = down;
//# sourceMappingURL=20221003172806_add_purchase_transaction_type.js.map