"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .withSchema('public')
        .alterTable('contest_instance_participants', (table) => {
        table.decimal('bankrollBalance', 20, 8).notNullable().defaultTo(0);
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .withSchema('public')
        .alterTable('contest_instance_participants', (table) => {
        table.dropColumn('bankrollBalance');
        table.dropColumn('updatedAt');
    });
}
exports.down = down;
//# sourceMappingURL=20220403110648_add_bankrollAmount_to_contest_instance_participiants.js.map