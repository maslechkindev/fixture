import { PubsubMessage } from 'modules/integrations/gcp-pubsub/interfaces/pubsub-message.interface';
import { ContestService } from './contest.service';
export declare class ContestPubsubController {
    private readonly contestService;
    private readonly logger;
    constructor(contestService: ContestService);
    onChangeFixtureCurrentPeriod(message: PubsubMessage<{
        fixtureId: string;
    }>): Promise<void>;
    onFixtureComplete(message: PubsubMessage<{
        fixtureId: string;
    }>): Promise<void>;
    onContestTemplateChange(message: PubsubMessage<{
        id: string;
    }>): Promise<void>;
}
