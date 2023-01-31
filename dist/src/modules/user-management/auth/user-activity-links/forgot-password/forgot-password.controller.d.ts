import { Request } from 'express';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordEmailService } from './forgot-password-email.service';
import { ForgotPasswordLinksService } from './forgot-password-links.service';
import { ForgotPasswordRequestDto, ForgotPasswordVerifyDto } from './dto';
import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { ChangePasswordResponse } from './dto/changePasswordResponse.dto';
import { ChangeForgotPasswordDto } from './dto/changeForgotPassword.dto';
import { AccountConfirmationService } from 'modules/user-management/auth/user-activity-links/account-confirmation/account-confirmation.service';
export declare class ForgotPasswordController {
    private forgotPasswordService;
    private forgotPasswordEmailService;
    private forgotPasswordLinksService;
    private entryService;
    private firebaseAuthService;
    private accountConfirmationService;
    constructor(forgotPasswordService: ForgotPasswordService, forgotPasswordEmailService: ForgotPasswordEmailService, forgotPasswordLinksService: ForgotPasswordLinksService, entryService: EntryService, firebaseAuthService: FirebaseAuthService, accountConfirmationService: AccountConfirmationService);
    request(body: ForgotPasswordRequestDto, ip: string): Promise<{
        success: boolean;
    }>;
    verify(req: Request, body: ForgotPasswordVerifyDto): Promise<{
        success: boolean;
    }>;
    changePassword(req: Request, body: ChangeForgotPasswordDto): Promise<ChangePasswordResponse>;
}
