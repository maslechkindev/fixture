import { PubsubMessage } from 'modules/integrations/gcp-pubsub/interfaces/pubsub-message.interface';
import { BetsService } from '../contest-instance/bets/bets.service';
import { ContestInstanceService } from '../contest-instance/contest-instance.service';
import { MarketLinesService } from './market-lines.service';
export declare class MarketLinesPubsubController {
    private readonly betsService;
    private readonly contestInstanceService;
    private readonly marketsLinesService;
    private readonly logger;
    constructor(betsService: BetsService, contestInstanceService: ContestInstanceService, marketsLinesService: MarketLinesService);
    onMarketLineChangeStatus(message: PubsubMessage<{
        marketLineId: string;
        statusId: string;
    }>): Promise<void>;
}
