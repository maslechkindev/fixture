import { PubsubMessage } from './pubsub-message.interface';
export declare type PubsubHandler = (message: PubsubMessage) => Promise<void>;
