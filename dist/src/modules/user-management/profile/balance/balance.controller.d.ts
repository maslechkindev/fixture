import { User as UserType } from 'interfaces/user.interface';
import { BalanceService } from './balance.service';
import { GetLatestUserTransactionsResponse } from './dto/getLatestUserTransactions.dto';
import { GetUserTransactionsResponse, GetUserTransactionsQueryDto } from './dto/getUserTransactions.dto';
export declare class BalanceController {
    private balanceService;
    constructor(balanceService: BalanceService);
    getLatestUserTransactions({ id: userId }: Pick<UserType, 'id'>): Promise<Array<GetLatestUserTransactionsResponse | Omit<GetLatestUserTransactionsResponse, 'balanceAmountAfter'>>>;
    getUserTokenTransactions({ id: userId }: Pick<UserType, 'id'>, query: GetUserTransactionsQueryDto): Promise<GetUserTransactionsResponse>;
    getUserRealMoneyTransactions({ id: userId }: Pick<UserType, 'id'>, query: GetUserTransactionsQueryDto): Promise<{
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
