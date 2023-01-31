import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { FollowRepository } from './follow.repository';
import { FollowUserInfoType } from './types/followUserInfo.type';
export declare class FollowService {
    private followRepository;
    constructor(followRepository: FollowRepository);
    getUserById(userId: string): Promise<import("../../../interfaces/user.interface").User>;
    getFollowingList(userId: string, page: number, limit: number): Promise<{
        followingList: FollowUserInfoType[];
        totalCount: number;
    }>;
    getFollowersList(userId: string, page: number, limit: number): Promise<{
        followersList: FollowUserInfoType[];
        totalCount: number;
    }>;
    getFollowingsListForUser(userId: string, userIds: Array<string>): Promise<{
        id: string;
    }[]>;
    followUser(userId: string, followingUserId: string, txManager?: TransactionManagerService): Promise<void>;
    unfollowUser(userId: string, followingUserId: string): Promise<void>;
    searcFollowersByPartialUserName(username: string, userId: string): Promise<{
        id: string;
        avatar: string;
        username: string;
        isFollower: boolean;
    }[]>;
    searchUsersByPartialUserName(username: string, userId: string): Promise<Array<FollowUserInfoType>>;
    searchUser(username: string): Promise<FollowUserInfoType>;
    checkIsFollowingUser(userId: string, followingUserId: string): Promise<boolean>;
    isUserPremium(userId: string): Promise<boolean>;
    followCount(userId: string): Promise<{
        followingCount: number;
        followersCount: number;
    }>;
}
