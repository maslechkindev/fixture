"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('max_bet_limits', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable();
        table.foreign('userId').references('users.id');
        table.uuid('contestInstanceId').notNullable();
        table.foreign('contestInstanceId').references('contest_instances.id');
        table.string('marketLineId').notNullable();
        table.foreign('marketLineId').references('market_lines.marketLineId');
        table.decimal('maxBetLimit', 20, 8);
        table.unique(['userId', 'contestInstanceId', 'marketLineId']);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('max_bet_limits');
}
exports.down = down;
//# sourceMappingURL=20220404084801_max_bet_limits_table.js.map