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
exports.FacebookSSOService = void 0;
const common_1 = require("@nestjs/common");
const entry_service_1 = require("../entry.service");
const userStatus_1 = require("../../../../../enums/userStatus");
const facebook_repository_1 = require("./facebook.repository");
const facebook_api_service_1 = require("./facebook-api.service");
const errors_1 = require("../../../../../helpers/errors");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
const user_interface_1 = require("../../../../../interfaces/user.interface");
let FacebookSSOService = class FacebookSSOService {
    constructor(entryService, facebookSSORepository, facebookAPIService, transactionManager) {
        this.entryService = entryService;
        this.facebookSSORepository = facebookSSORepository;
        this.facebookAPIService = facebookAPIService;
        this.transactionManager = transactionManager;
    }
    async createUser(email, emailFromToken, fbAccountId, referralCode, presettedUserData) {
        const isUsedEmail = await this.entryService.isEmailUsed(email);
        if (isUsedEmail) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_USED);
        }
        const { id } = await this.saveUserAndCreateAccount(email, fbAccountId, referralCode, presettedUserData);
        return id;
    }
    async getInfoFromIdToken(access_token) {
        return await this.getUserInfoWithToken(access_token);
    }
    async validateAccessToken(access_token) {
        return this.facebookAPIService.validateAccessToken(access_token);
    }
    async getUserInfoWithToken(access_token) {
        return this.facebookAPIService.getUserInfoWithToken(access_token);
    }
    getFacebookAccount(id) {
        return this.facebookSSORepository.getAccountById(id);
    }
    async saveUserAndCreateAccount(email, fbAccountId, referralCode, presettedUserData) {
        const { promoCode, referralLink } = await this.entryService.createReferralLink();
        const status = userStatus_1.userStatus.NOT_CONFIRMED;
        const txManager = await this.transactionManager.begin();
        try {
            const userData = await this.facebookSSORepository.saveUserAndCreateAccount(txManager, Object.assign({ email,
                promoCode,
                status,
                referralLink }, presettedUserData), { fbAccountId });
            await this.entryService.setupUser(txManager, userData.id, userData.notificationsEnabled, status, referralCode, userData);
            await txManager.commit();
            return userData;
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
    async retrieveExistingUser(platformId) {
        const account = await this.facebookSSORepository.getAccountById(platformId);
        if (account && account.userId) {
            const user = await this.entryService.getUserById(account.userId);
            return user;
        }
        return null;
    }
};
FacebookSSOService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        facebook_repository_1.FacebookSSORepository,
        facebook_api_service_1.FacebookAPIService,
        transaction_manager_service_1.TransactionManager])
], FacebookSSOService);
exports.FacebookSSOService = FacebookSSOService;
//# sourceMappingURL=facebook.service.js.map