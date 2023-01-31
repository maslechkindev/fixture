import { Knex } from 'modules/integrations/knex';
import { RewardsInterface } from './rewards.interface';
export declare class RewardsRepository {
    private readonly knex;
    constructor(knex: Knex);
    getRewards(): Promise<RewardsInterface>;
    updateRewards(rewards: Partial<RewardsInterface>): Promise<RewardsInterface>;
}
