"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const TRANSACTION_DESCRIPTIONS_BY_TYPE = {
    TD_sign_up: 'Tokens Deposit - Sign Up',
    TD_referral_code_sign_up: 'Tokens Deposit - Referral Code Sign Up',
    TD_referral: 'Tokens Deposit - Referral',
    TD_personal_details: 'Tokens Deposit - Personal Details',
    TD_username: 'Tokens Deposit - User Name Change',
    manual: 'Manual transaction',
};
async function up(knex) {
    await Promise.all(Object.entries(TRANSACTION_DESCRIPTIONS_BY_TYPE).map(async ([type, description]) => {
        await knex('transaction_types')
            .where({ transactionType: type })
            .update({ description });
    }));
}
exports.up = up;
async function down(knex) {
    await Promise.all(Object.keys(TRANSACTION_DESCRIPTIONS_BY_TYPE).map(async (type) => {
        await knex('transaction_types')
            .where({ transactionType: type })
            .update({ description: null });
    }));
}
exports.down = down;
//# sourceMappingURL=20220113085044_add_human_readable_description_transaction_types.js.map