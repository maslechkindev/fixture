import { Knex } from 'modules/integrations/knex';
import { PaginationParams } from './users.types';
import { User } from 'interfaces/user.interface';
import { GetUserDto } from './dto/getUser.dto';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import UserBanRecord from 'interfaces/entities/userBanRecord';
import UserPremiumTermsRecord from 'interfaces/entities/userPremiumTermsRecord';
export declare class UsersRepository {
    private readonly knex;
    constructor(knex: Knex);
    getUsers(params: PaginationParams): Promise<Array<Partial<User> & {
        referrerId: string;
    }>>;
    getUsersPromocodeByReffererId(referrerId: string): Promise<string>;
    countUsers(): Promise<number>;
    getUser(params: GetUserDto): Promise<Partial<User> & {
        referrerId?: string;
    }>;
    getUserByUsername(id: string, username: string): Promise<boolean>;
    generateUsername(): Promise<string>;
    updateUser(id: User['id'], changedFields: Partial<User>): Promise<Partial<User>>;
    getBanRecordByUserId(userId: string, txManager?: TransactionManagerService): Promise<UserBanRecord>;
    getPremiumRecordByUserId(userId: string): Promise<UserPremiumTermsRecord>;
    banUser(userId: string, banReason: string, txManager?: TransactionManagerService): Promise<UserBanRecord>;
    unbanUser(id: string, unbanReason: string, txManager?: TransactionManagerService): Promise<UserBanRecord>;
    updatePremiumInfo(id: string, startTime: Date, endTime: Date): Promise<UserPremiumTermsRecord>;
    getConfirmedUsersCount(): Promise<number>;
    getUsedUsernamesCount(): Promise<number>;
    getUsernamePrefixCount(): Promise<number>;
}
