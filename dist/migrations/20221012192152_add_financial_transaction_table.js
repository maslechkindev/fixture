"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('financial_transactions', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable();
        table.decimal('amount').notNullable();
        table.jsonb('meta').notNullable();
        table.timestamp('createdAt').defaultTo('now()');
        table.timestamp('updatedAt').defaultTo('now()');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').dropTable('financial_transactions');
}
exports.down = down;
//# sourceMappingURL=20221012192152_add_financial_transaction_table.js.map