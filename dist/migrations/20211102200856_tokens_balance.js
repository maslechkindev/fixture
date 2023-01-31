"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('token_balance', (table) => {
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
        .createTable('token_transactions', (table) => {
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
        table.foreign('balanceId').references('token_balance.id');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('token_transactions');
    await knex.schema.dropTable('token_balance');
}
exports.down = down;
//# sourceMappingURL=20211102200856_tokens_balance.js.map