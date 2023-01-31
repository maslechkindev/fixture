import { PrizeWinnerShare } from 'interfaces/db/tables';
import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class CustomQueryStringArrayCheck implements ValidatorConstraintInterface {
    validate(value: string | string[]): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class ActiveContestInstancesDto {
    fixtureId: string;
    periodId?: string;
    limit?: number;
    contestTypes?: string[];
}
export declare class ContestInstanceEntity {
    templateId: string;
    contestId: string;
    instanceId: string;
    instanceNumber: number;
    instanceName: string;
    type: string;
    currentParticipants: number;
    maxParticipants: number | null;
    entryCurrency: string;
    entryFee: number;
    prizeAmount: string;
    prizeType: string;
    periodId?: string;
    periodName?: string;
    isParticipant: boolean;
    status?: string;
}
export declare type myContestsType = Pick<ContestInstanceEntity, 'contestId' | 'templateId' | 'instanceId' | 'instanceName' | 'instanceNumber' | 'entryFee' | 'entryCurrency' | 'type' | 'currentParticipants' | 'maxParticipants' | 'isParticipant' | 'prizeAmount' | 'prizeType' | 'status'> & {
    prize?: string | number;
    place?: string;
    userRegistrationTime?: Date;
    prizeWinnerShare?: PrizeWinnerShare;
};
export declare class ActiveContestInstancesResponseDto {
    periodName: string;
    periodId: string;
    count: number;
    contestInstances: ContestInstanceEntity[];
}
export declare class WrappedActiveContestInstancesResponseDto {
    data: ActiveContestInstancesResponseDto[];
}
