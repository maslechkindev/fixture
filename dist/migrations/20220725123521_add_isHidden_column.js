"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.boolean('isHidden').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('isHidden');
    });
}
exports.down = down;
//# sourceMappingURL=20220725123521_add_isHidden_column.js.map