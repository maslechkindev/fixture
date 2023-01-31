import { NestMiddleware } from '@nestjs/common';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { NextFunction, Request, Response } from 'express';
import { AuthMiddlewareService } from './auth.service';
export declare class OptionalAuthMiddleware implements NestMiddleware {
    private readonly firebaseAuthService;
    private readonly authMiddlewareService;
    constructor(firebaseAuthService: FirebaseAuthService, authMiddlewareService: AuthMiddlewareService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
