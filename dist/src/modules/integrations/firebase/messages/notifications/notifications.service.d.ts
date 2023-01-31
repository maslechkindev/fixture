import { FirebaseAdminService } from 'modules/integrations/firebase/admin/firebase-admin.service';
import { FirestoreService } from 'modules/integrations/firebase/firestore/firestore.service';
import { NotificationType, Message } from './types';
export declare class NotificationsService {
    private readonly firestoreService;
    private readonly firebaseAdminService;
    private messaging;
    constructor(firestoreService: FirestoreService, firebaseAdminService: FirebaseAdminService);
    sendSpecific(notification: NotificationType, tokens: Array<string>, userId: string, notificationsEnabled: boolean): Promise<void>;
    sendBatch(messages: Array<Message>, notificationName: string): Promise<void>;
    read(userId: string, messageId: string): Promise<void>;
    private enrichNotificationToFirestore;
    private enrichNotificationToPush;
}
