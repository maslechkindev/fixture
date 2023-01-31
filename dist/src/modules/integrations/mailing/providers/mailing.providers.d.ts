import { Provider } from '@nestjs/common';
import { MailingModuleOptions } from '../interfaces/mailing-options.interface';
export declare function createMailingProviders(options: MailingModuleOptions): Provider;
