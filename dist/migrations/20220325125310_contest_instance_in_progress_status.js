"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('contest_instance_statuses').insert({ status: 'inProgress' });
}
exports.up = up;
async function down(knex) {
    await knex('contest_instance_statuses').where({ status: 'inProgress' }).del();
}
exports.down = down;
//# sourceMappingURL=20220325125310_contest_instance_in_progress_status.js.map