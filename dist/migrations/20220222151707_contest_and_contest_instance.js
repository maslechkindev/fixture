"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
    await knex.schema.withSchema('public').createTable('currencies', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('currency');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex('currencies').insert({ currency: 'real_money' });
    await knex('currencies').insert({ currency: 'token' });
    await knex.schema.withSchema('public').createTable('contests', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('templateId');
        table.integer('cmsContestTemplateId');
        table.string('fixtureId');
        table.unique(['fixtureId', 'cmsContestTemplateId']);
        table.integer('minParticipants');
        table.integer('maxParticipants');
        table.boolean('leavingAllowed');
        table.uuid('entryCurrency');
        table.foreign('entryCurrency').references('currencies.id');
        table.integer('bankrollAmount');
        table.integer('prizeAmount');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.string('contestName');
        table.string('type');
        table.integer('entryFee');
    });
    await knex.schema
        .withSchema('public')
        .createTable('contest_instance_statuses', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('status');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex('contest_instance_statuses').insert({ status: 'regOpened' });
    await knex.schema
        .withSchema('public')
        .createTable('contest_instances', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('contestId');
        table.foreign('contestId').references('contests.id');
        table.string('instanceName');
        table.uuid('status');
        table.foreign('status').references('contest_instance_statuses.id');
        table.integer('instanceNumber');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('contest_instances');
    await knex.schema.dropTableIfExists('contest_instance_statuses');
    await knex.schema.dropTableIfExists('contests');
    await knex.schema.dropTableIfExists('currencies');
}
exports.down = down;
//# sourceMappingURL=20220222151707_contest_and_contest_instance.js.map