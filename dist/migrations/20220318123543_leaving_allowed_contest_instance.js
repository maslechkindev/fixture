"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instances', (table) => {
        table.boolean('leavingAllowed').notNullable().defaultTo(true);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instances', (table) => {
        table.dropColumn('leavingAllowed');
    });
}
exports.down = down;
//# sourceMappingURL=20220318123543_leaving_allowed_contest_instance.js.map