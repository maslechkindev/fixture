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
exports.FirebaseAuthService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_service_1 = require("../../../integrations/firebase/admin/firebase-admin.service");
let FirebaseAuthService = class FirebaseAuthService {
    constructor(firebaseAdminService) {
        this.firebaseAdminService = firebaseAdminService;
    }
    issueCustomToken(userId) {
        return this.firebaseAdminService.firebase.auth().createCustomToken(userId);
    }
    async verifyIdToken(idToken) {
        try {
            const data = await this.firebaseAdminService.firebase
                .auth()
                .verifyIdToken(idToken, true);
            if (data && data.uid) {
                return {
                    userId: data.uid,
                };
            }
            return undefined;
        }
        catch (_a) {
            return undefined;
        }
    }
    async revokeRefreshTokens(uid) {
        try {
            const user = await this.firebaseAdminService.firebase.auth().getUser(uid);
            if (user) {
                this.firebaseAdminService.firebase.auth().revokeRefreshTokens(uid);
            }
        }
        catch (err) {
            if (err.code !== 'auth/user-not-found') {
                throw err;
            }
        }
    }
};
FirebaseAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_admin_service_1.FirebaseAdminService])
], FirebaseAuthService);
exports.FirebaseAuthService = FirebaseAuthService;
//# sourceMappingURL=firebase.auth.service.js.map