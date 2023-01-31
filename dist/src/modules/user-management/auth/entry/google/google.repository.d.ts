import { Knex } from 'modules/integrations/knex';
import { SaveUserAndCreateAccountType, GoogleAccountType, UserAccountType } from './types/google.interfaces';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class GoogleSSORepository {
    private readonly knex;
    constructor(knex: Knex);
    getAccountById(id: string): Promise<GoogleAccountType>;
    saveUserAndCreateAccount(transactionManager: TransactionManagerService, userData: UserAccountType & {
        username?: string;
    }, googleAccountData: GoogleAccountType): Promise<SaveUserAndCreateAccountType>;
}
