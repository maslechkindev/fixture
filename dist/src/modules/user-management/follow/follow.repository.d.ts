import { Knex } from 'modules/integrations/knex';
import { FollowUserInfoType } from './types/followUserInfo.type';
import { User } from 'interfaces/user.interface';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class FollowRepository {
    private readonly knex;
    constructor(knex: Knex);
    getUserById(id: string): Promise<User>;
    getUserPremiumInfo(userId: string): Promise<{
        endTime: string;
    }>;
    getFollowingList(userId: string, page: number, limit: number): Promise<FollowUserInfoType[]>;
    countUserFollowing(userId: string): Promise<number>;
    getFollowersList(userId: string, page: number, limit: number): Promise<FollowUserInfoType[]>;
    getFollowingsListForUser(userId: string, userIds: Array<string>): Promise<Array<{
        id: string;
    }>>;
    countUserFollowers(userId: string): Promise<number>;
    followUser(userId: string, followingUserId: string, txManager?: TransactionManagerService): Promise<void>;
    unfollowUser(userId: string, followingUserId: string): Promise<void>;
    searchUser(username: string): Promise<FollowUserInfoType>;
    searchFollowersByPartialUserName(username: string, userId: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: "users.id" | "username" | "avatar";
        _aliases: import("knex").Knex.Raw<any>;
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    searchUsersByPartialUserName(username: string, userId: string): Promise<Array<FollowUserInfoType>>;
    checkIsFollowingUser(userId: string, followingUserId: string): Promise<boolean>;
}
