import { FirebaseDynamicLinksService } from 'modules/integrations/firebase/dynamic-links';
export declare class ForgotPasswordLinksService {
    private firebaseDynamicLinksService;
    constructor(firebaseDynamicLinksService: FirebaseDynamicLinksService);
    create(token: string): Promise<string>;
}
