import { Knex } from 'modules/integrations/knex';
import { HealthData } from './health.types';
export declare class HealthService {
    private readonly knex;
    constructor(knex: Knex);
    getHealth(): Promise<HealthData>;
    clean(): Promise<{
        success: boolean;
    }>;
}
