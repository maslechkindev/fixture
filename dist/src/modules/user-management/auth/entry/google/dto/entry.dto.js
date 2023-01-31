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
exports.GoogleEntryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("../../../../../../helpers/errors");
class GoogleEntryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jwttoken' }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.PLATFORM_TOKEN_EMPTY,
    }),
    __metadata("design:type", String)
], GoogleEntryDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MM/dd/yyyy' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(new RegExp('^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$'), {
        context: errors_1.ERRORS.INVALID_DATE,
    }),
    __metadata("design:type", String)
], GoogleEntryDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CODE1', description: 'Optional referral code' }),
    __metadata("design:type", String)
], GoogleEntryDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USA' }),
    __metadata("design:type", String)
], GoogleEntryDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alabama' }),
    __metadata("design:type", String)
], GoogleEntryDto.prototype, "state", void 0);
exports.GoogleEntryDto = GoogleEntryDto;
//# sourceMappingURL=entry.dto.js.map