import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from '../../ancillary/transaction-manager/transaction-manager.service';
export declare class CancelContestInstanceRepository {
    private readonly knex;
    constructor(knex: Knex);
    setContestInstanceStatusCancel(txManager: TransactionManagerService, contestInstanceId: string, endTime: Date): Promise<void>;
}
