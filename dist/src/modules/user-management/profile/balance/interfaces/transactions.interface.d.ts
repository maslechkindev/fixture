export declare enum TRANSACTION_CURRENCY_TYPE {
    TOKEN = "token",
    REAL_MONEY = "real_money",
    FINANCIAL = "financial"
}
export interface BaseUserTransaction {
    id: string;
    type: string;
    createdAt: string;
    amount: string;
    balanceAmountAfter: string;
    meta: Record<string, string>;
}
export interface UserTransactionsListItem extends BaseUserTransaction {
    itemsTotalCount: number;
}
export interface LatestUserTransactionsListItem extends BaseUserTransaction {
    currencyType: TRANSACTION_CURRENCY_TYPE;
}
export interface TransactionsPaginationParamsWithFilters {
    pagination: {
        page: number;
        size: number;
    };
    filters: {
        startDate?: string;
        endDate?: string;
    };
}
