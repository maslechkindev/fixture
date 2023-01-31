"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('bets', (table) => {
        table.boolean('isForcedBet').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('bets', (table) => {
        table.dropColumn('isForcedBet');
    });
}
exports.down = down;
//# sourceMappingURL=20220417175020_add_isForcedBet_to_bets.js.map