export declare type SaveUserAndCreateAccountType = {
    userId: string;
    notificationsEnabled: boolean;
};
export declare type GoogleAccountType = {
    id: string;
    userId?: string;
};
export declare type UserAccountType = {
    email: string;
    status: string;
    promoCode: string;
    confirmedAt?: Date;
};
