"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.string('contestOwnerPromoCode').nullable();
        table.foreign('contestOwnerPromoCode').references('users.promoCode');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('contestOwnerPromoCode');
    });
}
exports.down = down;
//# sourceMappingURL=20220817092114_contest_owner.js.map