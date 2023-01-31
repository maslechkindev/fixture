"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.dropTableIfExists('user_activity_links');
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    return knex.schema
        .withSchema('public')
        .createTable('user_activity_links', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('email').notNullable();
        table.string('token').unique().notNullable();
        table.string('deviceIdentifier').notNullable();
        table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.dateTime('expiredAt').notNullable();
        table
            .enu('type', ['confirmation_email', 'forgot_password'])
            .notNullable();
        table.unique(['email', 'deviceIdentifier', 'type']);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('user_activity_links');
}
exports.down = down;
//# sourceMappingURL=20211013124649_user_activity_links.js.map