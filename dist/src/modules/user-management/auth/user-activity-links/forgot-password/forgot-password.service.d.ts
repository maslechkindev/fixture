import { TokensService } from 'modules/integrations/firebase/messages/tokens/tokens.service';
import { EventsService } from 'modules/integrations/firebase/messages/events/events.service';
import { ForgotPasswordRepository } from './forgot-password.repository';
import { User } from 'interfaces/user.interface';
import { FirebaseAuthService } from '../../firebase/firebase.auth.service';
export declare class ForgotPasswordService {
    private forgotPasswordRepository;
    private firebaseAuthService;
    private tokensService;
    private eventsService;
    constructor(forgotPasswordRepository: ForgotPasswordRepository, firebaseAuthService: FirebaseAuthService, tokensService: TokensService, eventsService: EventsService);
    isBlockedToRestore(email: string, ip: string): Promise<number>;
    createAndSetToken(email: string, ip: string): Promise<string>;
    getTokenInfo(token: string): Promise<import("../user-activity-links.type").LinkType>;
    changePassword(userData: Partial<User>, password: string): Promise<string>;
    private sendPasswordChangeEventToUserDevices;
}
