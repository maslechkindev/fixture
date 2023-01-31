import { Message as NativeGcpPubsubMessage } from '@google-cloud/pubsub';
export interface PubsubMessage<T_BODY = Record<string, unknown>> extends Omit<NativeGcpPubsubMessage, 'ack' | 'nack' | 'data' | 'modAck'> {
    body: T_BODY;
}
