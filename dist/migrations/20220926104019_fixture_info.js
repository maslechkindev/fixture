"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('fixture_info', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('fixtureInfoId').notNullable().unique();
        table.string('fixtureId').notNullable();
        table.foreign('fixtureId').references('fixtures.fixtureId');
        table.string('typeId').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('fixture_info');
}
exports.down = down;
//# sourceMappingURL=20220926104019_fixture_info.js.map