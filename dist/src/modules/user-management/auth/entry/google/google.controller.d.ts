import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { GoogleSSOService } from './google.service';
import { GoogleVerifyEmailDto } from './dto/verifyEmail.dto';
import { GoogleEntryDto } from './dto/entry.dto';
import { TokenVerificationGetDTO } from './dto/tokenVerificationResponse.dto';
import { Request } from 'express';
import { EntryResponseDTO } from './dto/entryResponse.dto';
export declare class GoogleSSOController {
    private entryService;
    private googleSSOService;
    private firebaseAuthService;
    constructor(entryService: EntryService, googleSSOService: GoogleSSOService, firebaseAuthService: FirebaseAuthService);
    private createUser;
    entry(req: Request, body: GoogleEntryDto): Promise<EntryResponseDTO>;
    verify(body: GoogleVerifyEmailDto): Promise<TokenVerificationGetDTO>;
}
