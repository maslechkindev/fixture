import { User } from 'interfaces/user.interface';
import { DynamicZoneDto } from 'modules/integrations/cms/dto/purchase.dto';
import { Knex } from 'modules/integrations/knex';
import { GetUserTransactionsQueryDto } from 'modules/user-management/profile/balance/dto/getUserTransactions.dto';
export declare class PurchaseRepository {
    private readonly knex;
    constructor(knex: Knex);
    private autoTransactionTypeToName;
    startPayment(user: Partial<User>, metaAboutPurchase: Partial<DynamicZoneDto> & {
        id: number;
    }): Promise<any[]>;
    getTransactionsHistory(userId: string, queryParams: GetUserTransactionsQueryDto): Promise<{
        name: any;
    }[]>;
}
