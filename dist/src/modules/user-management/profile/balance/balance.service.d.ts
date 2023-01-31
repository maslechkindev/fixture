import { CmsService } from 'modules/integrations/cms/cms.service';
import { TransactionsPaginationParamsWithFilters } from './interfaces/transactions.interface';
import { BalanceRepository } from './balance.repository';
export declare class BalanceService {
    private balanceRepository;
    private cmsService;
    constructor(balanceRepository: BalanceRepository, cmsService: CmsService);
    getLatestUserTransactions(userId: string, transactionsCount: number): Promise<(import("./dto/getLatestUserTransactions.dto").GetLatestUserTransactionsResponse | Omit<import("./dto/getLatestUserTransactions.dto").GetLatestUserTransactionsResponse, "balanceAmountAfter">)[]>;
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
}
