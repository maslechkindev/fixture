declare type UserBanRecord = {
    id: string;
    userId: string;
    banReason: string;
    bannedAt: Date;
    unbanReason: string;
    unbannedAt: Date;
};
export default UserBanRecord;
