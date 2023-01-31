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
exports.EntryRepository = void 0;
const knex_1 = require("../../../integrations/knex");
const user_interface_1 = require("../../../../interfaces/user.interface");
const userStatus_1 = require("../../../../enums/userStatus");
const generateUsername_1 = require("../../../../helpers/user/generateUsername");
const balance_service_1 = require("../../../balance/balance.service");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const userBanRecord_1 = require("../../../../interfaces/entities/userBanRecord");
let EntryRepository = class EntryRepository {
    constructor(knex, balanceService) {
        this.knex = knex;
        this.balanceService = balanceService;
    }
    getUserByEmail(email) {
        const raw = 'LOWER("email")=:email';
        return this.knex
            .first()
            .from('users')
            .where(this.knex.raw(raw, {
            email: `${email.toLowerCase()}`,
        }));
    }
    getUserByPromoCode(promoCode) {
        return this.knex.first().from('users').where({ promoCode });
    }
    getUserByUserName(username) {
        return this.knex.first().from('users').where({ username });
    }
    getUserById(id) {
        return this.knex.first().from('users').where({ id });
    }
    async createUser(txManager, newUser) {
        const conn = txManager.transaction || this.knex;
        const [user] = await conn.insert(newUser).into('users').returning(['*']);
        return user;
    }
    async updateUserDataAfterAccountConfirmation(txManager, email) {
        const conn = txManager.transaction || this.knex;
        const username = await (0, generateUsername_1.default)(conn);
        const [updatedUser] = await conn('users')
            .update({
            status: userStatus_1.userStatus.CONFIRMED,
            username: username,
            confirmedAt: this.knex.raw('now()'),
        })
            .where({ email })
            .returning(['*']);
        const balancesToUpdate = [updatedUser.id];
        const referrerId = await this.balanceService.promoCodeUsedReward(txManager, updatedUser.id);
        if (referrerId) {
            balancesToUpdate.push(referrerId);
        }
        await this.balanceService.syncFirestoreUsersBalances(txManager, balancesToUpdate);
        return updatedUser;
    }
    async usedPromoCode(txManager, userId, referralCode) {
        const conn = txManager.transaction || this.knex;
        const referrer = await conn('users')
            .first()
            .select('id')
            .where({ promoCode: referralCode });
        if (referrer) {
            await conn('user_referred_by').insert({
                userId,
                referrerId: referrer.id,
            });
            return referrer.id;
        }
    }
    async getBanRecordByUserId(userId, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const banRecord = await conn('user_bans')
            .first()
            .where({ userId })
            .orderBy('bannedAt', 'desc')
            .limit(1);
        return banRecord;
    }
};
EntryRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function, balance_service_1.BalanceService])
], EntryRepository);
exports.EntryRepository = EntryRepository;
//# sourceMappingURL=entry.repository.js.map