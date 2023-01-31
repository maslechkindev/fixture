import { GCP_PUBSUB_HANDLER } from '../gcp-pubsub.constants';
import { PubsubHandlerConfig } from '../interfaces/pubsub-handler-config.interface';
export declare const PubsubHandler: (config: PubsubHandlerConfig) => import("@nestjs/common").CustomDecorator<typeof GCP_PUBSUB_HANDLER>;
