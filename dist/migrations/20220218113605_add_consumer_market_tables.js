"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').createTable('markets', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('fixturePeriodId');
        table.string('fixtureId');
        table.foreign('fixtureId').references('fixtures.fixtureId');
        table.string('typeId');
        table.boolean('isClosed');
        table.integer('numberOfOutcomes');
        table.string('name');
        table.string('marketId').unique().notNullable();
        table.integer('version');
        table.boolean('isComplete');
        table.boolean('isDisplay');
        table.boolean('isActive');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema
        .withSchema('public')
        .createTable('market_line_statuses', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('marketLineStatusId').unique().notNullable();
        table.integer('version');
        table.string('name');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema
        .withSchema('public')
        .createTable('market_lines', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('fixturePeriodId');
        table.string('fixtureId');
        table.foreign('fixtureId').references('fixtures.fixtureId');
        table.string('statusId');
        table
            .foreign('statusId')
            .references('market_line_statuses.marketLineStatusId');
        table.string('status');
        table.string('name');
        table.string('lineTypeId');
        table.string('marketLineId').unique().notNullable();
        table.integer('version');
        table.boolean('isDisplay');
        table.boolean('isActive');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema
        .withSchema('public')
        .createTable('market_lines_market_relations', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('marketLinesMarketRelationId').unique().notNullable();
        table.integer('version');
        table.string('marketId');
        table.foreign('marketId').references('markets.marketId');
        table.string('marketLineId');
        table.foreign('marketLineId').references('market_lines.marketLineId');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema
        .withSchema('public')
        .createTable('market_line_price_statuses', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('marketLinePriceStatusId').unique().notNullable();
        table.integer('version');
        table.string('name');
        table.boolean('isAvailable');
        table.string('description');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema.withSchema('public').createTable('prices', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('priceId').unique().notNullable();
        table.string('marketLineId');
        table.foreign('marketLineId').references('market_lines.marketLineId');
        table.integer('version');
        table.string('statusId');
        table
            .foreign('statusId')
            .references('market_line_price_statuses.marketLinePriceStatusId');
        table.string('status');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('prices');
    await knex.schema.dropTableIfExists('market_lines_market_relations');
    await knex.schema.dropTableIfExists('markets');
    await knex.schema.dropTableIfExists('market_lines');
    await knex.schema.dropTableIfExists('market_line_statuses');
    await knex.schema.dropTableIfExists('market_line_price_statuses');
}
exports.down = down;
//# sourceMappingURL=20220218113605_add_consumer_market_tables.js.map