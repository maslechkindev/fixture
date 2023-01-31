import { RewardsInterface } from './rewards.interface';
import { RewardsRepository } from './rewards.repository';
export declare class RewardsService {
    private rewardsRepository;
    constructor(rewardsRepository: RewardsRepository);
    getRewards(): Promise<RewardsInterface>;
    updateRewards(rewards: Partial<RewardsInterface>): Promise<RewardsInterface>;
}
