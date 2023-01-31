"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.raw('ALTER TABLE token_balance ADD CONSTRAINT balance_check_bte_zero CHECK (amount >= 0);');
    await knex.raw('ALTER TABLE real_money_balance ADD CONSTRAINT balance_check_bte_zero CHECK (amount >= 0);');
}
exports.up = up;
async function down(knex) {
    await knex.raw('ALTER TABLE token_balance DROP CONSTRAINT balance_check_bte_zero;');
    await knex.raw('ALTER TABLE real_money_balance DROP CONSTRAINT balance_check_bte_zero;');
}
exports.down = down;
//# sourceMappingURL=20211230095035_add_non_zero_constraint_on_balances.js.map