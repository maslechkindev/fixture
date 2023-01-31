import { Knex } from 'modules/integrations/knex';
import { LinkType } from '../user-activity-links.type';
import { User } from 'interfaces/user.interface';
export declare class ForgotPasswordRepository {
    private readonly knex;
    constructor(knex: Knex);
    minutesBlocked(email: string, ip: string): Promise<number>;
    setOrUpdateToken(token: string, email: string, ip: string): Promise<void>;
    getTokenInfo(token: string): Promise<LinkType>;
    getPreviousPasswords(userId: string): Promise<Array<{
        passwordHash: string;
        salt: string;
    }>>;
    changeUserPassword(userId: string, passwordHash: string, salt: string): Promise<Partial<User>>;
}
