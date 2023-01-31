"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('user_referred_by', (table) => {
        table.uuid('userId').unique().notNullable();
        table.foreign('userId').references('users.id');
        table.uuid('referrerId').notNullable();
        table.foreign('referrerId').references('users.id');
        table.timestamp('createdAt').notNullable().defaultTo('now()');
    });
    await knex.schema
        .withSchema('public')
        .createTable('transaction_types', (table) => {
        table.string('transactionType').primary().notNullable();
        table.string('description');
    });
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
    await knex('transaction_types').insert({
        transactionType: 'PMD_sign_up',
    });
    await knex('transaction_types').insert({
        transactionType: 'PMD_referral_code_sign_up',
    });
    await knex('transaction_types').insert({
        transactionType: 'PMD_referral',
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('play_cash_transactions');
    await knex.schema.dropTable('play_cash_balance');
    await knex.schema.dropTable('transaction_types');
    await knex.schema.dropTable('user_referred_by');
}
exports.down = down;
//# sourceMappingURL=20211101144335_play_cash_payments.js.map