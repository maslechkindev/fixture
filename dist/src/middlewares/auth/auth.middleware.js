"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../helpers/errors");
const firebase_auth_service_1 = require("../../modules/user-management/auth/firebase/firebase.auth.service");
const helpers_1 = require("../../modules/user-management/auth/helpers");
const auth_service_1 = require("./auth.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(firebaseAuthService, authMiddlewareService) {
        this.firebaseAuthService = firebaseAuthService;
        this.authMiddlewareService = authMiddlewareService;
        this.notLoggedInExceptionBody = errors_1.ERRORS.AUTH.NOT_LOGGED_IN;
    }
    async use(req, res, next) {
        const token = (0, helpers_1.extractToken)(req);
        const isUserNotLoggedIn = !token;
        if (isUserNotLoggedIn) {
            throw new errors_1.UnauthorizedExceptionCustom(this.notLoggedInExceptionBody);
        }
        const user = await this.firebaseAuthService.verifyIdToken(token);
        if (!user) {
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED);
        }
        const userData = await this.authMiddlewareService.getUserById(user.userId);
        if (!userData) {
            throw new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED);
        }
        res.locals.user = userData;
        return next();
    }
    setNotLoggedInExceptionBody(exceptionBody) {
        this.notLoggedInExceptionBody = exceptionBody;
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(auth_service_1.AuthMiddlewareService)),
    __metadata("design:paramtypes", [firebase_auth_service_1.FirebaseAuthService,
        auth_service_1.AuthMiddlewareService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map