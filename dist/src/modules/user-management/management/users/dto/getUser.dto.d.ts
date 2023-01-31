import { User } from 'interfaces/user.interface';
import UserBanRecord from 'interfaces/entities/userBanRecord';
import UserPremiumTermsRecord from 'interfaces/entities/userPremiumTermsRecord';
import UserBalancesRecord from 'interfaces/entities/userBalancesRecord';
export declare class GetUserDto {
    id?: string;
    email?: string;
    promoCode?: string;
}
export declare class GetUserResponseDto {
    user: Partial<User> & {
        referralCodeUsed: string;
    };
    banInfo: UserBanRecord;
    premiumInfo: UserPremiumTermsRecord;
    balanceInfo: UserBalancesRecord;
}
export declare class WrappedGetUserResponseDto {
    data: GetUserResponseDto;
}
