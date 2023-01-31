import { FollowService } from './follow.service';
import { UserSearchResponseDto } from './dto/userSearchResponse.dto';
import { FollowListResponseDto } from './dto/followListResponseDto';
import { User as UserType } from 'interfaces/user.interface';
import { UserFollowerSearchResponseDto } from './dto/userFollowerSearchResponse.dto';
import { UserSearchDto } from './dto/userSearch.dto';
import { FollowCountResponseDto } from './dto/followCountResponse.dto';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    followCount(user: UserType): Promise<FollowCountResponseDto>;
    userSearch(user: UserType, params: UserSearchDto): Promise<UserSearchResponseDto[]>;
    userFollowerSearchByPartialUsername(user: UserType, params: UserSearchDto): Promise<Array<UserFollowerSearchResponseDto>>;
    userSearchByPartialUsername(user: UserType, params: UserSearchDto): Promise<Array<UserSearchResponseDto>>;
    userFollowerSearch(user: UserType, params: UserSearchDto): Promise<UserFollowerSearchResponseDto[]>;
    getFollowingList(user: UserType, p?: number, l?: number): Promise<FollowListResponseDto>;
    getFollowersList(user: UserType, p?: number, l?: number): Promise<FollowListResponseDto>;
    followPlayer(followUserId: string, user: UserType): Promise<{
        success: boolean;
    }>;
    unfollowPlayer(unfollowUserId: string, user: UserType): Promise<{
        success: boolean;
    }>;
}
