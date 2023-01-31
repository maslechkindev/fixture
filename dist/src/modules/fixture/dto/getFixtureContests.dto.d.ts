import { FixtureContestDto } from './fixtureContest.dto';
export declare class GetFixtureContestsRequestDto {
    page: number;
    size: number;
    direction: string;
    orderBy: string;
    search: string;
}
export declare type GetContestInstancesByContest = GetFixtureContestsRequestDto & {
    contestId: string;
    page?: number;
    size?: number;
};
export declare class GetFixtureContestsResponseDto {
    contests: Array<FixtureContestDto>;
    count: number;
}
export declare class WrappedGetFixtureContestsResponseDto {
    data: GetFixtureContestsResponseDto;
}
