"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('sports', (table) => {
        table.string('sportIcon');
    });
    await knex('sports')
        .update({
        sportIcon: 'https://storage.googleapis.com/sp-dev-b1/sport-icons/basketball.svg',
    })
        .where({ sportId: '8' });
    await knex('sports')
        .update({
        sportIcon: 'https://storage.googleapis.com/sp-dev-b1/sport-icons/american-football.svg',
    })
        .where({ sportId: '5' });
}
exports.up = up;
async function down(knex) {
    knex.schema.withSchema('public').alterTable('sports', (table) => {
        table.dropColumn('sportIcon');
    });
}
exports.down = down;
//# sourceMappingURL=20220331102749_add_sport_icon_to_sports_table.js.map