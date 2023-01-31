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
exports.WrappedBanUserResponseDto = exports.BanUserResponseDto = exports.BanUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const userBanRecord_1 = require("../../../../../interfaces/entities/userBanRecord");
class BanUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a4cf795f-37d2-4eea-a5a0-2b5323978538' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BanUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Reason...' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BanUserDto.prototype, "reason", void 0);
exports.BanUserDto = BanUserDto;
class BanUserResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    __metadata("design:type", Boolean)
], BanUserResponseDto.prototype, "success", void 0);
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
], BanUserResponseDto.prototype, "record", void 0);
exports.BanUserResponseDto = BanUserResponseDto;
class WrappedBanUserResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", BanUserResponseDto)
], WrappedBanUserResponseDto.prototype, "data", void 0);
exports.WrappedBanUserResponseDto = WrappedBanUserResponseDto;
//# sourceMappingURL=banUser.dto.js.map