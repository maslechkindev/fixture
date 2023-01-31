import { FirestoreTransactionOptions } from 'modules/integrations/firebase/firestore/interfaces/firestoreTransactionOptions';
import { BalanceRepository } from './balance.repository';
import { FirestoreService } from '../integrations/firebase/firestore/firestore.service';
import { TransactionManager, TransactionManagerService } from '../ancillary/transaction-manager/transaction-manager.service';
import { CmsService } from '../integrations/cms/cms.service';
import UserTokensBalanceRecord from '../../interfaces/entities/userTokensBalanceRecord';
import UserRealMoneyBalanceRecord from '../../interfaces/entities/userRealMoneyBalanceRecord';
import TransactionsListInterface from './interfaces/transactionsList.interface';
import { ReplenishBalanceDto } from '../user-management/management/users/dto/replenishBalance.dto';
import UserBalancesRecord from 'interfaces/entities/userBalancesRecord';
import { RecursivePartial } from 'helpers/recursivePartial';
import { QueryParamsDTO } from '../user-management/management/users/dto/queryParams.dto';
import { FiltersDto } from '../user-management/management/users/dto/filters.dto';
import { BalanceChangeDetails } from './interfaces/balanceChangeDetails.interface';
export declare class BalanceService {
    private firestoreService;
    private balanceRepository;
    private cmsService;
    private transactionManager;
    private readonly logger;
    constructor(firestoreService: FirestoreService, balanceRepository: BalanceRepository, cmsService: CmsService, transactionManager: TransactionManager);
    setupTokenBalance(txManager: TransactionManagerService, userId: string): Promise<string>;
    setupRealMoneyBalance(txManager: TransactionManagerService, userId: string): Promise<string>;
    syncFirestoreUsersBalances(txManager: TransactionManagerService, userIds: Array<string>, options?: FirestoreTransactionOptions): Promise<void[]>;
    rewardTransactions(txManager: TransactionManagerService, userId: string): Promise<void>;
    promoCodeUsedReward(txManager: TransactionManagerService, userId: string): Promise<string>;
    changeUsernameReward(txManager: TransactionManagerService, userId: string): Promise<void>;
    fillPersonalDetailsReward(txManager: TransactionManagerService, userId: string): Promise<void>;
    getBalanceRecordByUserId(userId: string): Promise<{
        tokenBalance: UserTokensBalanceRecord;
        realMoneyBalance: UserRealMoneyBalanceRecord;
    }>;
    getUserTransactions(userId: string, params: QueryParamsDTO, filters: FiltersDto): Promise<Array<TransactionsListInterface>>;
    changeBalance(txManager: TransactionManagerService, balanceChangeDetailsDetails: BalanceChangeDetails): Promise<number>;
    manualReplenishUserBalance(replenish: ReplenishBalanceDto): Promise<RecursivePartial<UserBalancesRecord>>;
}
