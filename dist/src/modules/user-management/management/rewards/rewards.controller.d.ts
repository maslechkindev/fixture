import { RewardsService } from './rewards.service';
import { Rewards } from './dto/rewards.dto';
import { RegistrationRewardsUpdateDto } from './dto/registrationRewardsUpdate.dto';
export declare class RewardsController {
    private rewardsService;
    constructor(rewardsService: RewardsService);
    getRewards(): Promise<Rewards>;
    updateRewards(body: RegistrationRewardsUpdateDto): Promise<Rewards>;
}
