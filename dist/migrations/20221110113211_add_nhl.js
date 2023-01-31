"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sportsData = [
    {
        sportId: '6',
        name: 'Ice Hockey',
        version: 0,
    },
];
const competitionsData = [
    {
        competitionId: '179060452093906944',
        sportId: '6',
        name: 'NHL',
        templateId: '225',
        version: 1,
    },
];
async function up(knex) {
    await knex('sports').insert(sportsData);
    await knex('competitions').insert(competitionsData);
}
exports.up = up;
async function down() {
    return;
}
exports.down = down;
//# sourceMappingURL=20221110113211_add_nhl.js.map