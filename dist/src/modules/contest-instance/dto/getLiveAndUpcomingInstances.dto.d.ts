import { myContestsType } from './activeContestInstances.dto';
import { ContestInstanceStatus } from '../enums/contestInstanceStatus.enum';
import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class CustomQueryStringArrayCheck implements ValidatorConstraintInterface {
    validate(value: string | string[]): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class GetLiveAndUpcomingInstanceResponseDto {
    competitionId: string;
    competitionName: string;
    currentPeriodId: string;
    currentPeriodName: string;
    fixtureId: string;
    isLive: boolean;
    name: string;
    sportIcon: string;
    status?: string;
    startTime: string;
    contestInstances: myContestsType[];
}
export declare class GetUserInstanceParamsDto {
    limit: number;
    page: number;
    statuses: Array<ContestInstanceStatus>;
}
export declare class GetUserInstanceResponseDto {
    success: boolean;
    data: Array<GetLiveAndUpcomingInstanceResponseDto>;
}
export declare class WrappedGetUserInstanceResponseDto {
    data: GetUserInstanceResponseDto;
}
