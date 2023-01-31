import { ValidationError } from '@nestjs/common';
import { BadRequestExceptionCustom } from 'helpers/errors';
export declare const exceptionFactory: (validationErrors: ValidationError[]) => BadRequestExceptionCustom;
