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
exports.WrappedUpdateUserResponseDto = exports.UpdateUserResponseDto = exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const user_interface_1 = require("../../../../../interfaces/user.interface");
class UpdateUserDto {
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
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "user", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UpdateUserResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    __metadata("design:type", Boolean)
], UpdateUserResponseDto.prototype, "success", void 0);
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
], UpdateUserResponseDto.prototype, "updatedUser", void 0);
exports.UpdateUserResponseDto = UpdateUserResponseDto;
class WrappedUpdateUserResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UpdateUserResponseDto)
], WrappedUpdateUserResponseDto.prototype, "data", void 0);
exports.WrappedUpdateUserResponseDto = WrappedUpdateUserResponseDto;
//# sourceMappingURL=updateUser.dto.js.map