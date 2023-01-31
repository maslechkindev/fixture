"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.string('periodId');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('periodId');
    });
}
exports.down = down;
//# sourceMappingURL=20220317105126_contest_alter_table.js.map