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
exports.ForgotPasswordService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const tokens_service_1 = require("../../../../integrations/firebase/messages/tokens/tokens.service");
const events_service_1 = require("../../../../integrations/firebase/messages/events/events.service");
const types_1 = require("../../../../integrations/firebase/messages/types");
const forgot_password_repository_1 = require("./forgot-password.repository");
const auth_1 = require("../../../../../helpers/auth");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const errors_1 = require("../../../../../helpers/errors");
const firebase_auth_service_1 = require("../../firebase/firebase.auth.service");
let ForgotPasswordService = class ForgotPasswordService {
    constructor(forgotPasswordRepository, firebaseAuthService, tokensService, eventsService) {
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.firebaseAuthService = firebaseAuthService;
        this.tokensService = tokensService;
        this.eventsService = eventsService;
    }
    async isBlockedToRestore(email, ip) {
        const minutesBlocked = await this.forgotPasswordRepository.minutesBlocked(email, ip);
        return minutesBlocked;
    }
    async createAndSetToken(email, ip) {
        const token = (0, auth_1.generateRandomBytes)();
        await this.forgotPasswordRepository.setOrUpdateToken(token, email, ip);
        return token;
    }
    async getTokenInfo(token) {
        const tokenInfo = await this.forgotPasswordRepository.getTokenInfo(token);
        return tokenInfo;
    }
    async changePassword(userData, password) {
        const passwordHistory = await this.forgotPasswordRepository.getPreviousPasswords(userData.id);
        if (passwordHistory && Array.isArray(passwordHistory)) {
            await Promise.all(passwordHistory.map(async ({ passwordHash, salt }) => {
                const hash = await (0, auth_1.getPasswordHash)(password, salt);
                if (hash === passwordHash) {
                    throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FORGOT_PASSWORD.USER_PREVIOUS_PASSWORD);
                }
            }));
        }
        try {
            await this.sendPasswordChangeEventToUserDevices(userData.id);
            const salt = (0, auth_1.generateRandomBytes)();
            const passwordHash = await (0, auth_1.getPasswordHash)(password, salt);
            await this.forgotPasswordRepository.changeUserPassword(userData.id, passwordHash, salt);
            return await this.firebaseAuthService.issueCustomToken(userData.id);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException();
        }
    }
    async sendPasswordChangeEventToUserDevices(userId) {
        const userFcmTokens = await this.tokensService.getUserTokens(userId);
        if (!R.isEmpty(userFcmTokens))
            await this.eventsService.send({
                eventType: types_1.EventType.DATA_MESSAGE,
                messageType: types_1.MessageType.PASSWORD_CHANGE,
            }, { fcmTokensToSend: userFcmTokens, notStoreEvent: true });
    }
};
ForgotPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [forgot_password_repository_1.ForgotPasswordRepository,
        firebase_auth_service_1.FirebaseAuthService,
        tokens_service_1.TokensService,
        events_service_1.EventsService])
], ForgotPasswordService);
exports.ForgotPasswordService = ForgotPasswordService;
//# sourceMappingURL=forgot-password.service.js.map