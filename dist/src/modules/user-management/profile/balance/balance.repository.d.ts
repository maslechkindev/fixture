import { Knex } from 'modules/integrations/knex';
import { TransactionsPaginationParamsWithFilters } from './interfaces/transactions.interface';
import { GetLatestUserTransactionsResponse } from './dto/getLatestUserTransactions.dto';
export declare class BalanceRepository {
    private readonly knex;
    private autoTransactionTypeToName;
    constructor(knex: Knex);
    private transactionNamesSetter;
    private balanceAmountAfterRemover;
    getLatestUserTransactions(userId: string, latestTransactionsCount: number, skipRealMoneyTransactions: boolean): Promise<(GetLatestUserTransactionsResponse | Omit<GetLatestUserTransactionsResponse, "balanceAmountAfter">)[]>;
    getUserTokenTransactions(userId: string, params: TransactionsPaginationParamsWithFilters): Promise<{
        transactions: {
            name: string;
            id: string;
            createdAt: string;
            amount: string;
            balanceAmountAfter: string;
        }[];
        itemsTotalCount: number;
    }>;
    getUserRealMoneyTransactions(userId: string, params: TransactionsPaginationParamsWithFilters): Promise<{
        transactions: {
            name: string;
            id: string;
            createdAt: string;
            amount: string;
            balanceAmountAfter: string;
        }[];
        itemsTotalCount: number;
    }>;
    private getTransactionName;
    private getQueryUserTokenTransactions;
    private getQueryUserRealMoneyTransactions;
}
