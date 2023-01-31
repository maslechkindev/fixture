"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .withSchema('public')
        .createTable('password_history', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable();
        table.foreign('userId').references('users.id');
        table.string('passwordHash').notNullable();
        table.string('salt').notNullable();
        table.timestamp('created_at').defaultTo('now()');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('password_history');
}
exports.down = down;
//# sourceMappingURL=20211027122315_password_history.js.map