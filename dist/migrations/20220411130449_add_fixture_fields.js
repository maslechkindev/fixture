"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const marketSuspensionRule_1 = require("../src/enums/marketSuspensionRule");
async function up(knex) {
    return knex.schema.withSchema('public').alterTable('fixtures', (table) => {
        table.boolean('display').defaultTo(true).notNullable();
        table
            .enu('marketSuspensionRules', [
            marketSuspensionRule_1.MarketSuspensionRule.SUSPEND_AS_PROVIDER,
            marketSuspensionRule_1.MarketSuspensionRule.DO_NOT_SUSPEND,
            marketSuspensionRule_1.MarketSuspensionRule.SUSPEND_WITH_DELAY,
        ])
            .defaultTo(marketSuspensionRule_1.MarketSuspensionRule.SUSPEND_AS_PROVIDER)
            .notNullable();
        table.integer('delay');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('fixtures', (table) => {
        table.dropColumn('display');
        table.dropColumn('marketSuspensionRules');
        table.dropColumn('delay');
    });
}
exports.down = down;
//# sourceMappingURL=20220411130449_add_fixture_fields.js.map