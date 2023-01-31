"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.string('priceStatusId');
        table
            .foreign('priceStatusId')
            .references('market_line_price_statuses.marketLinePriceStatusId');
        table.string('priceStatus');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.dropForeign('priceStatusId');
        table.dropColumn('priceStatusId');
        table.dropColumn('priceStatus');
    });
}
exports.down = down;
//# sourceMappingURL=20220328110546_market_line_alter_table.js.map