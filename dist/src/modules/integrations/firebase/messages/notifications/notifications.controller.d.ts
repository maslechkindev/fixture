import { TokensService } from '../tokens/tokens.service';
import { User as UserType } from 'interfaces/user.interface';
import { NotificationsService } from './notifications.service';
import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { ReadNotificationDto, ReadNotificationResponseDto } from './dto/readNotification.dto';
import { SendNotificationDto, SendNotificationResponseDto } from './dto/sendNotification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly tokensService;
    private readonly entryService;
    constructor(notificationsService: NotificationsService, tokensService: TokensService, entryService: EntryService);
    read(user: UserType, body: ReadNotificationDto): Promise<ReadNotificationResponseDto>;
    pushSender(body: SendNotificationDto): Promise<SendNotificationResponseDto>;
}
