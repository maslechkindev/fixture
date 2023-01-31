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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../helpers/swagger/decorators");
const config_1 = require("../../../config");
const follow_service_1 = require("./follow.service");
const user_decorator_1 = require("../../../decorators/user.decorator");
const errors_1 = require("../../../helpers/errors");
const userSearchResponse_dto_1 = require("./dto/userSearchResponse.dto");
const followListResponseDto_1 = require("./dto/followListResponseDto");
const api_implicit_query_decorator_1 = require("@nestjs/swagger/dist/decorators/api-implicit-query.decorator");
const user_interface_1 = require("../../../interfaces/user.interface");
const userFollowerSearchResponse_dto_1 = require("./dto/userFollowerSearchResponse.dto");
const userSearch_dto_1 = require("./dto/userSearch.dto");
const followCountResponse_dto_1 = require("./dto/followCountResponse.dto");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async followCount(user) {
        const counters = await this.followService.followCount(user.id);
        return counters;
    }
    async userSearch(user, params) {
        const { username } = params;
        const foundUser = await this.followService.searchUser(username);
        if (!foundUser || foundUser.id === user.id) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.USER_NOT_FOUND);
        }
        const isFollowing = await this.followService.checkIsFollowingUser(user.id, foundUser.id);
        return [
            Object.assign(Object.assign({}, foundUser), { isFollowing }),
        ];
    }
    async userFollowerSearchByPartialUsername(user, params) {
        const { username } = params;
        const foundUsers = (await this.followService.searcFollowersByPartialUserName(username, user.id));
        return foundUsers;
    }
    async userSearchByPartialUsername(user, params) {
        const { username } = params;
        const foundUsers = (await this.followService.searchUsersByPartialUserName(username, user.id));
        return foundUsers;
    }
    async userFollowerSearch(user, params) {
        const { username } = params;
        const foundUser = await this.followService.searchUser(username);
        if (!foundUser || foundUser.id === user.id) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.USER_NOT_FOUND);
        }
        const isFollower = await this.followService.checkIsFollowingUser(foundUser.id, user.id);
        return [
            Object.assign(Object.assign({}, foundUser), { isFollower }),
        ];
    }
    async getFollowingList(user, p, l) {
        const page = p && p > 0 ? p : config_1.default.FOLLOW_LIST.DEFAULT_PAGE;
        const limit = l && l > 0 ? l : config_1.default.FOLLOW_LIST.DEFAULT_LIMIT;
        const { followingList, totalCount } = await this.followService.getFollowingList(user.id, page, limit);
        return {
            page,
            limit,
            list: followingList,
            totalCount,
        };
    }
    async getFollowersList(user, p, l) {
        const page = p && p > 0 ? p : config_1.default.FOLLOW_LIST.DEFAULT_PAGE;
        const limit = l && l > 0 ? l : config_1.default.FOLLOW_LIST.DEFAULT_LIMIT;
        const { followersList, totalCount } = await this.followService.getFollowersList(user.id, page, limit);
        return {
            page,
            limit,
            list: followersList,
            totalCount,
        };
    }
    async followPlayer(followUserId, user) {
        if (user.id === followUserId) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.FOLLOW_YOURSELF);
        }
        const isFollowingUserExist = await this.followService.getUserById(followUserId);
        if (!isFollowingUserExist) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.INVALID_FOLLOWING_ID);
        }
        await this.followService.followUser(user.id, followUserId);
        return { success: true };
    }
    async unfollowPlayer(unfollowUserId, user) {
        if (user.id === unfollowUserId) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.FOLLOW_YOURSELF);
        }
        const isUnfollowingUserExist = await this.followService.getUserById(unfollowUserId);
        if (!isUnfollowingUserExist) {
            throw new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.INVALID_FOLLOWING_ID);
        }
        await this.followService.unfollowUser(user.id, unfollowUserId);
        return { success: true };
    }
};
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: followCountResponse_dto_1.WrappedFollowCountResponseDto,
        description: 'Get the number of Following and the number of Followers',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/follow-count'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "followCount", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: userSearchResponse_dto_1.WrappedUserSearchResponseDto,
        description: 'Get found user info',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.USER_NOT_FOUND).getResponse(),
        },
        description: 'Error when user not found',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/user-search'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userSearch_dto_1.UserSearchDto]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "userSearch", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: userSearchResponse_dto_1.WrappedUserSearchResponseDto,
        description: 'Get found user info',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.USER_NOT_FOUND).getResponse(),
        },
        description: 'Error when user not found',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/partial-username-follower/search'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userSearch_dto_1.UserSearchDto]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "userFollowerSearchByPartialUsername", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: userSearchResponse_dto_1.WrappedUserSearchResponseDto,
        description: 'Get found user info',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.USER_NOT_FOUND).getResponse(),
        },
        description: 'Error when user not found',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/partial-username/search'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userSearch_dto_1.UserSearchDto]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "userSearchByPartialUsername", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: userFollowerSearchResponse_dto_1.WrappedUserFollowerSearchResponseDto,
        description: 'Get found user info',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.USER_NOT_FOUND).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.FOLLOWERS_LIST_UNAVAILABLE).getResponse(),
                },
            ],
        },
        description: 'Error when user not found',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.Get)('/user-follower-search'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userSearch_dto_1.UserSearchDto]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "userFollowerSearch", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: followListResponseDto_1.WrappedFollowListResponseDto,
        description: 'User following list',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.FOLLOWING_LIST_EMPTY).getResponse(),
        },
        description: 'Error when following list empty',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, api_implicit_query_decorator_1.ApiImplicitQuery)({
        name: 'page',
        description: `The page of following users to return, if not specified or less than 1, default value ${config_1.default.FOLLOW_LIST.DEFAULT_PAGE} used`,
        required: false,
        type: Number,
    }),
    (0, api_implicit_query_decorator_1.ApiImplicitQuery)({
        name: 'limit',
        description: `The number of following users to return, if not specified or less than 1, default value ${config_1.default.FOLLOW_LIST.DEFAULT_LIMIT} used`,
        required: false,
        type: Number,
    }),
    (0, common_1.Get)('/following-list'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowingList", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        type: followListResponseDto_1.WrappedFollowListResponseDto,
        description: 'User followers list',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, api_implicit_query_decorator_1.ApiImplicitQuery)({
        name: 'page',
        description: `The page of follower users to return, if not specified or less than 1, default value ${config_1.default.FOLLOW_LIST.DEFAULT_PAGE} used`,
        required: false,
        type: Number,
    }),
    (0, api_implicit_query_decorator_1.ApiImplicitQuery)({
        name: 'limit',
        description: `The number of follower users to return, if not specified or less than 1, default value ${config_1.default.FOLLOW_LIST.DEFAULT_LIMIT} used`,
        required: false,
        type: Number,
    }),
    (0, common_1.Get)('/followers-list'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowersList", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        schema: {
            example: {
                success: true,
            },
        },
        description: 'Follow player',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.FOLLOW_YOURSELF).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.INVALID_FOLLOWING_ID).getResponse(),
                },
            ],
        },
        description: 'Error when following list empty',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/follow/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "followPlayer", null);
__decorate([
    (0, decorators_1.ApiOkResponse)({
        schema: {
            example: {
                success: true,
            },
        },
        description: 'Unfollow player',
    }),
    (0, decorators_1.ApiBadRequestResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.FOLLOW_YOURSELF).getResponse(),
                },
                {
                    example: new errors_1.BadRequestExceptionCustom(errors_1.ERRORS.FOLLOW_PLAYER.INVALID_FOLLOWING_ID).getResponse(),
                },
            ],
        },
        description: 'Error when following list empty',
    }),
    (0, decorators_1.ApiUnauthorizedResponse)({
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/unfollow/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollowPlayer", null);
FollowController = __decorate([
    (0, decorators_1.ApiBearerAuth)(),
    (0, decorators_1.ApiTags)('Follow player'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
exports.FollowController = FollowController;
//# sourceMappingURL=follow.controller.js.map