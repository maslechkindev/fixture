import { BetStatus } from '../enums/betStatus';
export declare class getUserBetsResponseDto {
    marketName: string;
    lineName: string;
    americanOdds: number;
    winAmount: number;
    betAmount: number;
    forcedBet: boolean;
    betTime: Date;
    betOutcome?: number;
}
export declare class getUserBetsDto {
    status: BetStatus;
    contestInstanceId: string;
    participantId: string;
    page: number;
    size: number;
    sortField?: string;
}
export declare class WrappedGetUserBetsResponseDto {
    data: getUserBetsResponseDto[];
}
