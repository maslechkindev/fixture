export declare class PlaceBetDto {
    contestInstanceId: string;
    marketLineId: string;
    betAmount: number;
    americanOdds: number;
    winAmount: number;
    isForcedBet: boolean;
}
export declare class PlaceBetResponseDto {
    success: true;
}
export declare class WrappedPlaceBetResponseDto {
    data: PlaceBetResponseDto;
}
