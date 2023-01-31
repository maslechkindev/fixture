import { FirebaseAdminService } from 'modules/integrations/firebase/admin/firebase-admin.service';
import { Event, EventSendingOptions } from './types';
export declare class EventsService {
    private readonly firebaseAdminService;
    private messaging;
    constructor(firebaseAdminService: FirebaseAdminService);
    send(event: Event, sendingOptions: EventSendingOptions): Promise<void>;
    private getEnrichedMessageWithNotStoreOptions;
}
