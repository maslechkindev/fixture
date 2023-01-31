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
exports.ChangePasswordService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const tokens_service_1 = require("../../../integrations/firebase/messages/tokens/tokens.service");
const events_service_1 = require("../../../integrations/firebase/messages/events/events.service");
const types_1 = require("../../../integrations/firebase/messages/types");
const change_password_repository_1 = require("./change-password.repository");
const auth_1 = require("../../../../helpers/auth");
const errors_1 = require("../../../../helpers/errors");
const firebase_auth_service_1 = require("../../auth/firebase/firebase.auth.service");
const user_interface_1 = require("../../../../interfaces/user.interface");
let ChangePasswordService = class ChangePasswordService {
    constructor(profileRepository, firebaseAuthService, tokensService, eventsService) {
        this.profileRepository = profileRepository;
        this.firebaseAuthService = firebaseAuthService;
        this.tokensService = tokensService;
        this.eventsService = eventsService;
    }
    async checkPassword(user, password) {
        const { passwordHash, salt } = user;
        const isCorrect = await (0, auth_1.verify)(password, passwordHash, salt);
        return isCorrect;
    }
    async changePassword(userId, password, initiatorFcmToken) {
        const passwordHistory = await this.profileRepository.getPreviousPasswords(userId);
        if (passwordHistory && Array.isArray(passwordHistory)) {
            await Promise.all(passwordHistory.map(async ({ passwordHash, salt }) => {
                const hash = await (0, auth_1.getPasswordHash)(password, salt);
                if (hash === passwordHash) {
                    throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.CHANGE_PASSWORD.USER_PREVIOUS_PASSWORD);
                }
            }));
        }
        try {
            await this.firebaseAuthService.revokeRefreshTokens(userId);
            await this.sendPasswordChangeEventToUserDevices(userId, initiatorFcmToken);
            const salt = (0, auth_1.generateRandomBytes)();
            const passwordHash = await (0, auth_1.getPasswordHash)(password, salt);
            await this.profileRepository.changePassword(userId, passwordHash, salt);
            return await this.firebaseAuthService.issueCustomToken(userId);
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException();
        }
    }
    async sendPasswordChangeEventToUserDevices(userId, initiatorFcmToken) {
        const fcmTokensToOmit = initiatorFcmToken ? [initiatorFcmToken] : [];
        const userFcmTokens = await this.tokensService.getUserTokens(userId, fcmTokensToOmit);
        if (!R.isEmpty(userFcmTokens))
            await this.eventsService.send({
                eventType: types_1.EventType.DATA_MESSAGE,
                messageType: types_1.MessageType.PASSWORD_CHANGE,
            }, { fcmTokensToSend: userFcmTokens, notStoreEvent: true });
    }
};
ChangePasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [change_password_repository_1.ChangePasswordRepository,
        firebase_auth_service_1.FirebaseAuthService,
        tokens_service_1.TokensService,
        events_service_1.EventsService])
], ChangePasswordService);
exports.ChangePasswordService = ChangePasswordService;
//# sourceMappingURL=change-password.service.js.map