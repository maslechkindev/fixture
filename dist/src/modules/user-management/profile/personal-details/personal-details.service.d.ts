import { PersonalDetailsRepository } from './personal-details.repository';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { PersonalDetailsDto, PersonalDetailsInfoResponse } from './dto/personalDetails.dto';
import { User as UserType } from 'interfaces/user.interface';
import { userAccountType } from 'enums/userStatus';
import { MailingService } from '../../../integrations/mailing';
export declare class PersonalDetailsService {
    private personalDetailsRepository;
    private transactionManager;
    private mailingClient;
    constructor(personalDetailsRepository: PersonalDetailsRepository, transactionManager: TransactionManager, mailingClient: MailingService);
    getReferrerUsername(promoCode: string): import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: true;
        _keys: "users.username";
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: undefined;
    }>;
    checkIfFieldsEditable(personalDetails: PersonalDetailsDto, user: UserType): Promise<boolean>;
    private convertPersonalDetailsInfo;
    updateUserPersonalDetailsInfo(personalDetails: PersonalDetailsDto, userId: string): Promise<void>;
    getAccountType(userId: string): Promise<userAccountType>;
    getUserById(userId: string): Promise<UserType>;
    getPersonalDetails(user: UserType): Promise<PersonalDetailsInfoResponse>;
    private getRegistrationType;
    private getHasPassword;
    getFollowersListInfo(userId: string, listOfFollowers: Array<string>): Promise<any[]>;
}
