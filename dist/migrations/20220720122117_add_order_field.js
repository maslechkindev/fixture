"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.integer('order');
    });
    let offset = 0;
    const [{ count }] = await knex('fixtures').count('fixtureId');
    while (offset !== Number.parseInt(count, 10)) {
        const { fixtureId } = await knex('fixtures')
            .first('fixtureId')
            .offset(offset);
        const contests = await knex
            .select('*')
            .from('contests')
            .where({ fixtureId })
            .orderBy('createdAt', 'asc');
        if (!contests.length) {
            offset++;
            continue;
        }
        const promiseArray = contests.map((el, index) => {
            const orderValue = index + 1;
            return knex('contests')
                .update({ order: orderValue })
                .where('id', '=', el.id);
        });
        await Promise.all(promiseArray);
        offset++;
    }
}
exports.up = up;
async function down(knex) {
    await knex.schema.withSchema('public').alterTable('contests', (table) => {
        table.dropColumn('order');
    });
}
exports.down = down;
//# sourceMappingURL=20220720122117_add_order_field.js.map