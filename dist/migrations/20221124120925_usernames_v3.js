"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('usernames').where('prefix', 'shooter').del();
}
exports.up = up;
async function down(knex) {
    await knex('usernames').insert({
        prefix: 'shooter',
        active: true,
        count: 0,
    });
}
exports.down = down;
//# sourceMappingURL=20221124120925_usernames_v3.js.map