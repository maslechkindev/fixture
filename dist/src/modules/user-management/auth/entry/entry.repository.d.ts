import { Knex } from 'modules/integrations/knex';
import { User, CreateUserData } from 'interfaces/user.interface';
import { BalanceService } from 'modules/balance/balance.service';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import UserBanRecord from 'interfaces/entities/userBanRecord';
export declare class EntryRepository {
    private readonly knex;
    private balanceService;
    constructor(knex: Knex, balanceService: BalanceService);
    getUserByEmail(email: string): Promise<User>;
    getUserByPromoCode(promoCode: string): Promise<User>;
    getUserByUserName(username: string): Promise<User>;
    getUserById(id: string): Promise<User>;
    createUser(txManager: TransactionManagerService, newUser: CreateUserData): Promise<User>;
    updateUserDataAfterAccountConfirmation(txManager: TransactionManagerService, email: string): Promise<User>;
    usedPromoCode(txManager: TransactionManagerService, userId: string, referralCode: string): Promise<string>;
    getBanRecordByUserId(userId: string, txManager?: TransactionManagerService): Promise<UserBanRecord>;
}
