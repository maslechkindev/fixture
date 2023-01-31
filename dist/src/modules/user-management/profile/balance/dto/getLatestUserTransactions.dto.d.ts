import { TRANSACTION_CURRENCY_TYPE } from '../interfaces/transactions.interface';
import { UserTransaction } from './getUserTransactions.dto';
export declare class GetLatestUserTransactionsResponse extends UserTransaction {
    currencyType: TRANSACTION_CURRENCY_TYPE;
}
export declare class WrappedGetLatestUserTransactionsResponse {
    data: GetLatestUserTransactionsResponse;
}
