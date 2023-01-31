import { TokenPayload } from 'google-auth-library';
import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { GoogleSSORepository } from './google.repository';
import { SaveUserAndCreateAccountType, GoogleAccountType } from './types/google.interfaces';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { User } from 'interfaces/user.interface';
export declare class GoogleSSOService {
    private entryService;
    private googleSSORepository;
    private transactionManager;
    constructor(entryService: EntryService, googleSSORepository: GoogleSSORepository, transactionManager: TransactionManager);
    getInfoFromIdToken(token: string): Promise<TokenPayload>;
    getGoogleAccount(id: string): Promise<GoogleAccountType>;
    saveUserAndCreateAccount({ email }: {
        email: string;
    }, googleAccountData: GoogleAccountType, referralCode: string, presettedUserData: Partial<User>): Promise<SaveUserAndCreateAccountType>;
    retrieveExistingUser(platformId: string): Promise<User | null>;
}
