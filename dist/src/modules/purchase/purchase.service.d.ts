import { CmsService } from '../integrations/cms/cms.service';
import { InitBodyDto } from './dto/initBody.dto';
import { InitResponseDto } from './dto/initResponse.dto';
import { PaymentService } from '../integrations/payments/payment.service';
import { User } from 'interfaces/user.interface';
import { PurchaseRepository } from './purchase.repository';
import { GetUserTransactionsQueryDto } from 'modules/user-management/profile/balance/dto/getUserTransactions.dto';
export declare class PurchaseService {
    private cmsService;
    private purchaseRepository;
    private paymentService;
    constructor(cmsService: CmsService, purchaseRepository: PurchaseRepository, paymentService: PaymentService);
    init(purchaseDetails: InitBodyDto): Promise<InitResponseDto>;
    buyPurchaseCard(user: Pick<User, 'id' | 'email'>, purchaseInfo: InitBodyDto): Promise<string>;
    getTransactionsHistiory(userId: string, params: GetUserTransactionsQueryDto): Promise<{
        name: any;
    }[]>;
    private getFinalPurchase;
}
