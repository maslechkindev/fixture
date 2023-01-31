"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex('transaction_types').insert({
        transactionType: 'manual',
    });
}
exports.up = up;
async function down() { }
exports.down = down;
//# sourceMappingURL=20211229121941_add_manual_transaction_type.js.map