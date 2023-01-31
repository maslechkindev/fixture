export declare class ChangePasswordDto {
    new: string;
    current: string;
    initiatorFcmToken?: string;
}
export declare class ChangePasswordResponse {
    success: boolean;
    customToken: string;
}
export declare class WrappedChangePasswordResponse {
    data: ChangePasswordResponse;
}
