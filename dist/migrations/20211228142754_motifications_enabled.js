"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.boolean('notificationsEnabled').notNullable().defaultTo(true);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('notificationsEnabled');
    });
}
exports.down = down;
//# sourceMappingURL=20211228142754_motifications_enabled.js.map