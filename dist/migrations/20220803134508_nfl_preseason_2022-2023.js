"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const competitionsData = [
    {
        competitionId: '178131843476934656',
        sportId: '5',
        name: 'NFL Preseason 2022',
        version: 2,
        templateId: '1101',
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
//# sourceMappingURL=20220803134508_nfl_preseason_2022-2023.js.map