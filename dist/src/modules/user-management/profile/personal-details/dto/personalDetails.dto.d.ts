import { registrationType } from 'enums/registrationType';
export declare class PersonalDetailsDto {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    username: string;
}
export declare class PersonalDetailsInfoResponse {
    id: string;
    email: string;
    status: string;
    promoCode: string;
    username: string;
    avatar: string;
    firstName: string;
    lastName: string;
    confirmedAt: Date;
    dateOfBirth: Date;
    accountType: string;
    registrationType: registrationType;
    hasPassword: boolean;
    country: string;
    state: string;
}
export declare class WrappedPersonalDetailsInfoResponse {
    data: PersonalDetailsInfoResponse;
}
