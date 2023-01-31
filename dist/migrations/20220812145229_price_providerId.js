"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('prices', (table) => {
        table.string('providerId').nullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('prices', (table) => {
        table.dropColumn('providerId');
    });
}
exports.down = down;
//# sourceMappingURL=20220812145229_price_providerId.js.map