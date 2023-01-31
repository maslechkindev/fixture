import { Knex } from 'modules/integrations/knex';
import { Knex as KnexNamespace } from 'knex';
export declare type TransactionManagerService = {
    knex: Knex;
    transaction: KnexNamespace.Transaction;
    commit: KnexNamespace.Transaction['commit'];
    rollback: KnexNamespace.Transaction['rollback'];
};
export declare class TransactionManager {
    private readonly knex;
    constructor(knex: Knex);
    begin(): Promise<TransactionManagerService>;
}
