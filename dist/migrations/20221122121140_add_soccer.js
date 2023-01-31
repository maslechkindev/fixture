"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sportsData = [
    {
        sportId: '1',
        name: 'Soccer',
        version: 0,
    },
];
const competitionsData = [
    {
        competitionId: '167295494182195200',
        name: 'FIFA World Cup, Group B 2022',
        version: 2,
        templateId: '8816',
        sportId: '1',
    },
    {
        competitionId: '167295427294580736',
        name: 'FIFA World Cup, Group A 2022',
        version: 5,
        templateId: '8815',
        sportId: '1',
    },
    {
        competitionId: '167295841648824320',
        name: 'FIFA World Cup, Group H 2022',
        version: 1,
        templateId: '8822',
        sportId: '1',
    },
    {
        competitionId: '167295681134907648',
        name: 'FIFA World Cup, Group D 2022',
        version: 1,
        templateId: '8818',
        sportId: '1',
    },
    {
        competitionId: '167295545558224896',
        name: 'FIFA World Cup, Group C 2022',
        version: 1,
        templateId: '8817',
        sportId: '1',
    },
    {
        competitionId: '167295803317080064',
        name: 'FIFA World Cup, Group G 2022',
        version: 1,
        templateId: '8821',
        sportId: '1',
    },
    {
        competitionId: '167295715233550336',
        name: 'FIFA World Cup, Group E 2022',
        version: 1,
        templateId: '8819',
        sportId: '1',
    },
    {
        competitionId: '167295757603360768',
        name: 'FIFA World Cup, Group F 2022',
        version: 1,
        templateId: '8820',
        sportId: '1',
    },
];
const periodsData = [
    {
        name: 'Whole Match',
        orderNum: 1,
        periodId: '2',
        isDrawPossible: false,
        version: 2,
    },
    {
        name: 'Ordinary Time',
        orderNum: 1,
        periodId: '3',
        parentId: '2',
        isDrawPossible: true,
        version: 1,
    },
    {
        name: 'Overtime',
        orderNum: 3,
        periodId: '4',
        parentId: '2',
        isDrawPossible: false,
        version: 2,
    },
    {
        name: '1st Half (Ordinary Time)',
        orderNum: 1,
        periodId: '5',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '2nd Half (Ordinary Time)',
        orderNum: 3,
        periodId: '6',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: 'Penalty Round',
        orderNum: 3,
        periodId: '9',
        parentId: '4',
        isDrawPossible: false,
        version: 2,
    },
    {
        name: 'Rest of Match',
        orderNum: 4,
        periodId: '494',
        parentId: '2',
        isDrawPossible: true,
        version: 1,
    },
    {
        name: 'Overtime Excluding Penalty Round',
        orderNum: 1,
        periodId: '524',
        parentId: '4',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '1st Half (Overtime)',
        orderNum: 1,
        periodId: '525',
        parentId: '524',
        isDrawPossible: true,
        version: 2,
    },
    {
        name: '2nd Half (Overtime)',
        orderNum: 3,
        periodId: '526',
        parentId: '524',
        isDrawPossible: true,
        version: 2,
    },
    {
        name: 'Rest of 1st Half',
        orderNum: 1,
        periodId: '534',
        parentId: '5',
        isDrawPossible: true,
        version: 1,
    },
    {
        name: 'Rest of 2nd Half',
        orderNum: 1,
        periodId: '535',
        parentId: '6',
        isDrawPossible: true,
        version: 1,
    },
    {
        name: 'Rest of Overtime Excluding Penalty Round',
        orderNum: 4,
        periodId: '573',
        parentId: '524',
        isDrawPossible: true,
        version: 1,
    },
    {
        name: 'Rest of Ordinary Time',
        orderNum: 12,
        periodId: '602',
        parentId: '3',
        isDrawPossible: true,
        version: 5,
    },
    {
        name: 'Halftime',
        orderNum: 2,
        periodId: '621',
        parentId: '3',
        version: 4,
    },
    {
        name: 'Halftime (Overtime)',
        orderNum: 2,
        periodId: '622',
        parentId: '524',
        version: 2,
    },
    {
        name: 'Ordinary Time Over',
        orderNum: 2,
        periodId: '623',
        parentId: '2',
        version: 2,
    },
    {
        name: 'Extratime Over',
        orderNum: 2,
        periodId: '624',
        parentId: '4',
        version: 2,
    },
    {
        name: '1 - 10 Minutes',
        orderNum: 4,
        periodId: '790',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '11 - 20 Minutes',
        orderNum: 5,
        periodId: '791',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '21 - 30 Minutes',
        orderNum: 6,
        periodId: '792',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '31 - 40 Minutes',
        orderNum: 7,
        periodId: '793',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '41 - 50 Minutes',
        orderNum: 8,
        periodId: '794',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '51 - 60 Minutes',
        orderNum: 9,
        periodId: '795',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '61 - 70 Minutes',
        orderNum: 10,
        periodId: '796',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
    {
        name: '71 - 80 Minutes',
        orderNum: 11,
        periodId: '797',
        parentId: '3',
        isDrawPossible: true,
        version: 3,
    },
];
async function up(knex) {
    await knex('sports').insert(sportsData);
    await knex('competitions').insert(competitionsData);
    await knex('periods').insert(periodsData);
}
exports.up = up;
async function down(knex) {
    await knex('competitions').whereIn('templateId', competitionsData.map(c => c.templateId)).del();
    await knex('sports').where('sportId', '1').del();
    await knex('periods').whereIn('periodId', periodsData.map(p => p.periodId)).del();
}
exports.down = down;
//# sourceMappingURL=20221122121140_add_soccer.js.map