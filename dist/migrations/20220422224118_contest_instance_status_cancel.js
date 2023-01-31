"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('contest_instance_statuses').insert({ status: 'cancelled' });
}
exports.up = up;
async function down(knex) {
    await knex('contest_instance_statuses').where({ status: 'cancelled' }).del();
}
exports.down = down;
//# sourceMappingURL=20220422224118_contest_instance_status_cancel.js.map