export interface CreateUserData {
    email: string;
    dateOfBirth: Date;
    passwordHash: string;
    salt: string;
    status: string;
    promoCode: string;
    username?: string;
    referralLink?: string;
    country: string;
    state: string;
}
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    salt: string;
    status: string;
    promoCode: string;
    referralLink?: string;
    isUsernameChanged: boolean;
    username?: string;
    createdAt?: Date;
    confirmedAt?: Date;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    isInfluencer?: boolean;
    notificationsEnabled?: boolean;
    deletedAt?: Date;
    country?: string;
    firstLoginPassed?: boolean;
    state?: string;
}
