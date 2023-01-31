import { FirebaseAuthService } from 'modules/user-management/auth/firebase/firebase.auth.service';
import { EntryService } from 'modules/user-management/auth/entry/entry.service';
import { LoginService } from './login.service';
import { LoginUserDto } from './dto/login.dto';
export declare class LoginController {
    private entryService;
    private loginService;
    private firebaseAuthService;
    constructor(entryService: EntryService, loginService: LoginService, firebaseAuthService: FirebaseAuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        email: string;
        customToken: string;
    }>;
}
