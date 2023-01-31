import { FixtureDto } from './fixture.dto';
export declare class GetFixturesRequestDto {
    statuses: number[];
    page: number;
    size: number;
    direction: string;
    orderBy: string;
    search: string;
}
export declare class GetFixturesDto {
    fixtures: Array<Partial<FixtureDto>>;
    count: number;
}
export declare class WrappedGetFixturesResponse {
    data: GetFixturesDto[];
}
