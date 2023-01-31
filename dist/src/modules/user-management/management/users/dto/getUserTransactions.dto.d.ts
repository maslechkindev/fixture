import TransactionsListInterface from 'modules/balance/interfaces/transactionsList.interface';
export declare class GetUserTransactionsResponseDto {
    userTransactions: Array<Partial<TransactionsListInterface>>;
    count: number;
}
export declare class WrappedGetUserTransactionsResponseDto {
    data: GetUserTransactionsResponseDto;
}
