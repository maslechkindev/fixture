export declare type LinkType = {
    id: string;
    email: string;
    token: string;
    deviceIdentifier: string;
    createdAt: Date;
    expiredAt: Date;
    type: 'forgot_password' | 'confirmation_email';
};
