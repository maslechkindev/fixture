"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const competitionsData = [
    {
        competitionId: '178323483818774528',
        sportId: '5',
        name: 'NCAA 2022/2023',
        templateId: '79',
        version: 1,
    },
    {
        competitionId: '171359043867168768',
        sportId: '5',
        name: 'NFL 2022/2023',
        templateId: '15',
        version: 2,
    },
];
async function up(knex) {
    await knex('competitions').insert(competitionsData);
}
exports.up = up;
async function down() {
    return;
}
exports.down = down;
//# sourceMappingURL=20220830105517_nfl-ncaaf.js.map