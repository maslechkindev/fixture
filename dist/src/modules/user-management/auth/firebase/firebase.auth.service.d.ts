import { FirebaseAdminService } from 'modules/integrations/firebase/admin/firebase-admin.service';
export declare class FirebaseAuthService {
    private firebaseAdminService;
    constructor(firebaseAdminService: FirebaseAdminService);
    issueCustomToken(userId: string): Promise<string>;
    verifyIdToken(idToken: string): Promise<{
        userId: string;
    }>;
    revokeRefreshTokens(uid: string): Promise<void>;
}
