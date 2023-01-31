"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.integer('registrationStartTime');
        table.string('registrationStartPeriodId');
        table.foreign('registrationStartPeriodId').references('periods.periodId');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('registrationStartTime');
        table.dropColumn('registrationStartPeriodId');
    });
}
exports.down = down;
//# sourceMappingURL=20220323151855_add_start_time_and_period_to_contest.js.map