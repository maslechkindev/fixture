import { Contest, Fixture, Market } from 'interfaces/db/tables';
export declare class UpdateFixtureDto {
    fixture: Partial<Fixture>;
    markets: Array<Partial<Market>>;
    contests: Array<Partial<Contest>>;
    marketLines: Array<{
        marketLineId: string;
        status: string;
        marketId: string;
    }>;
}
export declare class UpdateFixtureResponseDto {
    success: boolean;
}
export declare class WrappedUpdateFixtureResponseDto {
    data: UpdateFixtureResponseDto;
}
