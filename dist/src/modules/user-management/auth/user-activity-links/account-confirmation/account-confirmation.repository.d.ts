import { Knex } from 'modules/integrations/knex';
import { LinkType } from '../user-activity-links.type';
import { UserVerificationTokenData } from 'modules/user-management/auth/entry/email/signup/types/userVerificationTokenData.types';
export declare class AccountConfirmationRepository {
    private readonly knex;
    constructor(knex: Knex);
    setOrUpdateEmailVerificationToken(token: string, email: string, ip: string): Promise<void>;
    minutesBlocked(email: string, ip: string): Promise<number>;
    getVerifyAccountEmailTokenData(token: string): Promise<UserVerificationTokenData>;
    getLastValidTokenByEmail(email: string): Promise<LinkType>;
    deleteUserConfirmationEmailTokens(email: string): Promise<void>;
}
