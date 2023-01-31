"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema
        .withSchema('public')
        .createTable('registration_rewards', (table) => {
        table
            .uuid('rewardsId')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.integer('registrationNotReferred').notNullable();
        table.integer('registrationReferred').notNullable();
        table.integer('registrationReferredHolder').notNullable();
        table.integer('updatedBy').notNullable();
        table.timestamp('updatedAt').defaultTo('now()');
    });
    return knex('registration_rewards').insert({
        registrationNotReferred: 0,
        registrationReferred: 0,
        registrationReferredHolder: 0,
        updatedBy: 1,
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTable('registration_rewards');
}
exports.down = down;
//# sourceMappingURL=20211013120515_registration_rewards.js.map