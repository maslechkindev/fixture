"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.boolean('cmsHomeVisible').nullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('cmsHomeVisible');
    });
}
exports.down = down;
//# sourceMappingURL=20220825105013_add_cms_home_visible_field_to_contests.js.map