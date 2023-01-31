import { EventType, MessageType } from '../../types';
export interface Event {
    eventType: EventType;
    messageType: MessageType;
}
export interface EventSendingOptions {
    fcmTokensToSend: Array<string>;
    notStoreEvent?: boolean;
}
