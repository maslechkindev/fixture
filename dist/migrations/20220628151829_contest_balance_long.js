"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.boolean('balanceLong').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('balanceLong');
    });
}
exports.down = down;
//# sourceMappingURL=20220628151829_contest_balance_long.js.map