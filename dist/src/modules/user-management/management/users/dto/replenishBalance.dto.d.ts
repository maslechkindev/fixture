import UserBalancesRecord from 'interfaces/entities/userBalancesRecord';
import { RecursivePartial } from 'helpers/recursivePartial';
declare class ReplenishEntry {
    amount: number;
    reason: string;
}
export declare class ReplenishBalanceDto {
    tokens: ReplenishEntry;
    real_money: ReplenishEntry;
    userId: string;
    createdBy: number;
}
export declare class ReplenishBalanceResponseDto {
    success: boolean;
    balances: RecursivePartial<UserBalancesRecord>;
}
export declare class WrappedReplenishBalanceResponseDto {
    data: ReplenishBalanceResponseDto;
}
export {};
