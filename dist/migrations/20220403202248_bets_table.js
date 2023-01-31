"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').createTable('bets', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable();
        table.foreign('userId').references('users.id');
        table.uuid('contestInstanceId').notNullable();
        table.foreign('contestInstanceId').references('contest_instances.id');
        table.string('marketId').notNullable();
        table.foreign('marketId').references('markets.marketId');
        table.string('marketName').notNullable();
        table.string('marketLineId').notNullable();
        table.foreign('marketLineId').references('market_lines.marketLineId');
        table.string('lineName').notNullable();
        table.integer('americanOdds').notNullable();
        table.decimal('betAmount', 20, 8).notNullable();
        table.decimal('winAmount', 20, 8).notNullable();
        table.string('betStatus').notNullable();
        table.string('betOutcome').notNullable();
        table.timestamp('betTime').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('bets');
}
exports.down = down;
//# sourceMappingURL=20220403202248_bets_table.js.map