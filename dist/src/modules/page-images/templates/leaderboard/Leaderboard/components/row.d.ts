export declare enum PrizeCurrency {
    realMoney = "realMoney",
    tokens = "tokens"
}
export declare const leaderboardRow: ({ place, userName, totalPoints, prizeCurrency, prizeAmountOrTangible, isUser, }: {
    place: string;
    userName: string;
    totalPoints: string;
    prizeCurrency?: PrizeCurrency;
    prizeAmountOrTangible: string | number;
    isUser: boolean;
}) => string;
