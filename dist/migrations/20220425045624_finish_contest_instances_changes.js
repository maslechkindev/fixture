"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('contests', (table) => {
        table.jsonb('prizeWinnerShare').defaultTo([]);
    });
    await knex('contest_instance_statuses').insert({ status: 'finished' });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('contests', (table) => {
        table.dropColumn('prizeWinnerShare');
    });
    await knex('contest_instance_statuses').where({ status: 'finished' }).del();
}
exports.down = down;
//# sourceMappingURL=20220425045624_finish_contest_instances_changes.js.map