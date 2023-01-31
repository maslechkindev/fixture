import { Knex } from 'modules/integrations/knex';
import { User } from 'interfaces/user.interface';
export declare class AuthMiddlewareRepository {
    private readonly knex;
    constructor(knex: Knex);
    getUserById(id: string): Promise<User>;
}
