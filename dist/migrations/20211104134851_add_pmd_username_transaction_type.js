"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('transaction_types').insert({
        transactionType: 'PMD_username',
    });
}
exports.up = up;
async function down(knex) {
    await knex('transaction_types')
        .where({
        transactionType: 'PMD_username',
    })
        .del();
}
exports.down = down;
//# sourceMappingURL=20211104134851_add_pmd_username_transaction_type.js.map