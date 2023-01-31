"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw(`ALTER TABLE fixtures ALTER COLUMN "display" SET DEFAULT 'false'`);
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('fixtures', (table) => {
        table.dropColumn('display');
    });
}
exports.down = down;
//# sourceMappingURL=20220906141839_change_default_display_value.js.map