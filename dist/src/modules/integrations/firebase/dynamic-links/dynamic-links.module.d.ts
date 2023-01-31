import { DynamicModule } from '@nestjs/common';
import { FirebaseDynamicLinksModuleOptions } from './interfaces';
export declare class FirebaseDynamicLinksModule {
    static forRoot(options: FirebaseDynamicLinksModuleOptions): DynamicModule;
}
