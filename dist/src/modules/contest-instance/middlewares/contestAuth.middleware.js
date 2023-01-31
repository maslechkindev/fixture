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
exports.ContestInstanceRegistrationAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../../helpers/errors");
const auth_middleware_1 = require("../../../middlewares/auth/auth.middleware");
const auth_service_1 = require("../../../middlewares/auth/auth.service");
const firebase_auth_service_1 = require("../../user-management/auth/firebase/firebase.auth.service");
let ContestInstanceRegistrationAuthMiddleware = class ContestInstanceRegistrationAuthMiddleware extends auth_middleware_1.AuthMiddleware {
    constructor(firebaseAuthService, authMiddlewareService) {
        super(firebaseAuthService, authMiddlewareService);
        this.setNotLoggedInExceptionBody(errors_1.ERRORS.CONTEST.NOT_AUTHORIZED_TO_ENTER);
    }
};
ContestInstanceRegistrationAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_auth_service_1.FirebaseAuthService,
        auth_service_1.AuthMiddlewareService])
], ContestInstanceRegistrationAuthMiddleware);
exports.ContestInstanceRegistrationAuthMiddleware = ContestInstanceRegistrationAuthMiddleware;
//# sourceMappingURL=contestAuth.middleware.js.map