"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.integer('order').defaultTo(0).notNullable();
        table.integer('paramParticipant');
        table.string('paramParticipantId1');
        table.decimal('paramFloat1', 20, 8);
        table.string('paramString1');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.dropColumn('order');
        table.dropColumn('paramParticipant');
        table.dropColumn('paramParticipantId1');
        table.dropColumn('paramFloat1');
        table.dropColumn('paramString1');
    });
}
exports.down = down;
//# sourceMappingURL=20220516113954_markets_order_field.js.map