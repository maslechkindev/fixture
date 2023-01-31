"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').createTable('payments', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('status').notNullable();
        table.uuid('userId').notNullable();
        table.timestamp('createdAt').notNullable();
        table.timestamp('updatedAt');
        table.string('paymentType').notNullable();
        table.jsonb('meta');
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').dropTable('payments');
}
exports.down = down;
//# sourceMappingURL=20220526081506_add_payments_table.js.map