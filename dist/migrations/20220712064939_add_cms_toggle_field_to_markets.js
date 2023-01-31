"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.boolean('toggle').defaultTo(true).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.dropColumn('toggle');
    });
}
exports.down = down;
//# sourceMappingURL=20220712064939_add_cms_toggle_field_to_markets.js.map