import { Request } from 'express';
import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { AccountConfirmationService } from 'modules/user-management/auth/user-activity-links/account-confirmation/account-confirmation.service';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { FacebookSSOService } from './facebook.service';
import { FacebookEntryDto } from './dto/entry.dto';
import { InfoScopeDTO } from './dto/infoScope.dto';
import { TokenVerificationGetDTO } from './dto/tokenVerificationResponse.dto';
import { EntryResponseDTO } from './dto/entryResponse.dto';
export declare class FacebookSSOController {
    private entryService;
    private accountConfirmationService;
    private facebookSSOService;
    private firebaseAuthService;
    constructor(entryService: EntryService, accountConfirmationService: AccountConfirmationService, facebookSSOService: FacebookSSOService, firebaseAuthService: FirebaseAuthService);
    entry(req: Request, body: FacebookEntryDto): Promise<EntryResponseDTO>;
    verify(body: InfoScopeDTO): Promise<TokenVerificationGetDTO>;
}
