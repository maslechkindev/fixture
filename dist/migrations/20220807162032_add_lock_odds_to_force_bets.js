"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('force_bets', (table) => {
        table.jsonb('lockOdds').nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('force_bets', (table) => {
        table.dropColumn('lockOdds');
    });
}
exports.down = down;
//# sourceMappingURL=20220807162032_add_lock_odds_to_force_bets.js.map