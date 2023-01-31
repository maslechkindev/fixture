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
exports.WrappedSetPremiumTermsResponseDto = exports.SetPremiumTermsResponseDto = exports.SetPremiumTermsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const userPremiumTermsRecord_1 = require("../../../../../interfaces/entities/userPremiumTermsRecord");
class SetPremiumTermsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a4cf795f-37d2-4eea-a5a0-2b5323978538' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SetPremiumTermsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '01/01/2021' }),
    __metadata("design:type", String)
], SetPremiumTermsDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '01/01/2021' }),
    __metadata("design:type", String)
], SetPremiumTermsDto.prototype, "endTime", void 0);
exports.SetPremiumTermsDto = SetPremiumTermsDto;
class SetPremiumTermsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    __metadata("design:type", Boolean)
], SetPremiumTermsResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
            userId: 'a77f7895f-37d2-4eea-a5a0-2b5323978538',
            startTime: new Date('01/01/2021'),
            endTime: new Date('01/01/2021'),
        },
    }),
    __metadata("design:type", Object)
], SetPremiumTermsResponseDto.prototype, "record", void 0);
exports.SetPremiumTermsResponseDto = SetPremiumTermsResponseDto;
class WrappedSetPremiumTermsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", SetPremiumTermsResponseDto)
], WrappedSetPremiumTermsResponseDto.prototype, "data", void 0);
exports.WrappedSetPremiumTermsResponseDto = WrappedSetPremiumTermsResponseDto;
//# sourceMappingURL=setPremiumTerms.dto.js.map