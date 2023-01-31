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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
const follow_repository_1 = require("./follow.repository");
let FollowService = class FollowService {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }
    getUserById(userId) {
        return this.followRepository.getUserById(userId);
    }
    async getFollowingList(userId, page, limit) {
        const followingList = await this.followRepository.getFollowingList(userId, page, limit);
        const totalCount = await this.followRepository.countUserFollowing(userId);
        return { followingList, totalCount };
    }
    async getFollowersList(userId, page, limit) {
        const followersList = await this.followRepository.getFollowersList(userId, page, limit);
        const totalCount = await this.followRepository.countUserFollowers(userId);
        return { followersList, totalCount };
    }
    async getFollowingsListForUser(userId, userIds) {
        const followersList = await this.followRepository.getFollowingsListForUser(userId, userIds);
        return followersList;
    }
    async followUser(userId, followingUserId, txManager) {
        return this.followRepository.followUser(userId, followingUserId, txManager);
    }
    async unfollowUser(userId, followingUserId) {
        return this.followRepository.unfollowUser(userId, followingUserId);
    }
    async searcFollowersByPartialUserName(username, userId) {
        const parsedUserName = username.trim().replace(' ', '');
        switch (true) {
            case parsedUserName.length <= 2:
                return [];
            case parsedUserName.length >= 3:
                const result = (await this.followRepository.searchFollowersByPartialUserName(parsedUserName.toLowerCase(), userId));
                return result;
        }
    }
    async searchUsersByPartialUserName(username, userId) {
        const parsedUserName = username.trim().replace(' ', '');
        switch (true) {
            case parsedUserName.length <= 2:
                return [];
            case parsedUserName.length >= 3:
                const result = await this.followRepository.searchUsersByPartialUserName(parsedUserName.toLowerCase(), userId);
                return result;
        }
    }
    async searchUser(username) {
        return this.followRepository.searchUser(username);
    }
    checkIsFollowingUser(userId, followingUserId) {
        return this.followRepository.checkIsFollowingUser(userId, followingUserId);
    }
    async isUserPremium(userId) {
        const userPremiumInfo = await this.followRepository.getUserPremiumInfo(userId);
        if (!userPremiumInfo ||
            !userPremiumInfo.endTime ||
            !Date.parse(userPremiumInfo.endTime)) {
            return false;
        }
        const endTime = new Date(userPremiumInfo.endTime);
        return endTime.getTime() > new Date().getTime();
    }
    async followCount(userId) {
        const followingCount = await this.followRepository.countUserFollowing(userId);
        const followersCount = await this.followRepository.countUserFollowers(userId);
        return { followingCount, followersCount };
    }
};
FollowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [follow_repository_1.FollowRepository])
], FollowService);
exports.FollowService = FollowService;
//# sourceMappingURL=follow.service.js.map