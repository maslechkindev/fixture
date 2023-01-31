declare class FollowListEntity {
    id: string;
    username: string;
    avatar: string;
    isFollower?: boolean;
}
export declare class FollowListResponseDto {
    page: number;
    limit: number;
    list: FollowListEntity[];
    totalCount: number;
}
export declare class WrappedFollowListResponseDto {
    data: FollowListResponseDto;
}
export {};
