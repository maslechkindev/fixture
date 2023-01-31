"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    const { id: finishedStatusId } = await knex('contest_instance_statuses')
        .first('id')
        .where({ status: 'finished' });
    const { id: cancelledStatusId } = await knex('contest_instance_statuses')
        .first('id')
        .where({ status: 'cancelled' });
    await knex('contest_instances')
        .update({ endTime: knex.raw(`"createdAt" + INTERVAL '20 minutes'`) })
        .whereIn('status', [cancelledStatusId, finishedStatusId])
        .andWhere(function () {
        this.where('endTime', null).orWhereRaw(`"endTime" - "createdAt" > INTERVAL '1 day'`);
    });
}
exports.up = up;
async function down() {
    return;
}
exports.down = down;
//# sourceMappingURL=20220519064111_add_contest_instance_end_time.js.map