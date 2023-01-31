import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { SignUpService } from './signUp.service';
import { CreateUserDto, ResendEmailConfirmationLinkDto, VerifyAccountEmailDto } from './dto';
import { User as UserType } from 'interfaces/user.interface';
import { AccountConfirmationService } from 'modules/user-management/auth/user-activity-links/account-confirmation/account-confirmation.service';
import { Request } from 'express';
import { EntryResponseDTO } from 'modules/user-management/auth/entry/facebook/dto/entryResponse.dto';
export declare class SignUpController {
    private entryService;
    private signUpService;
    private firebaseAuthService;
    private accountConfirmationService;
    constructor(entryService: EntryService, signUpService: SignUpService, firebaseAuthService: FirebaseAuthService, accountConfirmationService: AccountConfirmationService);
    signUpWithEmail(createUserDto: CreateUserDto): Promise<{
        email: string;
    }>;
    getLocations(): Promise<{
        [country: string]: {
            [state: string]: {
                allowed: boolean;
            };
        };
    }>;
    resendEmailVerificationLink(body: ResendEmailConfirmationLinkDto, ip: string): Promise<{
        success: boolean;
    }>;
    verifyAccountEmailAddress(req: Request, body: VerifyAccountEmailDto): Promise<EntryResponseDTO>;
    getUserCustomToken(user: UserType): Promise<{
        customToken: string;
    }>;
}
