"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.dropTableIfExists('user_followings');
    await knex.schema
        .withSchema('public')
        .createTable('user_followings', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable();
        table.uuid('followingUserId').notNullable();
        table.foreign('userId').references('users.id');
        table.foreign('followingUserId').references('users.id');
        table.unique(['userId', 'followingUserId']);
    });
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.string('avatar');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('user_followings');
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('avatar');
    });
}
exports.down = down;
//# sourceMappingURL=20211101093851_user_following.js.map