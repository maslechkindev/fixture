import { FirebaseDynamicLinksService } from 'modules/integrations/firebase/dynamic-links';
export declare class AccountConfirmationLinksService {
    private firebaseDynamicLinksService;
    constructor(firebaseDynamicLinksService: FirebaseDynamicLinksService);
    createConfirmationLink(token: string): Promise<string>;
}
