"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.boolean('isUsernameChanged').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('isUsernameChanged');
    });
}
exports.down = down;
//# sourceMappingURL=20211104110005_is_username_changed.js.map