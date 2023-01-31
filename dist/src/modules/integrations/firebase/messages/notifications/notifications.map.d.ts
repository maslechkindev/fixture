import { NotificationType } from './types';
export declare const NOTIFICATIONS: {
    [key: string]: (messages: {
        [key: string]: string;
    }) => NotificationType;
};
