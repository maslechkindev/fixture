import { Currency } from 'enums/currency';
export declare type getContestInstanceParticipantsDto = {
    contestInstanceId: string;
    contestId: string;
    userId: string;
    bankrollBalance: number;
    totalBalance: number;
    contestName: string;
    entryFee: number;
    currency: Currency;
    fixtureName: string;
};
