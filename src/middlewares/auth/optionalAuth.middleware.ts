import { Injectable, NestMiddleware } from '@nestjs/common';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { NextFunction, Request, Response } from 'express';
import { extractToken } from '../../modules/user-management/auth/helpers';
import { AuthMiddlewareService } from './auth.service';

@Injectable()
export class OptionalAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private readonly authMiddlewareService: AuthMiddlewareService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = extractToken(req);
    const user = await this.firebaseAuthService.verifyIdToken(token);
    res.locals.user = user
      ? await this.authMiddlewareService.getUserById(user.userId)
      : null;
    return next();
  }
}
