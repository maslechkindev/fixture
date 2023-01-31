"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('force_bets', (table) => {
        table.integer('cmsContestTemplateId').nullable().alter();
        table.jsonb('cmsInfo').nullable();
        table.jsonb('marketTypeId').alter();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.withSchema('public').alterTable('force_bets', (table) => {
        table.integer('cmsContestTemplateId').notNullable().alter();
        table.string('marketTypeId').notNullable().alter();
        table.dropColumn('cmsInfo');
    });
}
exports.down = down;
//# sourceMappingURL=20220725111214_change_cms_template_id_in_force_bets_to_nullable_and_market_type_to_array.js.map