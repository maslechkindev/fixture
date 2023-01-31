"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiTooManyRequestsResponse = exports.ApiUnauthorizedResponseWithMultipleExceptions = exports.ApiUnauthorizedResponse = exports.ApiBadRequestResponseWithMultipleExceptions = exports.ApiBadRequestResponse = exports.ApiResponse = exports.ApiCreatedResponse = exports.ApiOkResponse = exports.ApiBearerAuth = exports.ApiTags = void 0;
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("../errors");
var swagger_2 = require("@nestjs/swagger");
Object.defineProperty(exports, "ApiTags", { enumerable: true, get: function () { return swagger_2.ApiTags; } });
var swagger_3 = require("@nestjs/swagger");
Object.defineProperty(exports, "ApiBearerAuth", { enumerable: true, get: function () { return swagger_3.ApiBearerAuth; } });
const ApiOkResponse = (data) => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.schema) === null || _a === void 0 ? void 0 : _a.example) {
        data.schema.example = { data: data.schema.example };
    }
    return (0, swagger_1.ApiOkResponse)(data);
};
exports.ApiOkResponse = ApiOkResponse;
const ApiCreatedResponse = (data) => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.schema) === null || _a === void 0 ? void 0 : _a.example) {
        data.schema.example = { data: data.schema.example };
    }
    return (0, swagger_1.ApiCreatedResponse)(data);
};
exports.ApiCreatedResponse = ApiCreatedResponse;
const ApiResponse = (data) => {
    data.schema.example = { data: data.schema.example };
    return (0, swagger_1.ApiResponse)(data);
};
exports.ApiResponse = ApiResponse;
const ApiBadRequestResponse = (data) => {
    data.status = 400;
    return (0, swagger_1.ApiResponse)(data);
};
exports.ApiBadRequestResponse = ApiBadRequestResponse;
const ApiResponseWithMultipleExceptions = (data, exceptions, getExceptionResponse) => {
    const contentExamples = exceptions.reduce((acc, exception) => {
        return Object.assign(Object.assign({}, acc), { [exception.exceptionBody.code]: {
                summary: exception.summary || exception.exceptionBody.message,
                value: getExceptionResponse(exception.exceptionBody),
            } });
    }, {});
    return (0, swagger_1.ApiResponse)(Object.assign(Object.assign({}, data), { content: { 'application/json': { examples: contentExamples } } }));
};
const ApiBadRequestResponseWithMultipleExceptions = (exceptions) => {
    return ApiResponseWithMultipleExceptions({ status: 400 }, exceptions, (exceptionBody) => new errors_1.BadRequestExceptionCustom(exceptionBody).getResponse());
};
exports.ApiBadRequestResponseWithMultipleExceptions = ApiBadRequestResponseWithMultipleExceptions;
const ApiUnauthorizedResponse = (inputData) => {
    const defaultData = {
        schema: {
            anyOf: [
                {
                    example: new errors_1.UnauthorizedExceptionCustom(errors_1.ERRORS.AUTH.UNAUTHORIZED).getResponse(),
                },
            ],
        },
    };
    const data = inputData || defaultData;
    return (0, swagger_1.ApiResponse)(Object.assign(Object.assign({}, data), { status: 401 }));
};
exports.ApiUnauthorizedResponse = ApiUnauthorizedResponse;
const ApiUnauthorizedResponseWithMultipleExceptions = (exceptions) => {
    return ApiResponseWithMultipleExceptions({ status: 401 }, exceptions, (exceptionBody) => new errors_1.UnauthorizedExceptionCustom(exceptionBody).getResponse());
};
exports.ApiUnauthorizedResponseWithMultipleExceptions = ApiUnauthorizedResponseWithMultipleExceptions;
const ApiTooManyRequestsResponse = (data) => {
    data.status = 429;
    return (0, swagger_1.ApiResponse)(data);
};
exports.ApiTooManyRequestsResponse = ApiTooManyRequestsResponse;
//# sourceMappingURL=decorators.js.map