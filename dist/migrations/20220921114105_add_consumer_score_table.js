"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('received_info', (table) => {
        table.string('id').primary().notNullable();
        table.string('fixtureId').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('received_info');
}
exports.down = down;
//# sourceMappingURL=20220921114105_add_consumer_score_table.js.map