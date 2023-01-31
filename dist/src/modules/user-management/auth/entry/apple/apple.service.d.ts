import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { AppleSSORepository } from './apple.repository';
import AppleIdData from './interfaces/appleData.interface';
import AppleAccount from './interfaces/appleAccount.interface';
import { User } from 'interfaces/user.interface';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class AppleSSOService {
    private entryService;
    private appleSSORepository;
    private transactionManager;
    constructor(entryService: EntryService, appleSSORepository: AppleSSORepository, transactionManager: TransactionManager);
    getInfoFromIdToken(access_token: string): Promise<Partial<AppleIdData>>;
    createUser(email: string, appleAccountId: string, confirmed: boolean, referralCode: string, presettedData: Partial<User>): Promise<string>;
    getAppleAccount(id: string): Promise<AppleAccount>;
    saveUserAndCreateAccount(email: string, appleAccountId: string, confirmed: boolean, referralCode: string, presettedData: Partial<User>): Promise<Partial<User>>;
    retrieveExistingUser(platformId: string): Promise<User | null>;
}
