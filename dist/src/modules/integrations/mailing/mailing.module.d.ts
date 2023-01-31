import { DynamicModule } from '@nestjs/common';
import { MailingModuleOptions } from './interfaces';
export declare class MailingModule {
    static forRoot(options: MailingModuleOptions): DynamicModule;
}
