"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .withSchema('public')
        .createTable('active_markets', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('contestId').notNullable();
        table.string('marketId').notNullable();
        table.foreign('contestId').references('contests.id');
        table.foreign('marketId').references('markets.marketId');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('active_markets');
}
exports.down = down;
//# sourceMappingURL=20220907103102_active_markets.js.map