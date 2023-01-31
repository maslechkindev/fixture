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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const firebase_auth_service_1 = require("../../auth/firebase/firebase.auth.service");
const userBanRecord_1 = require("../../../../interfaces/entities/userBanRecord");
const errors_1 = require("../../../../helpers/errors");
const users_repository_1 = require("./users.repository");
const user_interface_1 = require("../../../../interfaces/user.interface");
const userStatus_1 = require("../../../../enums/userStatus");
const userPremiumTermsRecord_1 = require("../../../../interfaces/entities/userPremiumTermsRecord");
const userBalancesRecord_1 = require("../../../../interfaces/entities/userBalancesRecord");
const balance_service_1 = require("../../../balance/balance.service");
const transactionsList_interface_1 = require("../../../balance/interfaces/transactionsList.interface");
const recursivePartial_1 = require("../../../../helpers/recursivePartial");
const generateUsername_1 = require("../../../../helpers/user/generateUsername");
const contest_instance_participants_service_1 = require("../../../contest-instance/contest-instance-participants/contest-instance-participants.service");
const dynamic_links_1 = require("../../../integrations/firebase/dynamic-links");
const config_1 = require("../../../../config/config");
let UsersService = class UsersService {
    constructor(usersRepository, transactionManager, firebaseAuthService, balanceService, fireBaseDynamicLinks, participantService) {
        this.usersRepository = usersRepository;
        this.transactionManager = transactionManager;
        this.firebaseAuthService = firebaseAuthService;
        this.balanceService = balanceService;
        this.fireBaseDynamicLinks = fireBaseDynamicLinks;
        this.participantService = participantService;
        this.formatTime = (time) => {
            return time && Date.parse(time) ? new Date(time) : null;
        };
    }
    async getUsers(params) {
        const users = await this.usersRepository.getUsers(params);
        let count = 0;
        if (users.length > 0) {
            count = +users[0].fullcount;
        }
        const usersWithUserReferralCodeValue = await Promise.all(users.map(async (user) => {
            return Object.assign(Object.assign({}, R.omit(['referrerId'], user)), (user.referrerId
                ? {
                    referralCodeUsed: await this.usersRepository.getUsersPromocodeByReffererId(user.referrerId),
                }
                : { referralCodeUsed: '' }));
        }));
        return {
            users: usersWithUserReferralCodeValue.map((user) => {
                const premiumCondition = user.startTime &&
                    user.endTime &&
                    user.startTime.getTime() < Date.now() &&
                    user.endTime.getTime() > Date.now();
                user.type = premiumCondition ? 'Premium' : 'Standard';
                return R.omit(['fullcount', 'startTime', 'endTime'], user);
            }),
            count,
        };
    }
    async getUser(params) {
        const user = await this.usersRepository.getUser(params);
        return Object.assign(Object.assign({}, R.omit(['referrerId'], user)), (user.referrerId
            ? {
                referralCodeUsed: await this.usersRepository.getUsersPromocodeByReffererId(user.referrerId),
            }
            : { referralCodeUsed: '' }));
    }
    getUserTransactions(userId, params, filters) {
        return this.balanceService.getUserTransactions(userId, params, filters);
    }
    getBanInfo(userId) {
        return this.usersRepository.getBanRecordByUserId(userId);
    }
    getPremiumInfo(userId) {
        return this.usersRepository.getPremiumRecordByUserId(userId);
    }
    async getBalanceInfo(userId) {
        const balances = await this.balanceService.getBalanceRecordByUserId(userId);
        return {
            real_money: balances.realMoneyBalance,
            tokens: balances.tokenBalance,
        };
    }
    async updateUser(data, user) {
        const intersectObj = (a, b) => R.pickBy((val, key) => !R.equals(JSON.stringify(val), JSON.stringify(a[key])), b);
        const changedFields = intersectObj(user, data);
        if (changedFields.username) {
            const isUsernameUsed = await this.usersRepository.getUserByUsername(user.id, changedFields.username);
            if (isUsernameUsed) {
                throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.MANAGEMENT.USERNAME_USED);
            }
            const { id: userId } = data;
            await this.participantService.changeUserNameInFireStore(userId, changedFields.username);
        }
        if (changedFields.status && changedFields.status === userStatus_1.userStatus.CONFIRMED) {
            changedFields.confirmedAt = new Date();
            const txManager = await this.transactionManager.begin();
            try {
                const referrerId = await this.balanceService.promoCodeUsedReward(txManager, data.id);
                if (referrerId) {
                    await this.balanceService.syncFirestoreUsersBalances(txManager, [
                        referrerId,
                    ]);
                }
                await txManager.commit();
            }
            catch (error) {
                await txManager.rollback();
                throw error;
            }
            if (!user.username && !data.username) {
                changedFields.username = await this.usersRepository.generateUsername();
            }
        }
        if (changedFields.status === userStatus_1.userStatus.NOT_CONFIRMED) {
            changedFields.confirmedAt = null;
        }
        return this.usersRepository.updateUser(data.id, changedFields);
    }
    async banUser(userId, reason) {
        const txManager = await this.transactionManager.begin();
        try {
            const banRecord = await this.usersRepository.getBanRecordByUserId(userId, txManager);
            let result = null;
            if (banRecord && !banRecord.unbannedAt) {
                result = await this.usersRepository.unbanUser(banRecord.id, reason, txManager);
            }
            else {
                result = await this.usersRepository.banUser(userId, reason, txManager);
                await this.firebaseAuthService.revokeRefreshTokens(userId);
            }
            await txManager.commit();
            return result;
        }
        catch (error) {
            await txManager.rollback();
            throw error;
        }
    }
    updatePremiumInfo(userId, startTime, endTime) {
        const startTimeFormatted = this.formatTime(startTime);
        const endTimeFormatted = this.formatTime(endTime);
        return this.usersRepository.updatePremiumInfo(userId, startTimeFormatted, endTimeFormatted);
    }
    async manualReplenishUserBalance(replenish) {
        const user = await this.usersRepository.getUser({ id: replenish.userId });
        if (user.status !== 'confirmed') {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.MANAGEMENT.REPLENISH_NOT_CONFIRMED_USER);
        }
        return this.balanceService.manualReplenishUserBalance(replenish);
    }
    getConfirmedUsersCount() {
        return this.usersRepository.getConfirmedUsersCount();
    }
    async getFreeUsernamesCount() {
        const userNamePrefixCount = await this.usersRepository.getUsernamePrefixCount();
        const usedUsernamesCount = await this.usersRepository.getUsedUsernamesCount();
        return (userNamePrefixCount * generateUsername_1.USERNAMES_MAX_COUNT_PER_PREFIX - usedUsernamesCount);
    }
    getDynamicHomeLinkWithPromoCode(promoCode) {
        const { ANDROID_PACKAGE_NAME, DOMAIN_URI_PREFIX, IOS_BUNDLE_ID, IOS_APP_STORE_ID, } = config_1.default.FIREBASE.DYNAMIC_LINKS;
        const { LINK_PREFIX } = config_1.default;
        const linkToSend = `${LINK_PREFIX}contests?referral=${promoCode}`;
        return this.fireBaseDynamicLinks.createLink({
            dynamicLinkInfo: {
                domainUriPrefix: DOMAIN_URI_PREFIX,
                link: linkToSend,
                androidInfo: {
                    androidPackageName: ANDROID_PACKAGE_NAME,
                },
                iosInfo: {
                    iosBundleId: IOS_BUNDLE_ID,
                    iosAppStoreId: IOS_APP_STORE_ID,
                },
            },
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, dynamic_links_1.InjectFirebaseDynamicLinks)()),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        transaction_manager_service_1.TransactionManager,
        firebase_auth_service_1.FirebaseAuthService,
        balance_service_1.BalanceService,
        dynamic_links_1.FirebaseDynamicLinksService,
        contest_instance_participants_service_1.ContestInstanceParticipantsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map