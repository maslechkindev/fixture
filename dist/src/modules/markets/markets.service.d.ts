import { TransactionManagerService } from '../ancillary/transaction-manager/transaction-manager.service';
import { Market } from '../../interfaces/db/tables';
import { CmsService } from '../integrations/cms/cms.service';
import { JobQueueService } from '../ancillary/job-queue/job-queue.service';
import { MarketsRepository } from './markets.repository';
export declare class MarketsService {
    private cmsService;
    private jobQueueService;
    private marketsRepository;
    constructor(cmsService: CmsService, jobQueueService: JobQueueService, marketsRepository: MarketsRepository);
    checkIsTypeIdInMarketTypeIds(cmsContestTemplateId: number, typeId: string, period: number): Promise<boolean>;
    getMarketLineIdsForMarkets(marketIds: Array<string>): Promise<Array<{
        id: string;
        priceId: string;
        marketLineId: string;
    }>>;
    isActiveMarket(txManager: TransactionManagerService, market: Pick<Market, 'isClosed' | 'toggle' | 'marketId' | 'typeId' | 'fixturePeriodId'>, options?: {
        cmsContestTemplateId?: number;
        checkToggle?: boolean;
    }): Promise<boolean>;
    isActiveMarketForCustomFreeBet(txManager: TransactionManagerService, market: Market): Promise<boolean>;
    getMarketsByIds(txManager: TransactionManagerService, ids: Array<string>): Promise<any[]>;
}
