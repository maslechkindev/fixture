"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').createTable('usernames', (table) => {
        table.string('prefix').primary().unique().notNullable();
        table.integer('count').notNullable();
        table.timestamp('updated_at').defaultTo('now()');
        table.boolean('active').notNullable();
    });
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.string('username').unique();
    });
    const names = require('./20211007133140_usernames.json');
    return knex('usernames').insert(names.map((e) => {
        return { prefix: e, count: 0, active: true };
    }, []));
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('usernames');
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('username');
    });
}
exports.down = down;
//# sourceMappingURL=20211007133140_usernames.js.map