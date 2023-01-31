import { Knex } from 'modules/integrations/knex';
import { LoginAttempts } from './types/login.types';
import { Knex as KnexNamespace } from 'knex';
export declare class LoginRepository {
    private readonly knex;
    constructor(knex: Knex);
    updateFirstLoginField(userId: string): KnexNamespace.QueryBuilder<any, number>;
    incrementLoginAttempts(userId: string): Promise<number>;
    currentLoginAttempts(userId: string): Promise<LoginAttempts>;
    setLoginAttempts(userId: string, attempts: number): KnexNamespace.QueryBuilder<any, number>;
}
