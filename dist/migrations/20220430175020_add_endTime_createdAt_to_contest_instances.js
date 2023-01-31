"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.alterTable('contest_instances', (table) => {
        table.timestamp('endTime');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable('contest_instances', (table) => {
        table.dropColumn('endTime');
    });
}
exports.down = down;
//# sourceMappingURL=20220430175020_add_endTime_createdAt_to_contest_instances.js.map