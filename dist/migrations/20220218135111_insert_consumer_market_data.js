"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const marketLineStatusesData = [
    {
        marketLineStatusId: '1',
        version: 0,
        name: 'Can Happen',
    },
    {
        marketLineStatusId: '2',
        version: 1,
        name: 'Did Happen',
    },
    {
        marketLineStatusId: '3',
        version: 0,
        name: 'Did Not Happen',
    },
    {
        marketLineStatusId: '4',
        version: 0,
        name: 'Unknown But Resolved',
    },
    {
        marketLineStatusId: '5',
        version: 0,
        name: 'Unknown',
    },
    {
        marketLineStatusId: '6',
        version: 1,
        name: 'Half Won',
    },
    {
        marketLineStatusId: '7',
        version: 2,
        name: 'Half Lost',
    },
    {
        marketLineStatusId: '8',
        version: 1,
        name: 'Void',
    },
    {
        marketLineStatusId: '9',
        version: 0,
        name: 'Cancelled',
    },
];
const marketLinePriceStatuses = [
    {
        isAvailable: true,
        name: 'Standard',
        description: 'The betting offer has odds and is available for betting.',
        marketLinePriceStatusId: '1',
        version: 0,
    },
    {
        isAvailable: true,
        name: 'Starting Price',
        description: 'The betting offer has no odds (yet) but bets can still be placed. For example, in horse racing it is possible to bet on the (yet unknown) odds prevailing in the on-course fixed-odds betting market at the time a race begins.',
        marketLinePriceStatusId: '2',
        version: 0,
    },
    {
        isAvailable: false,
        name: 'Non-Participant',
        description: 'The participant associated with the (outright) betting offer does not participate in the event (any more). Used by some providers.',
        marketLinePriceStatusId: '3',
        version: 0,
    },
    {
        isAvailable: false,
        name: 'Removed',
        description: 'The betting offer is (potentially temporarily) removed from the provider data source.',
        marketLinePriceStatusId: '4',
        version: 0,
    },
    {
        isAvailable: false,
        name: 'Invalid',
        description: 'The betting offer is (potentially temporarily) invalid.',
        marketLinePriceStatusId: '5',
        version: 0,
    },
    {
        isAvailable: false,
        name: 'Resolved',
        description: 'The betting offer is resolved because the associated outcome is resolved.',
        marketLinePriceStatusId: '6',
        version: 0,
    },
    {
        isAvailable: false,
        name: 'Suspended',
        description: 'The betting offer is temporarily removed from the provider data source.',
        marketLinePriceStatusId: '7',
        version: 0,
    },
];
async function up(knex) {
    await knex('market_line_statuses').insert(marketLineStatusesData);
    await knex('market_line_price_statuses').insert(marketLinePriceStatuses);
}
exports.up = up;
async function down(knex) {
    await knex('market_line_statuses').del();
    await knex('market_line_price_statuses').del();
}
exports.down = down;
//# sourceMappingURL=20220218135111_insert_consumer_market_data.js.map