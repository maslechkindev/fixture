"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.string('firstName').defaultTo('');
        table.string('lastName').defaultTo('');
        table.date('dateOfBirth');
        table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now(6));
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('users', (table) => {
        table.dropColumn('firstName');
        table.dropColumn('lastName');
        table.dropColumn('dateOfBirth');
        table.dropColumn('createdAt');
    });
}
exports.down = down;
//# sourceMappingURL=20211104081943_user_table_add_personal_details_fields.js.map