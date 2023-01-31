import { PurchaseService } from './purchase.service';
import { InitBodyDto } from './dto/initBody.dto';
import { InitResponseDto } from './dto/initResponse.dto';
import { User as UserType } from 'interfaces/user.interface';
import { successResponseBuyPurchaseCard } from './dto/successResponseBuyPurchaseCard.dto';
import { GetUserTransactionsQueryDto } from 'modules/user-management/profile/balance/dto/getUserTransactions.dto';
export declare class PurchaseController {
    private readonly purchaseService;
    constructor(purchaseService: PurchaseService);
    init(user: Pick<UserType, 'lastName' | 'firstName' | 'dateOfBirth'>, requestData: InitBodyDto): Promise<InitResponseDto>;
    buyPurchaseCard(user: Pick<UserType, 'email' | 'id'>, purchaseInfo: InitBodyDto): Promise<successResponseBuyPurchaseCard>;
    getTransactionsHistiory({ id: userId }: Pick<UserType, 'id'>, params: GetUserTransactionsQueryDto): Promise<{
        name: any;
    }[]>;
}
