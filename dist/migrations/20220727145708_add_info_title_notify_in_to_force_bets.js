"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('force_bets', (table) => {
        table.string('title').nullable();
        table.string('info').nullable();
        table.integer('notifyInSec').nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('force_bets', (table) => {
        table.dropColumn('title');
        table.dropColumn('info');
        table.dropColumn('notifyInSec');
    });
}
exports.down = down;
//# sourceMappingURL=20220727145708_add_info_title_notify_in_to_force_bets.js.map