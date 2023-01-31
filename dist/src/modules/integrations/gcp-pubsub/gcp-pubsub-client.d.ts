import { OnModuleDestroy } from '@nestjs/common';
import { Subscription, Message } from '@google-cloud/pubsub';
import { SUBSCRIPTION } from './enums/subscription';
export declare class GcpPubsubClient implements OnModuleDestroy {
    subscriptions: Array<{
        name: SUBSCRIPTION;
        subscription: Subscription;
    }>;
    constructor();
    private enhancedListener;
    onMessage(listener: (subscription: SUBSCRIPTION, message: Message) => void): void;
    stopListenMessage(listener: (subscription: SUBSCRIPTION, message: Message) => void): void;
    onModuleDestroy(): Promise<void>;
}
