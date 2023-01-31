import { MailingService } from 'modules/integrations/mailing';
export declare class AccountConfirmationEmailService {
    private mailingClient;
    constructor(mailingClient: MailingService);
    sendConfirmationEmail(to: string, link: string, templateId: string): Promise<void>;
}
