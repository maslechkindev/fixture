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
exports.WrappedGetDynamicLinksResponseDto = exports.DynamicLinksBodyDto = exports.DynamicLinksResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DynamicLinksResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DynamicLinksResponseDto.prototype, "shortLink", void 0);
exports.DynamicLinksResponseDto = DynamicLinksResponseDto;
class DynamicLinksBodyDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://some.com' }),
    __metadata("design:type", String)
], DynamicLinksBodyDto.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'title' }),
    __metadata("design:type", String)
], DynamicLinksBodyDto.prototype, "socialTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'socialDescription' }),
    __metadata("design:type", String)
], DynamicLinksBodyDto.prototype, "socialDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://some.com' }),
    __metadata("design:type", String)
], DynamicLinksBodyDto.prototype, "socialImageLink", void 0);
exports.DynamicLinksBodyDto = DynamicLinksBodyDto;
class WrappedGetDynamicLinksResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", DynamicLinksResponseDto)
], WrappedGetDynamicLinksResponseDto.prototype, "data", void 0);
exports.WrappedGetDynamicLinksResponseDto = WrappedGetDynamicLinksResponseDto;
//# sourceMappingURL=getDynamicLink.dto.js.map