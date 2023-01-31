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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_service_1 = require("../../modules/user-management/auth/firebase/firebase.auth.service");
const helpers_1 = require("../../modules/user-management/auth/helpers");
const auth_service_1 = require("./auth.service");
let OptionalAuthMiddleware = class OptionalAuthMiddleware {
    constructor(firebaseAuthService, authMiddlewareService) {
        this.firebaseAuthService = firebaseAuthService;
        this.authMiddlewareService = authMiddlewareService;
    }
    async use(req, res, next) {
        const token = (0, helpers_1.extractToken)(req);
        const user = await this.firebaseAuthService.verifyIdToken(token);
        res.locals.user = user
            ? await this.authMiddlewareService.getUserById(user.userId)
            : null;
        return next();
    }
};
OptionalAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_auth_service_1.FirebaseAuthService,
        auth_service_1.AuthMiddlewareService])
], OptionalAuthMiddleware);
exports.OptionalAuthMiddleware = OptionalAuthMiddleware;
//# sourceMappingURL=optionalAuth.middleware.js.map