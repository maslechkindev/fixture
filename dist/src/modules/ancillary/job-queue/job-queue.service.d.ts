import { OnModuleDestroy } from '@nestjs/common';
import { Knex } from 'modules/integrations/knex';
import * as PgBoss from 'pg-boss';
import { JobWithMetadata } from 'pg-boss';
export declare class JobQueueService implements OnModuleDestroy {
    private readonly knex;
    private boss;
    private readonly activeWorkers;
    private readonly asleepWorkers;
    private readonly logger;
    constructor(knex: Knex);
    private activateWorker;
    private moveWorketToAsleep;
    onModuleDestroy(): Promise<void>;
    init(queueName: string, handler: (data: PgBoss.Job) => void): Promise<void>;
    addToQueue(dateISOString: string, queueName: string, pld: {
        action: string;
        meta?: {
            [key: string]: string | boolean | number | unknown;
        };
    }, uniqueKey?: string): Promise<void>;
    cancelJob(uniqueKey: string): Promise<void>;
    getJob(uniqueKey: string): Promise<JobWithMetadata | null>;
    getJobsByMetadata(name: string, state: string, meta: {
        [key: string]: string | boolean | number | unknown;
    }): Promise<any[]>;
}
