import { HealthService } from './health.service';
import { HealthData } from './health.types';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    getHealth(): Promise<HealthData>;
    clean(): Promise<{
        success: boolean;
    }>;
}
