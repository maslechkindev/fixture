import { MailingModuleOptions, MailData } from '../interfaces/mailing-options.interface';
declare enum ContactFields {
    date_of_birth = "date_of_birth",
    registration_date = "registration_date",
    account_confirmation_date = "account_confirmation_date",
    unique_name = "unique_name"
}
export declare class MailingService {
    private readonly options;
    private etherealClient;
    private sendgridClient;
    private etherealActive;
    private sendgridApiClient;
    private readonly logger;
    constructor(options: MailingModuleOptions);
    private getAllCustomFields;
    private fieldsMapper;
    addUpdateContact(contact: {
        firstName?: string;
        lastName?: string;
        email: string;
        country?: string;
        state?: string;
        dateOfBirth?: string;
        registrationDate?: string;
        accountConfirmationDate?: string;
        username?: string;
    } & {
        [key in ContactFields]?: string;
    }): Promise<void>;
    removeContact(contact: {
        email: string;
    }): Promise<void>;
    send(mailData: MailData): Promise<void>;
}
export {};
