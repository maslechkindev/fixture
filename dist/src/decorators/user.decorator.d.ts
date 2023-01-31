import { User as UserType } from 'interfaces/user.interface';
export declare const User: (...dataOrPipes: ((keyof UserType)[] | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
