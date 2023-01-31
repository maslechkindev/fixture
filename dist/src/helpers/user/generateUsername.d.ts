import { Knex } from 'modules/integrations/knex';
export declare const USERNAMES_MAX_COUNT_PER_PREFIX = 9999;
export declare const getCountUsernames: (knex: Knex) => Promise<number>;
export declare const getUpdatePrefixCount: (knex: Knex) => Promise<{
    prefix: string;
    count: number;
}>;
export declare const checkIsUsed: (knex: Knex, username: string) => Promise<{
    username: string;
}[]>;
declare const _default: (knex: Knex) => Promise<string>;
export default _default;
