import { OnApplicationShutdown } from '@nestjs/common';
import { Knex } from 'modules/integrations/knex';
export declare class OnApplicationShutdownService implements OnApplicationShutdown {
    private readonly knex;
    private readonly logger;
    constructor(knex: Knex);
    onApplicationShutdown(signal?: string): Promise<void>;
}
