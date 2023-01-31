export interface FixtureMarketDto {
    id: string;
    name: string;
    type: string;
    period: string;
    isClosed: boolean;
    fullcount?: string;
    toggle: boolean;
    typeId: string;
    marketId: string;
    fixturePeriodId: number;
}
