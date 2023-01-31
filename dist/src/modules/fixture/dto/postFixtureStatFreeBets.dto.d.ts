export declare class PostFixtureStartFreeBetsDto {
    title: string;
    info: string;
    durationMin: number;
    betLimit: number;
    notifyInSec: number;
    lockOdds: boolean;
    markets: Array<string>;
}
export declare class PostFixtureStartFreeBetsResponseDto {
    success: boolean;
}
export declare class WrappedPostFixtureStartFreeBetsResponseDto {
    data: PostFixtureStartFreeBetsResponseDto;
}
