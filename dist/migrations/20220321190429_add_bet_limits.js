"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.integer('minBetLimit');
        table.integer('maxBetLimit');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.dropColumn('minBetLimit');
        table.dropColumn('maxBetLimit');
    });
}
exports.down = down;
//# sourceMappingURL=20220321190429_add_bet_limits.js.map