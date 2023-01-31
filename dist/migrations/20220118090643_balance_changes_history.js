"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .table('token_transactions', (table) => {
        table.decimal('balanceAmountAfter', 20, 8).defaultTo(0).notNullable();
    });
    await knex.schema
        .withSchema('public')
        .table('real_money_transactions', (table) => {
        table.decimal('balanceAmountAfter', 20, 8).defaultTo(0).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('token_transactions', (table) => {
        table.dropColumn('balanceAmountAfter');
    });
    await knex.schema
        .withSchema('public')
        .table('real_money_transactions', (table) => {
        table.dropColumn('balanceAmountAfter');
    });
}
exports.down = down;
//# sourceMappingURL=20220118090643_balance_changes_history.js.map