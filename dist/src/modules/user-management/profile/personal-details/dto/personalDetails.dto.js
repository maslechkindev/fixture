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
exports.WrappedPersonalDetailsInfoResponse = exports.PersonalDetailsInfoResponse = exports.PersonalDetailsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const errors_1 = require("../../../../../helpers/errors");
const registrationType_1 = require("../../../../../enums/registrationType");
class PersonalDetailsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp(/^[a-zA-Z'-]*$/), {
        context: errors_1.ERRORS.PERSONAL_DETAILS.CONTAINS_SPECIAL_SYMBOLS,
    }),
    (0, class_validator_1.MinLength)(2, {
        context: errors_1.ERRORS.PERSONAL_DETAILS.FIRST_NAME_TOO_SHORT,
    }),
    (0, class_validator_1.MaxLength)(36, {
        context: errors_1.ERRORS.PERSONAL_DETAILS.FIRST_NAME_TOO_LONG,
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.PERSONAL_DETAILS.FIELD_EMPTY,
    }),
    __metadata("design:type", String)
], PersonalDetailsDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Surname' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp(/^[a-zA-Z'-]*$/), {
        context: errors_1.ERRORS.PERSONAL_DETAILS.CONTAINS_SPECIAL_SYMBOLS,
    }),
    (0, class_validator_1.MinLength)(2, {
        context: errors_1.ERRORS.PERSONAL_DETAILS.LAST_NAME_TOO_SHORT,
    }),
    (0, class_validator_1.MaxLength)(36, {
        context: errors_1.ERRORS.PERSONAL_DETAILS.LAST_NAME_TOO_LONG,
    }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.PERSONAL_DETAILS.FIELD_EMPTY,
    }),
    __metadata("design:type", String)
], PersonalDetailsDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mm/dd/yyyy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$'), {
        context: errors_1.ERRORS.PERSONAL_DETAILS.INVALID_DATE,
    }),
    __metadata("design:type", String)
], PersonalDetailsDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'username' }),
    (0, class_validator_1.Matches)(new RegExp(/^[a-zA-Z0-9_-]*$/), {
        context: errors_1.ERRORS.PERSONAL_DETAILS.ONLY_LETTER_NUMBERS_ALLOWED,
    }),
    (0, class_validator_1.MinLength)(2, {
        context: errors_1.ERRORS.PERSONAL_DETAILS.USERNAME_TOO_SHORT,
    }),
    (0, class_validator_1.MaxLength)(36, {
        context: errors_1.ERRORS.PERSONAL_DETAILS.USERNAME_TOO_LONG,
    }),
    __metadata("design:type", String)
], PersonalDetailsDto.prototype, "username", void 0);
exports.PersonalDetailsDto = PersonalDetailsDto;
class PersonalDetailsInfoResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "promoCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PersonalDetailsInfoResponse.prototype, "confirmedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PersonalDetailsInfoResponse.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "accountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "registrationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PersonalDetailsInfoResponse.prototype, "hasPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PersonalDetailsInfoResponse.prototype, "state", void 0);
exports.PersonalDetailsInfoResponse = PersonalDetailsInfoResponse;
class WrappedPersonalDetailsInfoResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PersonalDetailsInfoResponse)
], WrappedPersonalDetailsInfoResponse.prototype, "data", void 0);
exports.WrappedPersonalDetailsInfoResponse = WrappedPersonalDetailsInfoResponse;
//# sourceMappingURL=personalDetails.dto.js.map