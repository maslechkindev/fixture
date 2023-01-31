import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { User } from 'interfaces/user.interface';
import { LoginRepository } from './login.repository';
export declare class LoginService {
    private entryService;
    private loginRepository;
    constructor(entryService: EntryService, loginRepository: LoginRepository);
    checkPassword(password: string, user: User): Promise<unknown>;
    updateFirstLoginField(userId: string): import("knex").Knex.QueryBuilder<any, number>;
    verifyLoginAttempts(userId: string): Promise<boolean>;
    isManualLoginDisabled(userId: string): Promise<boolean>;
    resetLoginAttempts(userId: string): Promise<void>;
}
