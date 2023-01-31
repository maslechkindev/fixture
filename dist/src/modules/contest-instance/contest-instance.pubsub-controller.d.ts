import { PubsubMessage } from 'modules/integrations/gcp-pubsub/interfaces/pubsub-message.interface';
import { ContestInstanceService } from './contest-instance.service';
export declare class ContestInstancePubsubController {
    private readonly contestInstanceService;
    private readonly logger;
    constructor(contestInstanceService: ContestInstanceService);
    onChangeCurrentPeriodHandler(message: PubsubMessage<{
        fixtureId: string;
    }>): Promise<void>;
    onMarketIsActive(message: PubsubMessage<{
        contestId: string;
        marketId: string;
        activePrice: boolean;
    }>): Promise<void>;
    updateContestInstancesOnFixtureCurrentPeriodChange(message: PubsubMessage<{
        fixtureId: string;
    }>): Promise<void>;
    finishContestInstancesOnMarketNotActive(message: PubsubMessage<{
        marketId: string;
        contestId: string;
    }>): Promise<void>;
}
