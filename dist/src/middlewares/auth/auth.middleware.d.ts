import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedExceptionBody } from 'helpers/errors';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { AuthMiddlewareService } from './auth.service';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly firebaseAuthService;
    readonly authMiddlewareService: AuthMiddlewareService;
    private notLoggedInExceptionBody;
    constructor(firebaseAuthService: FirebaseAuthService, authMiddlewareService: AuthMiddlewareService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    protected setNotLoggedInExceptionBody(exceptionBody: UnauthorizedExceptionBody): void;
}
