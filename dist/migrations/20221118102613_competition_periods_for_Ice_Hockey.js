"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const periodsData = [
    {
        name: 'Whole Match',
        orderNum: 1,
        isDrawPossible: false,
        version: 1,
        periodId: '40',
    },
    {
        name: 'Ordinary Time',
        orderNum: 1,
        isDrawPossible: true,
        version: 1,
        parentId: '40',
        periodId: '41',
    },
    {
        name: '1st Period',
        orderNum: 1,
        isDrawPossible: true,
        version: 1,
        parentId: '41',
        periodId: '43',
    },
    {
        name: '2nd Period',
        orderNum: 3,
        isDrawPossible: true,
        version: 1,
        parentId: '41',
        periodId: '44',
    },
    {
        name: '3rd Period',
        orderNum: 5,
        isDrawPossible: true,
        version: 1,
        parentId: '41',
        periodId: '45',
    },
    {
        name: 'Rest of Ordinary Time',
        orderNum: 6,
        isDrawPossible: true,
        version: 1,
        parentId: '41',
        periodId: '604',
    },
    {
        name: '1st Intermission',
        orderNum: 2,
        version: 2,
        parentId: '41',
        periodId: '629',
    },
    {
        name: '2nd Intermission',
        orderNum: 4,
        version: 2,
        parentId: '41',
        periodId: '630',
    },
    {
        name: 'Overtime',
        orderNum: 3,
        isDrawPossible: false,
        version: 1,
        parentId: '40',
        periodId: '42',
    },
    {
        name: 'Overtime Excluding Penalty Round',
        orderNum: 1,
        isDrawPossible: true,
        version: 1,
        parentId: '42',
        periodId: '527',
    },
    {
        name: 'Penalty Round',
        orderNum: 3,
        isDrawPossible: false,
        version: 1,
        parentId: '42',
        periodId: '528',
    },
    {
        name: 'Extratime Over',
        orderNum: 2,
        version: 2,
        parentId: '42',
        periodId: '665',
    },
    {
        name: 'Rest of Match',
        orderNum: 4,
        isDrawPossible: true,
        version: 1,
        parentId: '40',
        periodId: '498',
    },
    {
        name: 'Ordinary Time Over',
        orderNum: 2,
        version: 2,
        parentId: '40',
        periodId: '664',
    },
];
async function up(knex) {
    await knex('periods').insert(periodsData);
}
exports.up = up;
async function down(knex) {
    await knex('periods')
        .whereIn('periodId', periodsData.map((d) => d.periodId))
        .del();
}
exports.down = down;
//# sourceMappingURL=20221118102613_competition_periods_for_Ice_Hockey.js.map