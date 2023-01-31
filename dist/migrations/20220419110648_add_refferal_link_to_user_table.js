"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.withSchema('public').alterTable('users', (table) => {
        table.string('referralLink');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('referralLink');
    });
}
exports.down = down;
//# sourceMappingURL=20220419110648_add_refferal_link_to_user_table.js.map