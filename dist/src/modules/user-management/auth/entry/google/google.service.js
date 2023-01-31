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
exports.GoogleSSOService = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const entry_service_1 = require("../entry.service");
const config_1 = require("../../../../../config");
const userStatus_1 = require("../../../../../enums/userStatus");
const google_repository_1 = require("./google.repository");
const errors_1 = require("../../../../../helpers/errors");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const { CLIENT_ID } = config_1.default.SSO.GOOGLE;
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
let GoogleSSOService = class GoogleSSOService {
    constructor(entryService, googleSSORepository, transactionManager) {
        this.entryService = entryService;
        this.googleSSORepository = googleSSORepository;
        this.transactionManager = transactionManager;
    }
    async getInfoFromIdToken(token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            return payload;
        }
        catch (error) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.GOOGLE_SPECIFIC.UNPROCESSABLE_TOKEN);
        }
    }
    getGoogleAccount(id) {
        return this.googleSSORepository.getAccountById(id);
    }
    async saveUserAndCreateAccount({ email }, googleAccountData, referralCode, presettedUserData) {
        const status = userStatus_1.userStatus.CONFIRMED;
        const { promoCode, referralLink } = await this.entryService.createReferralLink();
        const txManager = await this.transactionManager.begin();
        try {
            const userData = await this.googleSSORepository.saveUserAndCreateAccount(txManager, Object.assign({ email,
                promoCode,
                status,
                referralLink }, presettedUserData), googleAccountData);
            await this.entryService.setupUser(txManager, userData.userId, userData.notificationsEnabled, status, referralCode, userData);
            await txManager.commit();
            return userData;
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
    async retrieveExistingUser(platformId) {
        const account = await this.googleSSORepository.getAccountById(platformId);
        if (account && account.userId) {
            const user = await this.entryService.getUserById(account.userId);
            return user;
        }
        return null;
    }
};
GoogleSSOService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        google_repository_1.GoogleSSORepository,
        transaction_manager_service_1.TransactionManager])
], GoogleSSOService);
exports.GoogleSSOService = GoogleSSOService;
//# sourceMappingURL=google.service.js.map