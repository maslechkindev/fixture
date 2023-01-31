import { EntryRepository } from 'modules/user-management/auth/entry/entry.repository';
import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class SignUpService {
    private entryService;
    private entryRepository;
    private transactionManager;
    constructor(entryService: EntryService, entryRepository: EntryRepository, transactionManager: TransactionManager);
    saveUser(createUserDto: {
        email: string;
        password: string;
        dateOfBirth: Date;
        country: string;
        state: string;
    }, usedPromoCode: string): Promise<import("interfaces/user.interface").User>;
}
