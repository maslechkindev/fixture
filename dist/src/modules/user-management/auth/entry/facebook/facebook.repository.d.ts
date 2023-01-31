import { Knex } from 'modules/integrations/knex';
import { FacebookAccountInterface } from './types/facebook.interfaces';
import { User } from 'interfaces/user.interface';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class FacebookSSORepository {
    private readonly knex;
    constructor(knex: Knex);
    getAccountById(id: string): Promise<FacebookAccountInterface>;
    saveUserAndCreateAccount(transactionManager: TransactionManagerService, userData: Partial<User>, facebookAccountData: {
        fbAccountId: string;
    }): Promise<Partial<User>>;
}
