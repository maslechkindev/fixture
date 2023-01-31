"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('real_money_balance', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').unique().notNullable();
        table.foreign('userId').references('users.id');
        table.decimal('amount', 20, 8).notNullable();
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema
        .withSchema('public')
        .createTable('real_money_transactions', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('type').notNullable();
        table.foreign('type').references('transaction_types.transactionType');
        table.integer('status');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
        table.decimal('amount', 20, 8).notNullable();
        table.jsonb('meta').defaultTo('{}');
        table.uuid('balanceId').notNullable();
        table.foreign('balanceId').references('real_money_balance.id');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('real_money_transactions');
    await knex.schema.dropTable('real_money_balance');
}
exports.down = down;
//# sourceMappingURL=20211117085652_real_money_balance.js.map