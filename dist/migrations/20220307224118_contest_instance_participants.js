"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('contest_instance_participants', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('contestInstanceId');
        table.foreign('contestInstanceId').references('contest_instances.id');
        table.uuid('userId');
        table.foreign('userId').references('users.id');
        table.unique(['contestInstanceId', 'userId']);
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instances', (table) => {
        table.integer('currentParticipants').notNullable().defaultTo(0);
    });
    await knex('contest_instance_statuses').insert({ status: 'inQueue' });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('contest_instance_participants');
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instances', (table) => {
        table.dropColumn('currentParticipants');
    });
    await knex('contest_instance_statuses').where({ status: 'inQueue' }).del();
}
exports.down = down;
//# sourceMappingURL=20220307224118_contest_instance_participants.js.map