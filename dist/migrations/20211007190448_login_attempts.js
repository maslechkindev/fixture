"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .withSchema('public')
        .createTable('login_attempts', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').unique().notNullable();
        table.integer('attempts').defaultTo(0).notNullable();
        table.foreign('userId').references('users.id');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('login_attempts');
}
exports.down = down;
//# sourceMappingURL=20211007190448_login_attempts.js.map