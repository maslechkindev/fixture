import { ContestInstanceStatus } from '../enums/contestInstanceStatus.enum';
import { Currency } from '../../../enums/currency';
import { ContestPrizeType } from 'modules/contest/enums/contestPrizeType.enum';
import { PrizeWinnerShare } from 'interfaces/db/tables';
export interface ContestInstanceDetailsInterface {
    instanceName: string;
    status: ContestInstanceStatus;
    contestId: string;
    contestName: string;
    maxParticipants: number | null;
    minParticipants: number;
    entryFee: number;
    currency: Currency;
    contestLeavingAllowed?: boolean;
    leavingAllowed?: boolean;
    bankrollAmount: number;
    registrationStartTime?: number;
    registrationStartPeriodId?: string;
    startTime: Date;
    rootPeriodId: string;
    currentPeriodId: string;
    instanceNumber: number;
    fixtureId: string;
    lateEntryPeriodId?: string;
    lateEntryPeriodPassed?: string;
    cmsContestTemplateId?: number;
    prizeType?: ContestPrizeType;
    currentParticipants?: number;
    prizeWinnerShare?: PrizeWinnerShare;
    balanceLong?: boolean;
    fixtureName: string;
}
export declare type ExtendableInstanceDetailsInterface = Partial<ContestInstanceDetailsInterface> & {
    entryFeeDetails: {
        entryFee: number;
        currency: 'token';
    };
};
