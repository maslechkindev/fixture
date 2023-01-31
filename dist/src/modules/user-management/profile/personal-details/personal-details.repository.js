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
exports.PersonalDetailsRepository = void 0;
const knex_1 = require("../../../integrations/knex");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const balance_service_1 = require("../../../balance/balance.service");
const balance_repository_1 = require("../../../balance/balance.repository");
const userPremiumTermsRecord_1 = require("../../../../interfaces/entities/userPremiumTermsRecord");
const user_interface_1 = require("../../../../interfaces/user.interface");
let PersonalDetailsRepository = class PersonalDetailsRepository {
    constructor(knex, balanceService) {
        this.knex = knex;
        this.balanceService = balanceService;
    }
    getReferrerUsername(promoCode) {
        return this.knex('users')
            .select('users.username')
            .where('users.promoCode', '=', promoCode)
            .first();
    }
    async updateUserPersonalDetailsInfo(txManager, fieldsToUpdate, userId) {
        const conn = txManager.transaction || this.knex;
        const [updatedUser] = await conn('users')
            .update(fieldsToUpdate)
            .where({ id: userId })
            .returning([
            'id',
            'firstName',
            'lastName',
            'dateOfBirth',
            'email',
            'username',
        ]);
        const isAlreadyRewarded = await conn('token_transactions')
            .innerJoin('token_balance', 'token_transactions.balanceId', 'token_balance.id')
            .first()
            .where({ type: balance_repository_1.TRANSACTION_TYPES.TD_PERSONAL_DETAILS, userId });
        if (!isAlreadyRewarded &&
            updatedUser.firstName &&
            updatedUser.lastName &&
            updatedUser.dateOfBirth) {
            await this.balanceService.fillPersonalDetailsReward(txManager, userId);
            await this.balanceService.syncFirestoreUsersBalances(txManager, [userId]);
        }
        return updatedUser;
    }
    async getPremiumRecordByUserId(userId) {
        const premiumRecord = await this.knex('premium_terms')
            .first()
            .where({ userId })
            .where('endTime', '>', this.knex.raw('now()'))
            .limit(1);
        return premiumRecord;
    }
    getUserById(id) {
        return this.knex.first().from('users').where({ id });
    }
    async isUserRegistrateBy3rdParty(userId) {
        const result = await this.knex('users')
            .count('users.id')
            .leftJoin('apple_accounts', 'users.id', 'apple_accounts.userId')
            .leftJoin('facebook_accounts', 'users.id', 'facebook_accounts.userId')
            .leftJoin('google_accounts', 'users.id', 'google_accounts.userId')
            .where('users.id', userId)
            .andWhere(function () {
            this.orWhereNotNull('apple_accounts.userId');
            this.orWhereNotNull('facebook_accounts.userId');
            this.orWhereNotNull('google_accounts.userId');
        })
            .first();
        return !!+result.count;
    }
    async isFollowed(userId, followers) {
        return this.knex('user_followings')
            .select('user_followings.followingUserId as followedUser')
            .where({ userId })
            .whereIn('user_followings.followingUserId', followers);
    }
    async checkIsAllFollowersValid(followersIds) {
        const query = this.knex('users').count('id').whereIn('id', followersIds);
        return query;
    }
};
PersonalDetailsRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function, balance_service_1.BalanceService])
], PersonalDetailsRepository);
exports.PersonalDetailsRepository = PersonalDetailsRepository;
//# sourceMappingURL=personal-details.repository.js.map