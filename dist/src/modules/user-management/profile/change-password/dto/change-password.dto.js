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
exports.WrappedChangePasswordResponse = exports.ChangePasswordResponse = exports.ChangePasswordDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("../../../../../helpers/errors");
const auth_1 = require("../../../../../helpers/auth");
class ChangePasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NewPassword123$' }),
    (0, class_validator_1.Matches)((0, auth_1.getPasswordRegExp)(), {
        context: errors_1.ERRORS.PASSWORD_INVALID,
    }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "new", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CurrentPassword123$' }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.CHANGE_PASSWORD.INCORRECT_PASSWORD,
    }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "current", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fcm token', required: false }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "initiatorFcmToken", void 0);
exports.ChangePasswordDto = ChangePasswordDto;
class ChangePasswordResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ChangePasswordResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ChangePasswordResponse.prototype, "customToken", void 0);
exports.ChangePasswordResponse = ChangePasswordResponse;
class WrappedChangePasswordResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ChangePasswordResponse)
], WrappedChangePasswordResponse.prototype, "data", void 0);
exports.WrappedChangePasswordResponse = WrappedChangePasswordResponse;
//# sourceMappingURL=change-password.dto.js.map