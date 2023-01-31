"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.string('prizeType');
        table.string('prizeAmount').alter();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('prizeType');
    });
}
exports.down = down;
//# sourceMappingURL=20220331072122_contest_add_prizetype.js.map