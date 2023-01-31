"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.boolean('streamLive').nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('streamLive');
    });
}
exports.down = down;
//# sourceMappingURL=20221108134754_streamLive.js.map