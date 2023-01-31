"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.boolean('settledManually').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.dropColumn('settledManually');
    });
}
exports.down = down;
//# sourceMappingURL=20220906133458_add_settledManually_to_market_lines.js.map