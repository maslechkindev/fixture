"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('participants', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name');
        table.string('participantId').unique().notNullable();
        table.string('typeId').defaultTo(2);
        table.integer('version');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').dropTable('participants');
}
exports.down = down;
//# sourceMappingURL=20220502140308_add_participant_table.js.map