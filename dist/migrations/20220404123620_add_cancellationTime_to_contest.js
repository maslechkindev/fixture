"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.integer('cancellationTime');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('cancellationTime');
    });
}
exports.down = down;
//# sourceMappingURL=20220404123620_add_cancellationTime_to_contest.js.map