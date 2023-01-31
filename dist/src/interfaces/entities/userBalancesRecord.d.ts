declare type UserBalancesRecord = {
    real_money: {
        id: string;
        userId: string;
        amount: string;
        updatedAt: Date;
    };
    tokens: {
        id: string;
        userId: string;
        amount: string;
        updatedAt: Date;
    };
};
export default UserBalancesRecord;
