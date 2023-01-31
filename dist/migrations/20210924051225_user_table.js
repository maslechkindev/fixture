"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.dropTableIfExists('users');
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    return knex.schema.withSchema('public').createTable('users', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('email').unique().notNullable();
        table.string('passwordHash');
        table.string('salt');
        table.string('promoCode').unique().notNullable();
        table.enu('status', ['not confirmed', 'confirmed']).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('users');
    await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
}
exports.down = down;
//# sourceMappingURL=20210924051225_user_table.js.map