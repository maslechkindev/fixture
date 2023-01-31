"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .withSchema('public')
        .createTable('apple_accounts', (table) => {
        table.string('id').primary().notNullable();
        table.uuid('userId').unique().notNullable();
        table.foreign('userId').references('users.id');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('apple_accounts');
}
exports.down = down;
//# sourceMappingURL=20210930121813_apple_accounts.js.map