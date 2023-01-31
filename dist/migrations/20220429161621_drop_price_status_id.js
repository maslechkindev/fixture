"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.dropColumn('priceStatus');
        table.dropColumn('priceStatusId');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.string('priceStatusId');
        table
            .foreign('priceStatusId')
            .references('market_line_price_statuses.marketLinePriceStatusId');
        table.string('priceStatus');
    });
}
exports.down = down;
//# sourceMappingURL=20220429161621_drop_price_status_id.js.map