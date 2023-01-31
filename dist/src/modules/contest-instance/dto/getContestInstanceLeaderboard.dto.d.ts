export declare class LeaderboardRow {
    userId: string;
    username: string;
    registrationTime: Date;
    totalBalance: string;
    avatar: string;
    place: string;
    prize?: string | number;
    prizeType?: string;
    prizePlace?: boolean;
}
export declare class GetContestInstanceLeaderboardRequestDto {
    contestInstanceId: string;
    page: number;
    size: number;
    followingOnly?: boolean;
}
export declare class GetContestInstanceLeaderboardResponseDto {
    leaderboard: LeaderboardRow[];
    playerInfo: Partial<LeaderboardRow>;
    myInfo?: Partial<LeaderboardRow>;
}
export declare class WrappedGetContestInstanceLeaderboardResponseDto {
    data: GetContestInstanceLeaderboardResponseDto;
}
