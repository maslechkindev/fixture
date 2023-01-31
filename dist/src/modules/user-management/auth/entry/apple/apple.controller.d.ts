import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { AccountConfirmationService } from 'modules/user-management/auth/user-activity-links/account-confirmation/account-confirmation.service';
import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { AppleSSOService } from './apple.service';
import { AppleEntryDto } from './dto/entry.dto';
import { EntryCreatedResponseInterface } from './dto/entryResponse.interface';
import { TokenVerificationGetDTO } from './dto/tokenVerificationResponse.dto';
import { InfoScopeDTO } from './dto/infoScope.dto';
import { Request } from 'express';
export declare class AppleSSOController {
    private entryService;
    private accountConfirmationService;
    private appleSSOService;
    private firebaseAuthService;
    constructor(entryService: EntryService, accountConfirmationService: AccountConfirmationService, appleSSOService: AppleSSOService, firebaseAuthService: FirebaseAuthService);
    entry(req: Request, body: AppleEntryDto): Promise<EntryCreatedResponseInterface>;
    verify(body: InfoScopeDTO): Promise<TokenVerificationGetDTO>;
}
