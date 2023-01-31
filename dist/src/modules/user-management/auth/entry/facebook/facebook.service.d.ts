import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { FacebookAccountInterface } from './types/facebook.interfaces';
import { FacebookSSORepository } from './facebook.repository';
import { DebugTokenResponseDTO } from './dto/debugTokenResponse.dto';
import { UserInfoResponseDTO } from './dto/userInfoResponse.dto';
import { FacebookAPIService } from './facebook-api.service';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { User } from 'interfaces/user.interface';
export declare class FacebookSSOService {
    private entryService;
    private facebookSSORepository;
    private facebookAPIService;
    private transactionManager;
    constructor(entryService: EntryService, facebookSSORepository: FacebookSSORepository, facebookAPIService: FacebookAPIService, transactionManager: TransactionManager);
    createUser(email: string, emailFromToken: boolean, fbAccountId: string, referralCode: string, presettedUserData: Partial<User>): Promise<string>;
    getInfoFromIdToken(access_token: string): Promise<UserInfoResponseDTO>;
    validateAccessToken(access_token: string): Promise<DebugTokenResponseDTO>;
    getUserInfoWithToken(access_token: string): Promise<UserInfoResponseDTO>;
    getFacebookAccount(id: string): Promise<FacebookAccountInterface>;
    saveUserAndCreateAccount(email: string, fbAccountId: string, referralCode: string, presettedUserData: Partial<User>): Promise<FacebookAccountInterface>;
    retrieveExistingUser(platformId: string): Promise<User | null>;
}
