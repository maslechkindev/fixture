import { ACTION_TYPE } from '../enums/action-type';
import { ENTITY_TYPE } from '../enums/entity-type';
export interface PubsubFilter {
    entityType?: ENTITY_TYPE;
    actionType?: ACTION_TYPE;
}
