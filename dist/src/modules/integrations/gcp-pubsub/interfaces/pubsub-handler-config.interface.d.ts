import { SUBSCRIPTION } from '../enums/subscription';
import { PubsubFilter } from './pubsub-filter.interface';
export interface PubsubHandlerConfig {
    subscription: SUBSCRIPTION;
    filters?: PubsubFilter | Array<PubsubFilter>;
}
