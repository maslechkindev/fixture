import { Integration, Options } from '@sentry/types';
import { ConsoleLoggerOptions } from '@nestjs/common';
export interface SentryCloseOptions {
    enabled: boolean;
    timeout?: number;
}
export declare type SentryModuleOptions = Omit<Options, 'integrations'> & {
    integrations?: Integration[];
    close?: SentryCloseOptions;
} & ConsoleLoggerOptions;
