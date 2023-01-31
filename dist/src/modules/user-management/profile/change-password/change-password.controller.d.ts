import { ChangePasswordService } from './change-password.service';
import { User as UserType } from 'interfaces/user.interface';
import { ChangePasswordDto, ChangePasswordResponse } from './dto/change-password.dto';
export declare class ChangePasswordController {
    private readonly changePasswordService;
    constructor(changePasswordService: ChangePasswordService);
    changePassword(changePasswordData: ChangePasswordDto, user: UserType): Promise<ChangePasswordResponse>;
}
