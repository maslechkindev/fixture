import UserBanRecord from 'interfaces/entities/userBanRecord';
export declare class BanUserDto {
    id: string;
    reason: string;
}
export declare class BanUserResponseDto {
    success: boolean;
    record: UserBanRecord;
}
export declare class WrappedBanUserResponseDto {
    data: BanUserResponseDto;
}
