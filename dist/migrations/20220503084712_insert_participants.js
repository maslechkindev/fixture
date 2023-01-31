"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    const participants = require('./20220503084712_participants.json');
    await knex('participants').insert(participants);
}
exports.up = up;
async function down(knex) {
    await knex('participants').del();
}
exports.down = down;
//# sourceMappingURL=20220503084712_insert_participants.js.map