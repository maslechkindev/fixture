"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .alterTable('contest_instance_participants', (table) => {
        table.boolean('isExcluded').defaultTo(false);
    });
}
exports.up = up;
async function down(knex) { }
exports.down = down;
//# sourceMappingURL=20220704111107_add_isExcluded_field.js.map