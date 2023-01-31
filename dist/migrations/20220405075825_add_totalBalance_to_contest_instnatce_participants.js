"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .withSchema('public')
        .alterTable('contest_instance_participants', (table) => {
        table.decimal('totalBalance', 20, 8).notNullable().defaultTo(0);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .withSchema('public')
        .alterTable('contest_instance_participants', (table) => {
        table.dropColumn('totalBalance');
    });
}
exports.down = down;
//# sourceMappingURL=20220405075825_add_totalBalance_to_contest_instnatce_participants.js.map