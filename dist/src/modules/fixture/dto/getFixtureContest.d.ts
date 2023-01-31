import { Contest } from 'interfaces/db/tables';
export declare class GetFixtureContestResponseDto {
    contest: Partial<Contest> & {
        fixtureName: string;
        productType: string;
        notFinished: number;
    };
}
export declare class WrappedGetFixtureContestResponseDto {
    data: GetFixtureContestResponseDto;
}
