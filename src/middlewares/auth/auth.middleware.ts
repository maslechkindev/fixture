import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  UnauthorizedExceptionCustom,
  ERRORS,
  UnauthorizedExceptionBody,
} from 'helpers/errors';

import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';

import { extractToken } from 'modules/user-management/auth/helpers';
import { AuthMiddlewareService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private notLoggedInExceptionBody: UnauthorizedExceptionBody =
    ERRORS.AUTH.NOT_LOGGED_IN;

  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    @Inject(AuthMiddlewareService)
    readonly authMiddlewareService: AuthMiddlewareService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = extractToken(req);
    const isUserNotLoggedIn = !token;
    if (isUserNotLoggedIn) {
      throw new UnauthorizedExceptionCustom(this.notLoggedInExceptionBody);
    }
    const user = await this.firebaseAuthService.verifyIdToken(token);
    if (!user) {
      throw new UnauthorizedExceptionCustom(ERRORS.AUTH.UNAUTHORIZED);
    }

    const userData = await this.authMiddlewareService.getUserById(user.userId);
    if (!userData) {
      throw new UnauthorizedExceptionCustom(ERRORS.AUTH.UNAUTHORIZED);
    }

    res.locals.user = userData;
    return next();
  }

  protected setNotLoggedInExceptionBody(
    exceptionBody: UnauthorizedExceptionBody,
  ) {
    this.notLoggedInExceptionBody = exceptionBody;
  }
}
