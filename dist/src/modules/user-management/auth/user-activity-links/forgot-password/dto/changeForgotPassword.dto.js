"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeForgotPasswordDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("../../../../../../helpers/errors");
const getPasswordRegExp_1 = require("../../../../../../helpers/auth/getPasswordRegExp");
class ChangeForgotPasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'token' }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.PLATFORM_TOKEN_EMPTY,
    }),
    __metadata("design:type", String)
], ChangeForgotPasswordDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Qwerty@123' }),
    (0, class_validator_1.Matches)((0, getPasswordRegExp_1.default)(), {
        context: errors_1.ERRORS.PASSWORD_INVALID,
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.PASSWORD_INVALID,
    }),
    __metadata("design:type", String)
], ChangeForgotPasswordDto.prototype, "password", void 0);
exports.ChangeForgotPasswordDto = ChangeForgotPasswordDto;
//# sourceMappingURL=changeForgotPassword.dto.js.map