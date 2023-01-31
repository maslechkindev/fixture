import { AccountConfirmationRepository } from './account-confirmation.repository';
import { AccountConfirmationEmailService } from './account-confirmation-email.service';
import { AccountConfirmationLinksService } from './account-confirmation-links.service';
import { LinkType } from '../user-activity-links.type';
import { UserVerificationTokenData } from 'modules/user-management/auth/entry/email/signup/types/userVerificationTokenData.types';
export declare class AccountConfirmationService {
    private accountConfirmationEmailService;
    private accountConfirmationLinksService;
    private accountConfirmationRepository;
    constructor(accountConfirmationEmailService: AccountConfirmationEmailService, accountConfirmationLinksService: AccountConfirmationLinksService, accountConfirmationRepository: AccountConfirmationRepository);
    createAndSetEmailVerificationToken(email: string, ip?: string): Promise<string>;
    sendConfirmationEmail(email: string, token: string, templateId: string): Promise<void>;
    isBlockedToResendConfirmationLink(email: string, ip: string): Promise<number>;
    getVerifyAccountEmailTokenData(token: string): Promise<UserVerificationTokenData>;
    getLastValidTokenByEmail(email: string): Promise<LinkType>;
    deleteUserConfirmationEmailTokens(email: string): Promise<void>;
}
