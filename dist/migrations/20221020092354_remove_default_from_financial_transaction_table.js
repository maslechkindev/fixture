"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('financial_transactions', (table) => {
        table.timestamp('createdAt').defaultTo(knex.fn.now(6)).alter();
        table.timestamp('updatedAt').defaultTo(knex.fn.now(6)).alter();
    });
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20221020092354_remove_default_from_financial_transaction_table.js.map