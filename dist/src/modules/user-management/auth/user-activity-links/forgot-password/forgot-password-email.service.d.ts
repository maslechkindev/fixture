import { MailingService } from 'modules/integrations/mailing';
export declare class ForgotPasswordEmailService {
    private mailingClient;
    constructor(mailingClient: MailingService);
    send(to: string, link: string, userName: string, templateId: string): Promise<void>;
}
