import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { MarketLine } from '../../interfaces/db/tables';
export declare class MarketsRepository {
    private readonly knex;
    private readonly logger;
    constructor(knex: Knex);
    getActiveMarketLines(txManager: TransactionManagerService, marketId: string): Promise<MarketLine[]>;
    getMarketLineIdsForMarkets(marketIds: Array<string>): Promise<any>;
    getMarketsByIds(txManager: TransactionManagerService, ids: Array<string>): Promise<any[]>;
}
