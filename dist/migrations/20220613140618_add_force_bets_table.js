"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').createTable('force_bets', (table) => {
        table
            .uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('contestId').notNullable();
        table.foreign('contestId').references('contests.id');
        table.integer('durationMin').notNullable();
        table.boolean('isActive').notNullable().defaultTo(true);
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now(6));
        table.string('marketTypeId').notNullable();
        table.integer('betLimit').notNullable();
        table.integer('cmsContestTemplateId').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists('force_bets');
}
exports.down = down;
//# sourceMappingURL=20220613140618_add_force_bets_table.js.map