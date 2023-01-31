import { Knex } from 'modules/integrations/knex';
import AppleAccount from './interfaces/appleAccount.interface';
import { User } from 'interfaces/user.interface';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class AppleSSORepository {
    private readonly knex;
    constructor(knex: Knex);
    getAccountById(id: string): Promise<AppleAccount>;
    saveUserAndCreateAccount(transactionManager: TransactionManagerService, userData: Partial<User>, appleAccountId: string): Promise<Partial<User>>;
}
