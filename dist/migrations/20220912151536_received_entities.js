"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('received_fixtures', (table) => {
        table.string('id').primary().notNullable();
        table.string('fixtureId').notNullable();
    });
    await knex.schema
        .withSchema('public')
        .createTable('received_markets', (table) => {
        table.string('id').primary().notNullable();
        table.string('fixtureId').notNullable();
    });
    await knex.schema
        .withSchema('public')
        .createTable('received_market_lines', (table) => {
        table.string('id').primary().notNullable();
        table.string('fixtureId').notNullable();
    });
    await knex.schema
        .withSchema('public')
        .createTable('received_prices', (table) => {
        table.string('id').primary().notNullable();
        table.string('fixtureId').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('received_fixtures');
    await knex.schema.dropTable('received_markets');
    await knex.schema.dropTable('received_market_lines');
    await knex.schema.dropTable('received_prices');
}
exports.down = down;
//# sourceMappingURL=20220912151536_received_entities.js.map