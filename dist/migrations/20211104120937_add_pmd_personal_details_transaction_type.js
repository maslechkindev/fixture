"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('transaction_types').insert({
        transactionType: 'PMD_personal_details',
    });
}
exports.up = up;
async function down(knex) {
    await knex('transaction_types')
        .where({
        transactionType: 'PMD_personal_details',
    })
        .del();
}
exports.down = down;
//# sourceMappingURL=20211104120937_add_pmd_personal_details_transaction_type.js.map