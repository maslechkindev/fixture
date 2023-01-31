"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.string('country').nullable();
        table.string('state').nullable();
    });
    await knex('users').update({
        country: 'USA',
        state: 'Alabama',
    });
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.string('country').notNullable().alter();
        table.string('state').notNullable().alter();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('country');
        table.dropColumn('state');
    });
}
exports.down = down;
//# sourceMappingURL=20220906125615_country.js.map