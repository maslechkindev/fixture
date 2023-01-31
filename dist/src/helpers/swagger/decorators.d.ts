import { ExceptionBody } from 'helpers/errors';
export { ApiTags } from '@nestjs/swagger';
export { ApiBearerAuth } from '@nestjs/swagger';
export declare const ApiOkResponse: (data: any) => MethodDecorator & ClassDecorator;
export declare const ApiCreatedResponse: (data: any) => MethodDecorator & ClassDecorator;
export declare const ApiResponse: (data: any) => MethodDecorator & ClassDecorator;
export declare const ApiBadRequestResponse: (data: any) => MethodDecorator & ClassDecorator;
interface Exception {
    summary?: string;
    exceptionBody: ExceptionBody;
}
export declare const ApiBadRequestResponseWithMultipleExceptions: (exceptions: Array<Exception>) => MethodDecorator & ClassDecorator;
export declare const ApiUnauthorizedResponse: (inputData?: any) => MethodDecorator & ClassDecorator;
export declare const ApiUnauthorizedResponseWithMultipleExceptions: (exceptions: Array<Exception>) => MethodDecorator & ClassDecorator;
export declare const ApiTooManyRequestsResponse: (data: any) => MethodDecorator & ClassDecorator;
