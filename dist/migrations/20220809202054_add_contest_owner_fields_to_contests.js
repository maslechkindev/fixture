"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.string('contestOwnerResourceLink').nullable();
        table.string('contestOwnerLabelName').nullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('contestOwnerResourceLink');
        table.dropColumn('contestOwnerLabelName');
    });
}
exports.down = down;
//# sourceMappingURL=20220809202054_add_contest_owner_fields_to_contests.js.map