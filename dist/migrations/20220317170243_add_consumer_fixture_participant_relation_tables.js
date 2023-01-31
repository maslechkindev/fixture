"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const fixtureParticipantRolesData = [
    {
        fixtureParticipantRoleId: '1',
        name: 'Home',
        version: 0,
    },
    {
        fixtureParticipantRoleId: '2',
        name: 'Away',
        version: 0,
    },
];
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('fixture_participant_roles', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('fixtureParticipantRoleId').unique().notNullable();
        table.string('name').notNullable();
        table.integer('version');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex('fixture_participant_roles').insert(fixtureParticipantRolesData);
    await knex.schema
        .withSchema('public')
        .createTable('fixture_participant_fixture_relations', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table
            .string('fixtureParticipantFixtureRelationId')
            .unique()
            .notNullable();
        table.string('fixtureId').notNullable();
        table.foreign('fixtureId').references('fixtures.fixtureId');
        table.string('fixturePeriodId').notNullable();
        table.string('fixtureParticipantId').notNullable();
        table.string('fixtureParticipantRoleId').notNullable();
        table
            .foreign('fixtureParticipantRoleId')
            .references('fixture_participant_roles.fixtureParticipantRoleId');
        table.string('fixtureParticipantRole').notNullable();
        table.integer('version');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.string('paramParticipantId1');
        table.boolean('paramBoolean1');
        table.decimal('paramFloat1', 20, 8);
        table.decimal('paramFloat2', 20, 8);
        table.string('paramEventPartId1');
        table.string('paramString1');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.dropColumns('paramParticipantId1', 'paramBoolean1', 'paramFloat1', 'paramFloat2', 'paramEventPartId1', 'paramString1');
    });
    await knex.schema.dropTableIfExists('fixture_participant_fixture_relations');
    await knex.schema.dropTableIfExists('fixture_participant_roles');
}
exports.down = down;
//# sourceMappingURL=20220317170243_add_consumer_fixture_participant_relation_tables.js.map