import { TokensService } from 'modules/integrations/firebase/messages/tokens/tokens.service';
import { EventsService } from 'modules/integrations/firebase/messages/events/events.service';
import { ChangePasswordRepository } from './change-password.repository';
import { FirebaseAuthService } from '../../auth/firebase/firebase.auth.service';
import { User } from 'interfaces/user.interface';
export declare class ChangePasswordService {
    private profileRepository;
    private firebaseAuthService;
    private tokensService;
    private eventsService;
    constructor(profileRepository: ChangePasswordRepository, firebaseAuthService: FirebaseAuthService, tokensService: TokensService, eventsService: EventsService);
    checkPassword(user: User, password: string): Promise<unknown>;
    changePassword(userId: string, password: string, initiatorFcmToken?: string): Promise<string>;
    private sendPasswordChangeEventToUserDevices;
}
