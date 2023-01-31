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
exports.FollowRepository = void 0;
const knex_1 = require("../../integrations/knex");
const user_interface_1 = require("../../../interfaces/user.interface");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const userStatus_1 = require("../../../enums/userStatus");
let FollowRepository = class FollowRepository {
    constructor(knex) {
        this.knex = knex;
    }
    getUserById(id) {
        return this.knex.first().from('users').where({ id });
    }
    getUserPremiumInfo(userId) {
        return this.knex.first().from('premium_terms').where({ userId });
    }
    async getFollowingList(userId, page, limit) {
        return this.knex('user_followings')
            .where({ userId })
            .andWhere('users.status', '=', userStatus_1.userStatus.CONFIRMED)
            .innerJoin('users', 'user_followings.followingUserId', 'users.id')
            .select(['user_followings.followingUserId as id', 'avatar', 'username'])
            .offset((page - 1) * limit)
            .limit(limit);
    }
    async countUserFollowing(userId) {
        const [{ count }] = await this.knex('user_followings')
            .where({ userId })
            .andWhere('users.status', '=', userStatus_1.userStatus.CONFIRMED)
            .innerJoin('users', 'user_followings.followingUserId', 'users.id')
            .count('user_followings.id');
        return Number(count);
    }
    async getFollowersList(userId, page, limit) {
        return this.knex('user_followings')
            .where('user_followings.followingUserId', '=', userId)
            .andWhere('users.status', '=', userStatus_1.userStatus.CONFIRMED)
            .innerJoin('users', 'user_followings.userId', 'users.id')
            .leftJoin('user_followings as uf2', 'uf2.followingUserId', 'user_followings.userId')
            .select('user_followings.userId as id', 'avatar', 'username', this.knex.raw('CASE WHEN count(uf2."id") > 0 THEN true ELSE false END AS "isFollowing"'))
            .groupBy(['users.id', 'user_followings.userId'])
            .orderBy('username')
            .offset((page - 1) * limit)
            .limit(limit);
    }
    async getFollowingsListForUser(userId, userIds) {
        return this.knex('user_followings')
            .where({ userId })
            .whereIn('followingUserId', userIds)
            .select(['user_followings.followingUserId as id']);
    }
    async countUserFollowers(userId) {
        const [{ count }] = await this.knex('user_followings')
            .where({ followingUserId: userId })
            .andWhere('users.status', '=', userStatus_1.userStatus.CONFIRMED)
            .innerJoin('users', 'user_followings.followingUserId', 'users.id')
            .count('user_followings.id');
        return Number(count);
    }
    async followUser(userId, followingUserId, txManager) {
        const conn = (txManager === null || txManager === void 0 ? void 0 : txManager.transaction) || this.knex;
        await conn('user_followings')
            .insert({
            userId,
            followingUserId,
        })
            .onConflict(['userId', 'followingUserId'])
            .ignore();
    }
    async unfollowUser(userId, followingUserId) {
        await this.knex('user_followings').where({ userId, followingUserId }).del();
    }
    async searchUser(username) {
        return this.knex('users')
            .select(['id', 'username', 'avatar'])
            .whereRaw(`LOWER(username) = '${username.toLowerCase()}'`)
            .first();
    }
    searchFollowersByPartialUserName(username, userId) {
        return this.knex('users')
            .innerJoin('user_followings', 'users.id', 'user_followings.userId')
            .select('users.id', 'username', 'avatar', this.knex.raw('true as "isFollower"'))
            .whereRaw(`LOWER(username) like '%${username}%'`)
            .where('user_followings.followingUserId', '=', userId)
            .limit(30);
    }
    async searchUsersByPartialUserName(username, userId) {
        return this.knex('users')
            .select('id', 'username', 'avatar', this.knex.raw(`
          case 
            when exists (
              select * 
              from "user_followings" 
              where "user_followings"."userId" = :userId 
              and "user_followings"."followingUserId" = "users"."id"
            ) 
            then true
            else false
          end "isFollowing"
          `, { userId }))
            .whereRaw(`LOWER(username) like '%${username}%'`)
            .limit(30);
    }
    async checkIsFollowingUser(userId, followingUserId) {
        const isFollowing = await this.knex('user_followings')
            .select('*')
            .where({ userId, followingUserId })
            .first();
        return Boolean(isFollowing);
    }
};
FollowRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], FollowRepository);
exports.FollowRepository = FollowRepository;
//# sourceMappingURL=follow.repository.js.map