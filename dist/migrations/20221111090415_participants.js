"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const participants = require('./20221111090415_participants.json');
async function up(knex) {
    await knex
        .insert(participants)
        .onConflict(['participantId'])
        .merge(['name', 'version'])
        .into('participants');
}
exports.up = up;
async function down(knex) {
}
exports.down = down;
//# sourceMappingURL=20221111090415_participants.js.map