import { TransactionManagerService } from '../ancillary/transaction-manager/transaction-manager.service';
import { Knex } from 'modules/integrations/knex';
import UserTokensBalanceRecord from '../../interfaces/entities/userTokensBalanceRecord';
import UserRealMoneyBalanceRecord from '../../interfaces/entities/userRealMoneyBalanceRecord';
import TransactionsListInterface from './interfaces/transactionsList.interface';
import { ReplenishBalanceDto } from '../user-management/management/users/dto/replenishBalance.dto';
import UserBalancesRecord from 'interfaces/entities/userBalancesRecord';
import { RecursivePartial } from 'helpers/recursivePartial';
import { QueryParamsDTO } from '../user-management/management/users/dto/queryParams.dto';
import { FiltersDto } from '../user-management/management/users/dto/filters.dto';
import { BalanceChangeDetails } from './interfaces/balanceChangeDetails.interface';
export declare enum TRANSACTION_TYPES {
    TD_SIGN_UP = "TD_sign_up",
    TD_REFERRAL_CODE_SIGN_UP = "TD_referral_code_sign_up",
    TD_REFERRAL = "TD_referral",
    TD_USERNAME = "TD_username",
    TD_PERSONAL_DETAILS = "TD_personal_details",
    MANUAL = "manual",
    TD_PURCHASE_CARD = "TD_purchase_card"
}
export declare enum TRANSACTION_STATUS {
    PENDING = 0,
    RESOLVED = 1
}
export declare class BalanceRepository {
    private readonly knex;
    private readonly logger;
    constructor(knex: Knex);
    setupTokenBalance(txManager: TransactionManagerService, userId: string): Promise<string>;
    setupRealMoneyBalance(txManager: TransactionManagerService, userId: string): Promise<string>;
    setupRewardTransactions(txManager: TransactionManagerService, userId: string): Promise<void>;
    promoCodeUsedReward(txManager: TransactionManagerService, userId: string): Promise<string>;
    changeUsernameReward(txManager: TransactionManagerService, userId: string): Promise<void>;
    fillPersonalDetailsReward(txManager: TransactionManagerService, userId: string): Promise<void>;
    makeTokenTransactionAndUpdateBalance(txManager: TransactionManagerService, type: string, status: number, amount: number, balanceId: string, meta?: Record<string, string>): Promise<void>;
    getUserBalancesAmounts(txManager: TransactionManagerService, userId: string, ignoreRealMoneyState: boolean, realMoneyState?: boolean): Promise<{
        tokenBalance: string;
        realMoneyBalance: string;
    }>;
    getUserBalances(txManager: TransactionManagerService, userId: string, ignoreRealMoneyState: boolean, realMoneyState?: boolean, roundAmounts?: boolean): Promise<{
        tokenBalance: UserTokensBalanceRecord;
        realMoneyBalance: UserRealMoneyBalanceRecord;
    }>;
    getUserTransactions(userId: string, params: QueryParamsDTO, filters: FiltersDto, ignoreRealMoneyState: boolean, realMoneyState?: boolean, roundAmounts?: boolean): Promise<Array<TransactionsListInterface>>;
    changeBalance(txManager: TransactionManagerService, balanceChangeDetails: BalanceChangeDetails): Promise<number>;
    createTransactionAndUpdateBalance(txManager: TransactionManagerService, userId: string, field: string, type: TRANSACTION_TYPES, amount: number, status: number, meta?: Record<string, string | number>): Promise<number>;
    manualReplenishUserBalance(txManager: TransactionManagerService, replenish: ReplenishBalanceDto): Promise<RecursivePartial<UserBalancesRecord>>;
}
