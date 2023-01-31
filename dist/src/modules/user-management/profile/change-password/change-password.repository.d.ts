import { Knex } from 'modules/integrations/knex';
import { User } from 'interfaces/user.interface';
export declare class ChangePasswordRepository {
    private readonly knex;
    constructor(knex: Knex);
    getUserById(id: string): Promise<User>;
    getPreviousPasswords(userId: string): Promise<Array<{
        passwordHash: string;
        salt: string;
    }>>;
    changePassword(userId: string, passwordHash: string, salt: string): Promise<Partial<User>>;
}
