import UserPremiumTermsRecord from 'interfaces/entities/userPremiumTermsRecord';
export declare class SetPremiumTermsDto {
    id: string;
    startTime: string;
    endTime: string;
}
export declare class SetPremiumTermsResponseDto {
    success: boolean;
    record: UserPremiumTermsRecord;
}
export declare class WrappedSetPremiumTermsResponseDto {
    data: SetPremiumTermsResponseDto;
}
