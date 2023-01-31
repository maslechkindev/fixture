import { Knex } from 'modules/integrations/knex';
export declare class TokensRepository {
    private readonly knex;
    constructor(knex: Knex);
    add(userId: string, token: string): Promise<void>;
    update(userId: string, newToken: string, oldToken: string): Promise<void>;
    remove(userId: string, token: string): Promise<void>;
    getUserTokens(userId: string, tokensToOmit?: Array<string>): Promise<Array<string>>;
}
