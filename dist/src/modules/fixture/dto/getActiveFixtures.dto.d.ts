import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class CustomQueryParametersCalidator implements ValidatorConstraintInterface {
    validate(value: string | string[]): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class ActiveFixtureDto {
    fixtureId: string;
    name: string;
    isLive: boolean;
    startTime: Date;
    currentPeriodId: string;
    currentPeriodName: string;
    competitionId: string;
    competitionName: string;
    sportIcon: string;
    competitionIdCMS: string;
}
export declare class GetActiveFixturesRequestDto {
    competitionTemplateId: string;
    page: number;
    fixtureId: string;
    size: number;
    direction: string;
    orderBy: string;
    contestTypes: string[];
    realMoneyState?: boolean;
    search: string;
}
export declare class WrappedGetActiveFixturesResponse {
    data: ActiveFixtureDto[];
}
