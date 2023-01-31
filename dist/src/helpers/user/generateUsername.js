"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsUsed = exports.getUpdatePrefixCount = exports.getCountUsernames = exports.USERNAMES_MAX_COUNT_PER_PREFIX = void 0;
const knex_1 = require("../../modules/integrations/knex");
const SUFFIX_START = 5555;
const NUMBER_LENGTH = 4;
exports.USERNAMES_MAX_COUNT_PER_PREFIX = 9999;
const getCountUsernames = async (knex) => {
    const [{ max }] = await knex('usernames').select({
        max: knex.raw('COUNT(*)::int'),
    });
    return max;
};
exports.getCountUsernames = getCountUsernames;
const getUpdatePrefixCount = async (knex) => {
    const [{ prefix, count }] = await knex('usernames')
        .update({ count: knex.raw('count + 1'), updated_at: knex.raw('NOW()') })
        .where({
        prefix: knex('usernames')
            .select('prefix')
            .where({
            updated_at: knex('usernames')
                .select(knex.raw('MIN(updated_at)'))
                .where({ active: true })
                .limit(1),
        })
            .limit(1),
    })
        .returning(['prefix', 'count']);
    return { prefix, count };
};
exports.getUpdatePrefixCount = getUpdatePrefixCount;
const checkIsUsed = async (knex, username) => {
    return knex('users').select('username').where({ username });
};
exports.checkIsUsed = checkIsUsed;
exports.default = async (knex) => {
    const max = await (0, exports.getCountUsernames)(knex);
    if (Number.isFinite(max)) {
        for (let i = 0; i < max; i++) {
            try {
                const { prefix, count } = await (0, exports.getUpdatePrefixCount)(knex);
                if (count >= exports.USERNAMES_MAX_COUNT_PER_PREFIX) {
                    continue;
                }
                const finalCount = count + SUFFIX_START;
                const number = finalCount > exports.USERNAMES_MAX_COUNT_PER_PREFIX
                    ? finalCount - exports.USERNAMES_MAX_COUNT_PER_PREFIX
                    : finalCount;
                const username = prefix + number.toString().padStart(NUMBER_LENGTH, '0');
                const used = await (0, exports.checkIsUsed)(knex, username);
                if (used.length > 0) {
                    continue;
                }
                return username;
            }
            catch (err) {
                console.error(err);
                continue;
            }
        }
        throw new Error('Could not generate username');
    }
    throw new Error('Could not get number of prefixes for username generation');
};
//# sourceMappingURL=generateUsername.js.map