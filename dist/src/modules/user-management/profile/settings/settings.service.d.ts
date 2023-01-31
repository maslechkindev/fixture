import { SettingsRepository } from './settings.repository';
import { FirestoreService } from 'modules/integrations/firebase/firestore/firestore.service';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { MailingService } from 'modules/integrations/mailing';
export declare class SettingsService {
    private settingsRepository;
    private fireStoreService;
    private transactionManager;
    private firebaseAuthService;
    private mailingClient;
    constructor(settingsRepository: SettingsRepository, fireStoreService: FirestoreService, transactionManager: TransactionManager, firebaseAuthService: FirebaseAuthService, mailingClient: MailingService);
    updateNotifications(userId: string, notificationsEnabled: boolean): Promise<void>;
    deactivateAccount(userId: string, email: string): Promise<void>;
}
