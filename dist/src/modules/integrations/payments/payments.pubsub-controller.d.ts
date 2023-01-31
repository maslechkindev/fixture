import { PubsubMessage } from 'modules/integrations/gcp-pubsub/interfaces/pubsub-message.interface';
import { PaymentService } from './payment.service';
export declare class PaymentsPubsubController {
    private paymentsService;
    constructor(paymentsService: PaymentService);
    private logger;
    onChangePaymentStatus(message: PubsubMessage<{
        status: string;
        paymentId: string;
    }>): Promise<void>;
}
