"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('fixtures', (table) => {
        table.timestamp('startTime').alter();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('fixtures', (table) => {
        table.string('startTime').alter();
    });
}
exports.down = down;
//# sourceMappingURL=20220518145351_startTime_date.js.map