"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('financial_transactions', (table) => {
        table.string('amount').notNullable().alter();
    });
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20221020153256_change_amount_data_type.js.map