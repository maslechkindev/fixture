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
exports.WrappedUpdateFcmTokenResponseDto = exports.UpdateFcmTokenResponseDto = exports.UpdateFcmTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateFcmTokenDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateFcmTokenDto.prototype, "oldToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateFcmTokenDto.prototype, "newToken", void 0);
exports.UpdateFcmTokenDto = UpdateFcmTokenDto;
class UpdateFcmTokenResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UpdateFcmTokenResponseDto.prototype, "success", void 0);
exports.UpdateFcmTokenResponseDto = UpdateFcmTokenResponseDto;
class WrappedUpdateFcmTokenResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UpdateFcmTokenResponseDto)
], WrappedUpdateFcmTokenResponseDto.prototype, "data", void 0);
exports.WrappedUpdateFcmTokenResponseDto = WrappedUpdateFcmTokenResponseDto;
//# sourceMappingURL=updateFcmToken.dto.js.map