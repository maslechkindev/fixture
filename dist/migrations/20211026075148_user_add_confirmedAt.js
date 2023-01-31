"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dateTime('confirmedAt');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('confirmedAt');
    });
}
exports.down = down;
//# sourceMappingURL=20211026075148_user_add_confirmedAt.js.map