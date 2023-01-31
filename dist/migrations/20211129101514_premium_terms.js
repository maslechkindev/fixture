"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.dropTableIfExists('premium_terms');
    return knex.schema
        .withSchema('public')
        .createTable('premium_terms', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').unique().notNullable();
        table.foreign('userId').references('users.id');
        table.dateTime('startTime');
        table.dateTime('endTime');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('premium_terms');
}
exports.down = down;
//# sourceMappingURL=20211129101514_premium_terms.js.map