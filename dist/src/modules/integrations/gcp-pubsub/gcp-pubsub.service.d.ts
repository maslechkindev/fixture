import { PubsubHandler } from './interfaces/pubsub-handler.interface';
import { GcpPubsubClient } from './gcp-pubsub-client';
import { PubsubHandlerConfig } from './interfaces/pubsub-handler-config.interface';
export declare class GcpPubsubService {
    private readonly gcpPubsubService;
    private logger;
    private pathToHandler;
    private defaultHandlers;
    constructor(gcpPubsubService: GcpPubsubClient);
    subscribe(handler: PubsubHandler, handlerName: string, handlerConfig: PubsubHandlerConfig): void;
    private rootHandler;
    private convertNativeGcpMessageToPubsubMessage;
    private convertHandlerFilterToPath;
    private convertMessageAttributesToHandlersPath;
}
