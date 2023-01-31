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
exports.WrappedGetUsersResponseDto = exports.GetUsersResponseDto = exports.GetUsersDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const swagger_1 = require("@nestjs/swagger");
var Direction;
(function (Direction) {
    Direction["ASC"] = "ASC";
    Direction["DESC"] = "DESC";
})(Direction || (Direction = {}));
class GetUsersDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetUsersDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetUsersDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Direction }),
    (0, class_validator_1.IsEnum)(Direction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUsersDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'createdAt' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetUsersDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'somestring' }),
    __metadata("design:type", String)
], GetUsersDto.prototype, "search", void 0);
exports.GetUsersDto = GetUsersDto;
class GetUsersResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
                email: 'test@gmail.com',
                username: 'username',
                firstName: 'test',
                lastName: 'test',
                createdAt: new Date('01/01/2021'),
                confirmedAt: new Date('02/01/2021'),
                status: 'confirmed',
            },
        ],
    }),
    __metadata("design:type", Array)
], GetUsersResponseDto.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], GetUsersResponseDto.prototype, "count", void 0);
exports.GetUsersResponseDto = GetUsersResponseDto;
class WrappedGetUsersResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetUsersResponseDto)
], WrappedGetUsersResponseDto.prototype, "data", void 0);
exports.WrappedGetUsersResponseDto = WrappedGetUsersResponseDto;
//# sourceMappingURL=getUsers.dto.js.map