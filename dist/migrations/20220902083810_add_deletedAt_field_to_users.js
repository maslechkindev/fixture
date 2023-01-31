"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.timestamp('deletedAt').nullable().defaultTo(null);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('deletedAt');
    });
}
exports.down = down;
//# sourceMappingURL=20220902083810_add_deletedAt_field_to_users.js.map