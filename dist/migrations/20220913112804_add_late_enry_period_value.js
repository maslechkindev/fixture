"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instances', (table) => {
        table.string('lateEntryPeriodId').nullable();
        table.boolean('lateEntryPeriodPassed');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .withSchema('public')
        .alterTable('contest_instances', (table) => {
        table.dropColumn('lateEntryPeriodId');
        table.dropColumn('lateEntryPeriodPassed');
    });
}
exports.down = down;
//# sourceMappingURL=20220913112804_add_late_enry_period_value.js.map