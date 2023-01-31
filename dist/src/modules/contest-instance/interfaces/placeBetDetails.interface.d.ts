export interface PlaceBetDetails {
    marketLineId: string;
    lineName: string;
    marketId: string;
    marketName: string;
    americanOdds: number;
    betAmount: number;
    winAmount: number;
    contestInstanceId: string;
    contestId: string;
    userId: string;
    currentMaxBetLimit: number;
    isForcedBet?: boolean;
}
