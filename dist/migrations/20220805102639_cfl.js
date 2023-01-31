"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const competitionsData = [
    {
        competitionId: '168907624618708992',
        sportId: '5',
        name: 'CFL 2022',
        version: 2,
        templateId: '9293257581424640',
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
//# sourceMappingURL=20220805102639_cfl.js.map