"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.withSchema('public').createTable('user_bans', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable();
        table.string('banReason', 1000).notNullable();
        table.timestamp('bannedAt').notNullable().defaultTo(knex.fn.now(6));
        table.string('unbanReason', 1000);
        table.timestamp('unbannedAt');
        table.foreign('userId').references('users.id');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('user_bans');
}
exports.down = down;
//# sourceMappingURL=20211130092129_bans.js.map