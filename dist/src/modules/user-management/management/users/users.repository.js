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
exports.UsersRepository = void 0;
const knex_1 = require("../../../integrations/knex");
const user_interface_1 = require("../../../../interfaces/user.interface");
const generateUsername_1 = require("../../../../helpers/user/generateUsername");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const userBanRecord_1 = require("../../../../interfaces/entities/userBanRecord");
const userPremiumTermsRecord_1 = require("../../../../interfaces/entities/userPremiumTermsRecord");
const userStatus_1 = require("../../../../enums/userStatus");
let UsersRepository = class UsersRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async getUsers(params) {
        const query = this.knex
            .from('users')
            .leftJoin('premium_terms', 'users.id', 'premium_terms.userId')
            .leftJoin('user_referred_by', 'users.id', 'user_referred_by.userId')
            .select('users.id as id', 'username', 'email', 'status', 'promoCode', 'users.createdAt', 'startTime', 'endTime', 'isInfluencer', 'user_referred_by.referrerId', this.knex.raw('count(*) OVER() as fullcount'))
            .orderBy(params.orderBy, params.direction)
            .limit(params.size)
            .offset((params.page - 1) * params.size);
        if (typeof params.search === 'string' && params.search.length > 0) {
            query.where(this.knex.raw(`username like '%${params.search}%' OR email like '%${params.search}%'`));
        }
        return await query;
    }
    async getUsersPromocodeByReffererId(referrerId) {
        const { promoCode } = await this.knex('users')
            .where({ id: referrerId })
            .select('promoCode')
            .first();
        return promoCode;
    }
    async countUsers() {
        const [{ count }] = await this.knex('users').count('id');
        return Number(count);
    }
    async getUser(params) {
        return this.knex('users')
            .leftJoin('user_referred_by', 'users.id', 'user_referred_by.userId')
            .first()
            .select('id', 'email', this.knex.raw(`coalesce (username, '') as username`), 'firstName', 'lastName', 'users.createdAt', 'confirmedAt', 'status', 'dateOfBirth', 'promoCode', 'isInfluencer', 'users.referralLink', 'user_referred_by.referrerId')
            .where(params);
    }
    async getUserByUsername(id, username) {
        const data = await this.knex('users')
            .first()
            .select('id')
            .where({ username })
            .andWhereNot({ id });
        return Boolean(data);
    }
    generateUsername() {
        return (0, generateUsername_1.default)(this.knex);
    }
    async updateUser(id, changedFields) {
        const [updatedUser] = await this.knex('users')
            .update(changedFields)
            .where({ id })
            .returning([
            'id',
            'email',
            'username',
            'firstName',
            'lastName',
            'createdAt',
            'confirmedAt',
            'status',
            'notificationsEnabled',
            'country',
            'state',
        ]);
        return updatedUser;
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
    async getPremiumRecordByUserId(userId) {
        const premiumRecord = await this.knex('premium_terms')
            .first()
            .where({ userId })
            .where('endTime', '>', this.knex.raw('now()'))
            .limit(1);
        return premiumRecord;
    }
    async banUser(userId, banReason, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const [result] = await conn('user_bans')
            .insert({
            userId,
            banReason,
            bannedAt: conn.raw('now()'),
        })
            .returning([
            'id',
            'userId',
            'banReason',
            'bannedAt',
            'unbanReason',
            'unbannedAt',
        ]);
        return result;
    }
    async unbanUser(id, unbanReason, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        const [result] = await conn('user_bans')
            .update({
            unbannedAt: conn.raw('now()'),
            unbanReason,
        })
            .where({ id })
            .returning([
            'id',
            'userId',
            'banReason',
            'bannedAt',
            'unbanReason',
            'unbannedAt',
        ]);
        return result;
    }
    async updatePremiumInfo(id, startTime, endTime) {
        const [result] = await this.knex('premium_terms')
            .insert({
            userId: id,
            startTime,
            endTime,
        })
            .onConflict(['userId'])
            .merge(['startTime', 'endTime'])
            .returning(['id', 'userId', 'startTime', 'endTime']);
        return result;
    }
    async getConfirmedUsersCount() {
        const result = await this.knex('users')
            .where({
            status: userStatus_1.userStatus.CONFIRMED,
        })
            .count('id')
            .first();
        return +result.count;
    }
    async getUsedUsernamesCount() {
        const result = await this.knex('usernames')
            .where({
            active: true,
        })
            .sum('count')
            .first();
        return +result.sum;
    }
    async getUsernamePrefixCount() {
        const usernamePrefixes = await this.knex('usernames')
            .where({
            active: true,
        })
            .count('prefix')
            .first();
        return +usernamePrefixes.count;
    }
};
UsersRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map