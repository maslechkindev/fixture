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
exports.EntryService = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../../../../helpers/auth");
const entry_repository_1 = require("./entry.repository");
const user_interface_1 = require("../../../../interfaces/user.interface");
const userStatus_1 = require("../../../../enums/userStatus");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const balance_service_1 = require("../../../balance/balance.service");
const config_1 = require("../../../../config");
const dynamic_links_1 = require("../../../integrations/firebase/dynamic-links");
const firestore_service_1 = require("../../../integrations/firebase/firestore/firestore.service");
const follow_service_1 = require("../../follow/follow.service");
const mailing_1 = require("../../../integrations/mailing");
const { ANDROID_PACKAGE_NAME, DOMAIN_URI_PREFIX, IOS_BUNDLE_ID, IOS_APP_STORE_ID, } = config_1.default.FIREBASE.DYNAMIC_LINKS;
const { LINK_PREFIX } = config_1.default;
let EntryService = class EntryService {
    constructor(entryRepository, balanceService, transactionManager, fireStoreService, firebaseDynamicLinksService, followService, mailingClient) {
        this.entryRepository = entryRepository;
        this.balanceService = balanceService;
        this.transactionManager = transactionManager;
        this.fireStoreService = fireStoreService;
        this.firebaseDynamicLinksService = firebaseDynamicLinksService;
        this.followService = followService;
        this.mailingClient = mailingClient;
    }
    userConfirmed(user) {
        return (user &&
            user.status === 'confirmed' &&
            typeof user.confirmedAt !== 'undefined' &&
            user.confirmedAt !== null);
    }
    async getPromoCode() {
        do {
            const promoCode = (0, auth_1.generatePromoCode)();
            const isCodeAvailable = !(await this.entryRepository.getUserByPromoCode(promoCode));
            if (isCodeAvailable)
                return promoCode;
        } while (true);
    }
    async createReferralLink() {
        const promoCode = await this.getPromoCode();
        const referralFullLink = `${LINK_PREFIX}auth/registration/preview?referralCode=${promoCode}`;
        const { shortLink } = await this.firebaseDynamicLinksService.createLink({
            dynamicLinkInfo: {
                domainUriPrefix: DOMAIN_URI_PREFIX,
                link: referralFullLink,
                androidInfo: {
                    androidPackageName: ANDROID_PACKAGE_NAME,
                },
                iosInfo: {
                    iosBundleId: IOS_BUNDLE_ID,
                    iosAppStoreId: IOS_APP_STORE_ID,
                },
            },
        });
        return { promoCode, referralLink: shortLink };
    }
    async getUserByUsername(username) {
        return this.entryRepository.getUserByUserName(username);
    }
    async getUserByEmail(email) {
        return this.entryRepository.getUserByEmail(email);
    }
    async getUserById(userId) {
        return this.entryRepository.getUserById(userId);
    }
    async isEmailUsed(email) {
        const user = await this.entryRepository.getUserByEmail(email);
        return Boolean(user);
    }
    async isValidReferralCode(code) {
        const user = await this.entryRepository.getUserByPromoCode(code);
        return user && user.status === userStatus_1.userStatus.CONFIRMED;
    }
    async updateUserDataAfterAccountConfirmation(email) {
        var _a;
        const txManager = await this.transactionManager.begin();
        try {
            const result = await this.entryRepository.updateUserDataAfterAccountConfirmation(txManager, email);
            await txManager.commit();
            this.mailingClient.addUpdateContact({
                email: result.email,
                username: result.username,
                accountConfirmationDate: (_a = result === null || result === void 0 ? void 0 : result.confirmedAt) === null || _a === void 0 ? void 0 : _a.toISOString(),
            });
            return result;
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
    async isUserBanned(userId) {
        const banRecord = await this.entryRepository.getBanRecordByUserId(userId);
        return banRecord && !banRecord.unbannedAt;
    }
    async setupUser(txManager, userId, userNotificationsEnabledStatus, status, referralCode, user) {
        var _a, _b, _c;
        const syncUserBalances = [userId];
        if (referralCode) {
            const referrerId = await this.entryRepository.usedPromoCode(txManager, userId, referralCode);
            if (referrerId) {
                await Promise.all([
                    this.followService.followUser(userId, referrerId, txManager),
                    this.followService.followUser(referrerId, userId, txManager),
                ]);
            }
        }
        await this.balanceService.setupTokenBalance(txManager, userId);
        await this.balanceService.setupRealMoneyBalance(txManager, userId);
        await this.balanceService.rewardTransactions(txManager, userId);
        if (status === userStatus_1.userStatus.CONFIRMED) {
            const referrerId = await this.balanceService.promoCodeUsedReward(txManager, userId);
            if (referrerId) {
                syncUserBalances.push(referrerId);
            }
        }
        await this.balanceService.syncFirestoreUsersBalances(txManager, syncUserBalances);
        await this.fireStoreService.mergeUpdate('users', userId, {
            notificationsEnabled: userNotificationsEnabledStatus,
        });
        if (userNotificationsEnabledStatus && user.email) {
            this.mailingClient.addUpdateContact({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                country: user.country,
                state: user.state,
                username: user.username,
                registrationDate: (_a = user === null || user === void 0 ? void 0 : user.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString(),
                accountConfirmationDate: (_b = user === null || user === void 0 ? void 0 : user.confirmedAt) === null || _b === void 0 ? void 0 : _b.toISOString(),
                dateOfBirth: (_c = user === null || user === void 0 ? void 0 : user.dateOfBirth) === null || _c === void 0 ? void 0 : _c.toISOString(),
            });
        }
    }
};
EntryService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __param(4, (0, dynamic_links_1.InjectFirebaseDynamicLinks)()),
    __param(6, (0, mailing_1.InjectMailing)()),
    __metadata("design:paramtypes", [entry_repository_1.EntryRepository,
        balance_service_1.BalanceService,
        transaction_manager_service_1.TransactionManager,
        firestore_service_1.FirestoreService,
        dynamic_links_1.FirebaseDynamicLinksService,
        follow_service_1.FollowService,
        mailing_1.MailingService])
], EntryService);
exports.EntryService = EntryService;
//# sourceMappingURL=entry.service.js.map