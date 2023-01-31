"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.dropTableIfExists('subscription_info');
    await knex.schema
        .withSchema('public')
        .createTable('subscription_info', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('subscriptionId');
        table.string('subscriptionChecksum');
        table.string('lastAppliedEntityChangeBatchUuid');
    });
    await knex.schema.dropTableIfExists('sports');
    await knex.schema.withSchema('public').createTable('sports', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('sportId').unique().notNullable();
        table.string('name');
        table.integer('version');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema.dropTableIfExists('competitions');
    await knex.schema
        .withSchema('public')
        .createTable('competitions', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('competitionId').unique().notNullable();
        table.string('name');
        table.integer('version');
        table.string('sportId');
        table.foreign('sportId').references('sports.sportId');
        table.string('templateId');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema.dropTableIfExists('periods');
    await knex.schema.withSchema('public').createTable('periods', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('periodId').unique().notNullable();
        table.string('name');
        table.integer('version');
        table.integer('orderNum');
        table.boolean('isDrawPossible');
        table.string('parentId');
        table.foreign('parentId').references('periods.periodId');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema.dropTableIfExists('fixture_statuses');
    await knex.schema
        .withSchema('public')
        .createTable('fixture_statuses', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('fixtureStatusId').unique().notNullable();
        table.string('name');
        table.integer('version');
        table.string('description');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema.dropTableIfExists('fixtures');
    await knex.schema.withSchema('public').createTable('fixtures', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('fixtureId').unique().notNullable();
        table.string('sportId');
        table.foreign('sportId').references('sports.sportId');
        table.string('name');
        table.string('startTime');
        table.string('endTime');
        table.boolean('isLive');
        table.string('fixtureStatusId');
        table
            .foreign('fixtureStatusId')
            .references('fixture_statuses.fixtureStatusId');
        table.string('status');
        table.string('rootPeriodId');
        table.foreign('rootPeriodId').references('periods.periodId');
        table.string('currentPeriodId');
        table.foreign('currentPeriodId').references('periods.periodId');
        table.string('period');
        table.boolean('isComplete');
        table.string('competitionId');
        table.foreign('competitionId').references('competitions.competitionId');
        table.integer('version');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('subscription_info');
    await knex.schema.dropTableIfExists('sports');
    await knex.schema.dropTableIfExists('competitions');
    await knex.schema.dropTableIfExists('periods');
    await knex.schema.dropTableIfExists('fixture_statuses');
    await knex.schema.dropTableIfExists('fixtures');
}
exports.down = down;
//# sourceMappingURL=20220216114132_add_consumer_tables.js.map