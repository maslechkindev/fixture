import { RewardsInterface } from '../rewards.interface';
export declare class Rewards implements RewardsInterface {
    rewardsId: string;
    registrationNotReferred: number;
    registrationReferred: number;
    registrationReferredHolder: number;
    personalDetails: number;
    username: number;
    updatedAt: string;
    updatedBy: number;
}
export declare class WrappedRewards {
    data: Rewards;
}
