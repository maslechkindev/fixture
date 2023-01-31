"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.dropColumn('isDisplay');
        table.dropColumn('isActive');
    });
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.dropColumn('isDisplay');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.boolean('isDisplay');
        table.boolean('isActive');
    });
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.boolean('isDisplay');
    });
}
exports.down = down;
//# sourceMappingURL=20220429125127_drop_is_display.js.map