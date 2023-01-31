import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from '../../../ancillary/transaction-manager/transaction-manager.service';
export declare class SettingsRepository {
    private readonly knex;
    constructor(knex: Knex);
    updateNotifications(id: string, notificationsEnabled: boolean, neccessaryFields: Array<string>): Promise<any[]>;
    deactivateAccount(txManager: TransactionManagerService, id: string): Promise<void>;
}
