import { Fixture } from 'interfaces/db/tables';
export declare class GetFixtureResponseDto {
    fixture: Partial<Fixture> & {
        competition: string;
        sport: string;
        templateId: string;
    };
}
export declare class WrappedGetFixtureResponseDto {
    data: GetFixtureResponseDto;
}
