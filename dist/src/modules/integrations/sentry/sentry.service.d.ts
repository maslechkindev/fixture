import { ConsoleLogger } from '@nestjs/common';
import { OnApplicationShutdown } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SentryModuleOptions } from './sentry.interfaces';
export declare class SentryLoggerService extends ConsoleLogger implements OnApplicationShutdown {
    readonly opts?: SentryModuleOptions;
    app: string;
    private levels;
    private static serviceInstance;
    constructor(opts?: SentryModuleOptions);
    static SentryServiceInstance(opts?: SentryModuleOptions): SentryLoggerService;
    log(message: string, context?: string, asBreadcrumb?: boolean): void;
    error(message: string, trace?: string, context?: string): void;
    warn(message: string, context?: string, asBreadcrumb?: boolean): void;
    debug(message: string, context?: string, asBreadcrumb?: boolean): void;
    verbose(message: string, context?: string, asBreadcrumb?: boolean): void;
    instance(): typeof Sentry;
    onApplicationShutdown(): Promise<void>;
}
