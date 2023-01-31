export declare class LockOdds {
    contestTemplate?: number;
    fixtureId?: string;
    lockOdds: boolean;
}
export declare class PostLockOddsChangeDto {
    lockOdds: Array<LockOdds>;
}
export declare class PostLockOddsChangeResponseDto {
    success: boolean;
}
export declare class WrappedPostFixtureStartFreeBetsResponseDto {
    data: PostLockOddsChangeResponseDto;
}
