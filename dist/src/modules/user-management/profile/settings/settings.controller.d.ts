import { SettingsService } from './settings.service';
import { UpdateNotificationsDto, UpdateNotificationsResponse } from './dto/updateNotificationSettings.dto';
import { User as UserType } from 'interfaces/user.interface';
import { DeactivateAccountResponseDto } from './dto/deactivateAccount.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    updateNotifications(user: UserType, updateNotificationsDto: UpdateNotificationsDto): Promise<UpdateNotificationsResponse>;
    deactivateAccount(user: UserType): Promise<DeactivateAccountResponseDto>;
}
