import { DynamicModule } from '@nestjs/common';
import { MailingModuleOptions } from './interfaces';
export declare class MailingCoreModule {
    static forRoot(options: MailingModuleOptions): DynamicModule;
}
