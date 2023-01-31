import { DynamicModule } from '@nestjs/common';
import { FirebaseDynamicLinksModuleOptions } from './interfaces';
export declare class FirebaseDynamicLinksCoreModule {
    static forRoot(options: FirebaseDynamicLinksModuleOptions): DynamicModule;
}
