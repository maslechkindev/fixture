import { Knex } from 'knex';
export interface KnexTransaction extends Knex {
    commit: () => Promise<void>;
    rollback: (error?: unknown) => Promise<void>;
}
