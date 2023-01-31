import { Knex } from 'knex';
import { MarketSuspensionRule } from '../src/enums/marketSuspensionRule';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema('public').alterTable('fixtures', (table) => {
    table.boolean('display').defaultTo(true).notNullable();
    table
      .enu('marketSuspensionRules', [
        MarketSuspensionRule.SUSPEND_AS_PROVIDER,
        MarketSuspensionRule.DO_NOT_SUSPEND,
        MarketSuspensionRule.SUSPEND_WITH_DELAY,
      ])
      .defaultTo(MarketSuspensionRule.SUSPEND_AS_PROVIDER)
      .notNullable();
    table.integer('delay');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema('public').alterTable('fixtures', (table) => {
    table.dropColumn('display');
    table.dropColumn('marketSuspensionRules');
    table.dropColumn('delay');
  });
}
