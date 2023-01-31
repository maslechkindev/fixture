import { AuthMiddleware } from 'middlewares/auth/auth.middleware';
import { AuthMiddlewareService } from 'middlewares/auth/auth.service';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
export declare class ContestInstanceRegistrationAuthMiddleware extends AuthMiddleware {
    constructor(firebaseAuthService: FirebaseAuthService, authMiddlewareService: AuthMiddlewareService);
}
