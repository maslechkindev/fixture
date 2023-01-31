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
exports.AppleSSOService = void 0;
const common_1 = require("@nestjs/common");
const userStatus_1 = require("../../../../../enums/userStatus");
const entry_service_1 = require("../entry.service");
const apple_repository_1 = require("./apple.repository");
const appleIdTokenValidate_1 = require("./helpers/appleIdTokenValidate");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const errors_1 = require("../../../../../helpers/errors");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
let AppleSSOService = class AppleSSOService {
    constructor(entryService, appleSSORepository, transactionManager) {
        this.entryService = entryService;
        this.appleSSORepository = appleSSORepository;
        this.transactionManager = transactionManager;
    }
    async getInfoFromIdToken(access_token) {
        return await (0, appleIdTokenValidate_1.default)(access_token);
    }
    async createUser(email, appleAccountId, confirmed, referralCode, presettedData) {
        const isUsedEmail = await this.entryService.isEmailUsed(email);
        if (isUsedEmail) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.EMAIL_USED);
        }
        const { id: userId } = await this.saveUserAndCreateAccount(email, appleAccountId, confirmed, referralCode, presettedData);
        return userId;
    }
    async getAppleAccount(id) {
        const account = await this.appleSSORepository.getAccountById(id);
        return account;
    }
    async saveUserAndCreateAccount(email, appleAccountId, confirmed, referralCode, presettedData) {
        const { promoCode, referralLink } = await this.entryService.createReferralLink();
        const txManager = await this.transactionManager.begin();
        try {
            const status = confirmed
                ? userStatus_1.userStatus.CONFIRMED
                : userStatus_1.userStatus.NOT_CONFIRMED;
            const userData = await this.appleSSORepository.saveUserAndCreateAccount(txManager, Object.assign({ email,
                promoCode,
                status,
                referralLink }, presettedData), appleAccountId);
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
        const account = await this.appleSSORepository.getAccountById(platformId);
        if (account && account.userId) {
            const user = await this.entryService.getUserById(account.userId);
            return user;
        }
        return null;
    }
};
AppleSSOService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        apple_repository_1.AppleSSORepository,
        transaction_manager_service_1.TransactionManager])
], AppleSSOService);
exports.AppleSSOService = AppleSSOService;
//# sourceMappingURL=apple.service.js.map