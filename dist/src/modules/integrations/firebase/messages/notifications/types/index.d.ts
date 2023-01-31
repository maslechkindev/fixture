import { EventType, MessageType } from 'modules/integrations/firebase/messages/types';
export declare type NotificationType = {
    notification: {
        title: string;
        body: string;
        imageUrl?: string;
    };
    data: {
        buttonName: string;
        messageType: MessageType;
        eventType: EventType;
        link?: string;
        imageUrl?: string;
        imageLogo: string;
        iconRead: string;
        iconUnread: string;
        imageBanner?: string;
    };
    webpush: {
        fcmOptions: {
            link: string;
        };
    };
};
export declare type FirestoreNotificationRecordType = NotificationType & {
    createdAt: number;
    read: boolean;
};
export declare type PushNotificationRecordType = Omit<NotificationType, 'data'> & {
    data: {
        messageId: string;
        link?: string;
        promoImageUrl?: string;
    };
    tokens: Array<string>;
};
export declare type Message = {
    tokens: Array<string>;
    userId: string;
    notificationsEnabled: boolean;
    data: {
        [key: string]: string;
    };
};
export declare enum NotificationEnumType {
    CHANGE_USERNAME_AND_GET_BONUS = "CHANGE_USERNAME_AND_GET_BONUS",
    CHANGE_CONTEST_INSTANCE_STATUS_IN_QUEUE = "CHANGE_CONTEST_INSTANCE_STATUS_IN_QUEUE",
    CHANGE_CONTEST_INSTANCE_STATUS_IN_PROGRESS = "CHANGE_CONTEST_INSTANCE_STATUS_IN_PROGRESS",
    CHANGE_CONTEST_INSTANCE_STATUS_FINISHED = "CHANGE_CONTEST_INSTANCE_STATUS_FINISHED",
    CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_DUE_TO_MIN_PARTICIPANTS_NOT_REACHED = "CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_DUE_TO_MIN_PARTICIPANTS_NOT_REACHED",
    CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_MISSING_ACTIVE_MARKETS = "CHANGE_CONTEST_INSTANCE_STATUS_CANCELLED_MISSING_ACTIVE_MARKETS",
    FREE_BET_START = "FREE_BET_START",
    OUTCOME_STATUS_CHANGED = "OUTCOME_STATUS_CHANGED",
    OUTCOME_WON = "OUTCOME_WON",
    EXCLUDED_FROM_THE_CONTEST = "EXCLUDED_FROM_THE_CONTEST",
    CONTEST_CANCELLED_BY_ADMIN = "CONTEST_CANCELLED_BY_ADMIN"
}
