"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sportsData = [
    {
        sportId: '5',
        name: 'Am. Football',
        version: 0,
    },
    {
        sportId: '8',
        name: 'Basketball',
        version: 0,
    },
];
const competitionsData = [
    {
        competitionId: '144806779609468928',
        sportId: '5',
        name: 'NCAA Football 2021',
        version: 5,
        templateId: '79',
    },
    {
        competitionId: '145083608899571712',
        sportId: '8',
        name: 'NBA 2021/2022',
        version: 2,
        templateId: '98',
    },
    {
        competitionId: '130685657738694656',
        sportId: '5',
        name: 'NFL 2021/2022',
        version: 2,
        templateId: '15',
    },
    {
        competitionId: '147634345006387200',
        sportId: '8',
        name: 'NCAA Basketball 2021/2022',
        version: 2,
        templateId: '54',
    },
];
const periodsData = [
    {
        name: 'Whole Match',
        orderNum: 1,
        periodId: '60',
        isDrawPossible: false,
        version: 0,
    },
    {
        name: 'Ordinary Time',
        orderNum: 1,
        periodId: '61',
        isDrawPossible: true,
        version: 0,
        parentId: '60',
    },
    {
        name: '1st Half (Ordinary Time)',
        orderNum: 1,
        periodId: '63',
        isDrawPossible: true,
        version: 0,
        parentId: '61',
    },
    {
        name: '1st Quarter',
        orderNum: 1,
        periodId: '65',
        isDrawPossible: true,
        version: 0,
        parentId: '63',
    },
    {
        name: '1st Intermission',
        orderNum: 2,
        periodId: '635',
        version: 1,
        parentId: '63',
    },
    {
        name: '2nd Quarter',
        orderNum: 3,
        periodId: '66',
        isDrawPossible: true,
        version: 0,
        parentId: '63',
    },
    {
        name: 'Halftime',
        orderNum: 2,
        periodId: '637',
        version: 1,
        parentId: '61',
    },
    {
        name: '2nd Half (Ordinary Time)',
        orderNum: 3,
        periodId: '64',
        isDrawPossible: true,
        version: 0,
        parentId: '61',
    },
    {
        name: '3rd Quarter',
        orderNum: 1,
        periodId: '67',
        isDrawPossible: true,
        version: 0,
        parentId: '64',
    },
    {
        name: '3rd Intermission',
        orderNum: 2,
        periodId: '636',
        version: 1,
        parentId: '64',
    },
    {
        name: '4th Quarter',
        orderNum: 3,
        periodId: '68',
        isDrawPossible: true,
        version: 0,
        parentId: '64',
    },
    {
        name: 'Rest of Ordinary Time',
        orderNum: 4,
        periodId: '606',
        isDrawPossible: true,
        version: 0,
        parentId: '61',
    },
    {
        name: 'Ordinary Time Over',
        orderNum: 2,
        periodId: '638',
        version: 1,
        parentId: '60',
    },
    {
        name: 'Overtime',
        orderNum: 3,
        periodId: '62',
        isDrawPossible: false,
        version: 0,
        parentId: '60',
    },
    {
        name: 'Rest of Match',
        orderNum: 4,
        periodId: '500',
        isDrawPossible: true,
        version: 0,
        parentId: '60',
    },
    {
        name: 'Whole Match',
        orderNum: 1,
        periodId: '30',
        isDrawPossible: false,
        version: 0,
    },
    {
        name: 'Ordinary Time',
        orderNum: 1,
        periodId: '31',
        isDrawPossible: true,
        version: 0,
        parentId: '30',
    },
    {
        name: '1st Half (Ordinary Time)',
        orderNum: 1,
        periodId: '33',
        isDrawPossible: true,
        version: 0,
        parentId: '31',
    },
    {
        name: '1st Quarter',
        orderNum: 1,
        periodId: '35',
        isDrawPossible: true,
        version: 0,
        parentId: '33',
    },
    {
        name: '1st Intermission',
        orderNum: 2,
        periodId: '625',
        version: 1,
        parentId: '33',
    },
    {
        name: '2nd Quarter',
        orderNum: 3,
        periodId: '36',
        isDrawPossible: true,
        version: 0,
        parentId: '33',
    },
    {
        name: 'Halftime',
        orderNum: 2,
        periodId: '627',
        version: 1,
        parentId: '31',
    },
    {
        name: '2nd Half (Ordinary Time)',
        orderNum: 3,
        periodId: '34',
        isDrawPossible: true,
        version: 0,
        parentId: '31',
    },
    {
        name: '3rd Quarter',
        orderNum: 1,
        periodId: '37',
        isDrawPossible: true,
        version: 0,
        parentId: '34',
    },
    {
        name: '3rd Intermission',
        orderNum: 2,
        periodId: '626',
        version: 1,
        parentId: '34',
    },
    {
        name: '4th Quarter',
        orderNum: 3,
        periodId: '38',
        isDrawPossible: true,
        version: 0,
        parentId: '34',
    },
    {
        name: 'Rest of Ordinary Time',
        orderNum: 4,
        periodId: '603',
        isDrawPossible: true,
        version: 0,
        parentId: '31',
    },
    {
        name: 'Ordinary Time Over',
        orderNum: 2,
        periodId: '628',
        version: 1,
        parentId: '30',
    },
    {
        name: 'Overtime',
        orderNum: 3,
        periodId: '32',
        isDrawPossible: false,
        version: 0,
        parentId: '30',
    },
    {
        name: 'Rest of Match',
        orderNum: 4,
        periodId: '497',
        isDrawPossible: true,
        version: 0,
        parentId: '30',
    },
];
const fixtureStatusesData = [
    {
        name: 'Pending',
        description: 'The event has not started yet.',
        fixtureStatusId: '1',
        version: 0,
    },
    {
        name: 'In Progress',
        description: 'The event is in progress.',
        fixtureStatusId: '2',
        version: 0,
    },
    {
        name: 'Ended',
        description: 'The event has ended.',
        fixtureStatusId: '3',
        version: 0,
    },
    {
        name: 'Interrupted',
        description: 'The event has been interrupted after start, will continue later.',
        fixtureStatusId: '4',
        version: 0,
    },
    {
        name: 'Canceled',
        description: 'The event has been canceled before start, will not be played later.',
        fixtureStatusId: '5',
        version: 0,
    },
    {
        name: 'Walkover',
        description: 'The event has been canceled before start, will not be played later. A player wins by walkover',
        fixtureStatusId: '6',
        version: 0,
    },
    {
        name: 'Abandoned',
        description: 'The event has been abandoned after start, will not continue.',
        fixtureStatusId: '7',
        version: 0,
    },
    {
        name: 'Retired',
        description: 'The event has been abandoned after start, will not continue. A played has retired.',
        fixtureStatusId: '8',
        version: 0,
    },
];
async function up(knex) {
    await knex('sports').insert(sportsData);
    await knex('competitions').insert(competitionsData);
    await knex('periods').insert(periodsData);
    await knex('fixture_statuses').insert(fixtureStatusesData);
}
exports.up = up;
async function down(knex) {
    await knex('sports').del();
    await knex('competitions').del();
    await knex('periods').del();
    await knex('fixture_statuses').del();
}
exports.down = down;
//# sourceMappingURL=20220216115533_add_consumer_tables_insert_data.js.map