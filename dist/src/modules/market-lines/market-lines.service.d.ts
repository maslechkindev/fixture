import { BetsService } from '../contest-instance/bets/bets.service';
import { ContestInstanceService } from '../contest-instance/contest-instance.service';
export declare class MarketLinesService {
    private readonly betsService;
    private readonly contestInstanceService;
    constructor(betsService: BetsService, contestInstanceService: ContestInstanceService);
    onMarketLineChangeStatus(marketLineId: string, statusId: string): Promise<void>;
}
