import { ChangeUsernameRepository } from './change-username.repository';
import { User } from 'interfaces/user.interface';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { NotificationsService } from 'modules/integrations/firebase/messages/notifications/notifications.service';
import { ContestInstanceParticipantsService } from 'modules/contest-instance/contest-instance-participants/contest-instance-participants.service';
export declare class ChangeUsernameService {
    private changeUsernameRepository;
    private transactionManager;
    private notificationsService;
    private contestInstanceParticipantService;
    constructor(changeUsernameRepository: ChangeUsernameRepository, transactionManager: TransactionManager, notificationsService: NotificationsService, contestInstanceParticipantService: ContestInstanceParticipantsService);
    isEditable(user: User): Promise<boolean>;
    getUsernameNotEditableDate(user: User, isUsernameEditable: boolean): Date;
    change(user: User, username: string): Promise<void>;
    isUsedByOtherUser(user: User, username: string): Promise<boolean>;
    notifyUsernameChange(): Promise<void>;
}
