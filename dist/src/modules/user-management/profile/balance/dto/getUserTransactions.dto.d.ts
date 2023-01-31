declare class GetUserTransactionsPaginationQueryParams {
    page: number;
    pageSize: number;
}
export declare class GetUserTransactionsQueryDto extends GetUserTransactionsPaginationQueryParams {
    startDate?: string;
    endDate?: string;
}
export declare class UserTransaction {
    name: string;
    id: string;
    createdAt: string;
    amount: string;
    balanceAmountAfter: string;
}
export declare class GetUserTransactionsResponse {
    transactions: UserTransaction[];
    itemsTotalCount: number;
}
export declare class WrappedGetUserTransactionsResponse {
    data: GetUserTransactionsResponse;
}
export {};
