import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class DeleteContestInstanceRepository {
    private readonly knex;
    constructor(knex: Knex);
    updateEndTime(contestInstanceId: string, endTime: string, txManager: TransactionManagerService | null): Promise<void>;
}
