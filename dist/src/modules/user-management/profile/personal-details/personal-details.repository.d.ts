import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { personalDetailsUpdateType } from './types/personalDetailsUpdate';
import { BalanceService } from 'modules/balance/balance.service';
import UserPremiumTermsRecord from 'interfaces/entities/userPremiumTermsRecord';
import { User as UserType } from 'interfaces/user.interface';
export declare class PersonalDetailsRepository {
    private readonly knex;
    private balanceService;
    constructor(knex: Knex, balanceService: BalanceService);
    getReferrerUsername(promoCode: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: "users.username";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    updateUserPersonalDetailsInfo(txManager: TransactionManagerService, fieldsToUpdate: personalDetailsUpdateType, userId: string): Promise<{
        id: string;
        firstName?: string;
        lastName?: string;
        dateOfBirth?: string;
        email?: string;
        username?: string;
    }>;
    getPremiumRecordByUserId(userId: string): Promise<UserPremiumTermsRecord>;
    getUserById(id: string): Promise<UserType>;
    isUserRegistrateBy3rdParty(userId: string): Promise<boolean>;
    isFollowed(userId: string, followers: Array<string>): Promise<any[]>;
    checkIsAllFollowersValid(followersIds: Array<string>): Promise<{
        [k: string]: string | number;
    }[]>;
}
