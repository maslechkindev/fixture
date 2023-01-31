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
exports.WrappedGetUserResponseDto = exports.GetUserResponseDto = exports.GetUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const userBanRecord_1 = require("../../../../../interfaces/entities/userBanRecord");
const userPremiumTermsRecord_1 = require("../../../../../interfaces/entities/userPremiumTermsRecord");
const userBalancesRecord_1 = require("../../../../../interfaces/entities/userBalancesRecord");
class GetUserDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'a4cf795f-37d2-4eea-a5a0-2b5323978538' }),
    (0, class_validator_1.ValidateIf)((o) => (!o.email && !o.promoCode) || o.id),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'test@gmail.com' }),
    (0, class_validator_1.ValidateIf)((o) => (!o.id && !o.promoCode) || o.email),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'TEST123' }),
    (0, class_validator_1.ValidateIf)((o) => (!o.id && !o.email) || o.promoCode),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUserDto.prototype, "promoCode", void 0);
exports.GetUserDto = GetUserDto;
class GetUserResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
            email: 'test@gmail.com',
            username: 'username',
            firstName: 'test',
            lastName: 'test',
            createdAt: new Date('01/01/2021'),
            confirmedAt: new Date('02/01/2021'),
            status: 'confirmed',
        },
    }),
    __metadata("design:type", Object)
], GetUserResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
            userId: 'a77f7895f-37d2-4eea-a5a0-2b5323978538',
            banReason: 'banReason',
            bannedAt: new Date('01/01/2021'),
            unbanReason: 'unbanReason',
            unbannedAt: new Date('01/01/2021'),
        },
    }),
    __metadata("design:type", Object)
], GetUserResponseDto.prototype, "banInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
            userId: 'a77f7895f-37d2-4eea-a5a0-2b5323978538',
            startTime: new Date('01/01/2021'),
            endTime: new Date('02/01/2021'),
        },
    }),
    __metadata("design:type", Object)
], GetUserResponseDto.prototype, "premiumInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            real_money: {
                id: '1c326b11-13fe-4f86-87a1-f20be9a3b6a5',
                amount: 0,
                userId: '6b92920f-801c-4d4a-81e4-e4a879b1d3bd',
                updatedAt: '2021-12-06T17:24:49.363848+02:00',
            },
            tokens: {
                id: '1c326b11-13fe-4f86-87a1-f20be9a3b6a5',
                amount: 0,
                userId: '6b92920f-801c-4d4a-81e4-e4a879b1d3bd',
                updatedAt: '2021-12-06T17:24:49.363848+02:00',
            },
        },
    }),
    __metadata("design:type", Object)
], GetUserResponseDto.prototype, "balanceInfo", void 0);
exports.GetUserResponseDto = GetUserResponseDto;
class WrappedGetUserResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetUserResponseDto)
], WrappedGetUserResponseDto.prototype, "data", void 0);
exports.WrappedGetUserResponseDto = WrappedGetUserResponseDto;
//# sourceMappingURL=getUser.dto.js.map