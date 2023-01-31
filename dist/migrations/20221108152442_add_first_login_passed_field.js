"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.boolean('firstLoginPassed').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('firstLoginPassed');
    });
}
exports.down = down;
//# sourceMappingURL=20221108152442_add_first_login_passed_field.js.map