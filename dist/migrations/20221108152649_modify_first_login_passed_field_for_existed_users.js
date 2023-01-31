"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('users')
        .where('users.confirmedAt', 'is not', null)
        .update({ firstLoginPassed: true });
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20221108152649_modify_first_login_passed_field_for_existed_users.js.map