"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instance_participants', (table) => {
        table.text('reasonOfExclude').defaultTo('');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instance_participants', (table) => {
        table.dropColumn('reasonOfExclude');
    });
}
exports.down = down;
//# sourceMappingURL=20220707122001_add_reason_of_exclude_field.js.map