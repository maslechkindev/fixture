import { FixtureMarketDto } from './fixtureMarket.dto';
import { PostFixtureStartFreeBetsDto } from './postFixtureStatFreeBets.dto';
import { MarketLine } from '../../../interfaces/db/tables';
export declare class GetFixtureMarketsRequestDto {
    page: number;
    size: number;
    direction: string;
    orderBy: string;
    marketLines?: string;
}
export declare class GetFixtureMarketsResponseDto {
    markets: Array<FixtureMarketDto>;
    count: number;
    cmsInfo: PostFixtureStartFreeBetsDto;
    marketLines: Array<Partial<MarketLine>>;
}
export declare class WrappedGetFixtureMarketsResponseDto {
    data: GetFixtureMarketsResponseDto;
}
