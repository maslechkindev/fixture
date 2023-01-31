"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('registration_rewards', (table) => {
        table.integer('personalDetails').notNullable().defaultTo(0);
        table.integer('username').notNullable().defaultTo(0);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('registration_rewards', (table) => {
        table.dropColumn('personalDetails');
        table.dropColumn('username');
    });
}
exports.down = down;
//# sourceMappingURL=20211101072905_rewards_add_columns.js.map