"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema
        .withSchema('public')
        .alterTable('user_referred_by', (table) => {
        table.timestamp('usedAt');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema
        .withSchema('public')
        .alterTable('user_referred_by', (table) => {
        table.dropColumn('usedAt');
    });
}
exports.down = down;
//# sourceMappingURL=20220113110648_add_used_at_to_user_referred_by.js.map