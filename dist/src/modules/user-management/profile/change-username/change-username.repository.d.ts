import { Knex } from 'modules/integrations/knex';
import { BalanceService } from 'modules/balance/balance.service';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { Message } from 'modules/integrations/firebase/messages/notifications/types';
export declare class ChangeUsernameRepository {
    private readonly knex;
    private balanceService;
    constructor(knex: Knex, balanceService: BalanceService);
    isEditableByConfirmationTime(confirmedAt: Date): Promise<boolean>;
    change(txManager: TransactionManagerService, id: string, username: string): Promise<void>;
    isUsedByOtherUser(id: string, username: string): Promise<boolean>;
    getUsernameChangeReward(): Promise<any>;
    getUsersToNotifyAboutChangeUsername(): Promise<Array<Message>>;
}
