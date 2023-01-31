import { EntryRepository } from 'modules/user-management/auth/entry/entry.repository';
import { User } from 'interfaces/user.interface';
import { userStatus } from 'enums/userStatus';
import { TransactionManagerService, TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { BalanceService } from 'modules/balance/balance.service';
import { FirebaseDynamicLinksService } from 'modules/integrations/firebase/dynamic-links';
import { FirestoreService } from 'modules/integrations/firebase/firestore/firestore.service';
import { FollowService } from 'modules/user-management/follow/follow.service';
import { MailingService } from 'modules/integrations/mailing';
export declare class EntryService {
    private entryRepository;
    private balanceService;
    private transactionManager;
    private fireStoreService;
    private firebaseDynamicLinksService;
    private followService;
    private mailingClient;
    constructor(entryRepository: EntryRepository, balanceService: BalanceService, transactionManager: TransactionManager, fireStoreService: FirestoreService, firebaseDynamicLinksService: FirebaseDynamicLinksService, followService: FollowService, mailingClient: MailingService);
    userConfirmed(user: User): boolean;
    getPromoCode(): Promise<string>;
    createReferralLink(): Promise<{
        promoCode: string;
        referralLink: string;
    }>;
    getUserByUsername(username: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(userId: string): Promise<User>;
    isEmailUsed(email: string): Promise<boolean>;
    isValidReferralCode(code: string): Promise<boolean>;
    updateUserDataAfterAccountConfirmation(email: string): Promise<User>;
    isUserBanned(userId: string): Promise<boolean>;
    setupUser(txManager: TransactionManagerService, userId: string, userNotificationsEnabledStatus: boolean, status: userStatus, referralCode: string, user: Partial<User>): Promise<void>;
}
