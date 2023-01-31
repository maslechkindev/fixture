"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex('usernames')
        .whereIn('prefix', ['segreagate', 'assaulter', 'mauler', 'hurl'])
        .del();
}
exports.up = up;
async function down() {
    return;
}
exports.down = down;
//# sourceMappingURL=20220930133726_username_prefixes.js.map