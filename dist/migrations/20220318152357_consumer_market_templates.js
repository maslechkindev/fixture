"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const marketTemplatesData = [
    { name: '2columns' },
    { name: '1columnHomeAway' },
    { name: '1columnEventPart' },
    { name: '1columnPointScored' },
    { name: 'default' },
];
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('market_templates', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name').unique().notNullable();
    });
    await knex('market_templates').insert(marketTemplatesData);
    await knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.uuid('marketTemplateId');
        table.foreign('marketTemplateId').references('market_templates.id');
    });
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.integer('baseOrderNumInMarket').notNullable().defaultTo(0);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('market_lines', (table) => {
        table.dropColumns('baseOrderNumInMarket');
    });
    await knex.schema.withSchema('public').alterTable('markets', (table) => {
        table.dropColumns('marketTemplateId');
    });
    await knex.schema.dropTableIfExists('market_templates');
}
exports.down = down;
//# sourceMappingURL=20220318152357_consumer_market_templates.js.map