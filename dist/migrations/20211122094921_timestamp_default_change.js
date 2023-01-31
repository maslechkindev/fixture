"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('registration_rewards', (table) => {
        table.timestamp('updatedAt').defaultTo(knex.fn.now(6)).alter();
    });
    await knex.schema.withSchema('public').alterTable('usernames', (table) => {
        table.timestamp('updated_at').defaultTo(knex.fn.now(6)).alter();
    });
    await knex.schema
        .withSchema('public')
        .alterTable('password_history', (table) => {
        table.timestamp('created_at').defaultTo(knex.fn.now(6)).alter();
    });
    await knex.schema
        .withSchema('public')
        .alterTable('user_referred_by', (table) => {
        table
            .timestamp('createdAt')
            .notNullable()
            .defaultTo(knex.fn.now(6))
            .alter();
    });
    await knex.schema
        .withSchema('public')
        .alterTable('play_cash_balance', (table) => {
        table
            .timestamp('updatedAt')
            .notNullable()
            .defaultTo(knex.fn.now(6))
            .alter();
    });
    await knex.schema
        .withSchema('public')
        .alterTable('play_cash_transactions', (table) => {
        table
            .timestamp('createdAt')
            .notNullable()
            .defaultTo(knex.fn.now(6))
            .alter();
        table
            .timestamp('updatedAt')
            .notNullable()
            .defaultTo(knex.fn.now(6))
            .alter();
    });
    await knex.schema
        .withSchema('public')
        .alterTable('token_balance', (table) => {
        table
            .timestamp('updatedAt')
            .notNullable()
            .defaultTo(knex.fn.now(6))
            .alter();
    });
    await knex.schema
        .withSchema('public')
        .alterTable('token_transactions', (table) => {
        table
            .timestamp('createdAt')
            .notNullable()
            .defaultTo(knex.fn.now(6))
            .alter();
        table
            .timestamp('updatedAt')
            .notNullable()
            .defaultTo(knex.fn.now(6))
            .alter();
    });
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20211122094921_timestamp_default_change.js.map