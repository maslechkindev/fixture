import { ConsoleLogger } from '@nestjs/common';
export default class extends ConsoleLogger {
    error(message: string, trace: string): void;
}
