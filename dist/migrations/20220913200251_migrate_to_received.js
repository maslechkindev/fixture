"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('received_fixtures').insert(function () {
        this.select(['f.fixtureId as "id"', 'f.fixtureId'])
            .from('fixtures AS f')
            .where('f.startTime', '>', 'now()');
    });
    await knex('received_markets').insert(function () {
        this.select(['markets.marketId as "id"', 'markets.fixtureId'])
            .from('markets')
            .join('fixtures', 'fixtures.fixtureId', 'markets.fixtureId')
            .where('fixtures.startTime', '>', 'now()');
    });
    await knex('received_market_lines').insert(function () {
        this.select(['market_lines.marketLineId as "id"', 'market_lines.fixtureId'])
            .from('market_lines')
            .join('fixtures', 'fixtures.fixtureId', 'market_lines.fixtureId')
            .where('fixtures.startTime', '>', 'now()');
    });
    await knex('received_prices').insert(function () {
        this.select(['prices.priceId as "id"', 'market_lines.fixtureId'])
            .from('prices')
            .join('market_lines', 'market_lines.marketLineId', 'prices.marketLineId')
            .join('fixtures', 'fixtures.fixtureId', 'market_lines.fixtureId')
            .where('fixtures.startTime', '>', 'now()');
    });
}
exports.up = up;
async function down(knex) {
    await knex('received_fixtures').del();
    await knex('received_markets').del();
    await knex('received_market_lines').del();
    await knex('received_prices').del();
}
exports.down = down;
//# sourceMappingURL=20220913200251_migrate_to_received.js.map