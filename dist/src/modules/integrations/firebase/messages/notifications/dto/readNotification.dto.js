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
exports.WrappedReadNotificationResponseDto = exports.ReadNotificationResponseDto = exports.ReadNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ReadNotificationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReadNotificationDto.prototype, "id", void 0);
exports.ReadNotificationDto = ReadNotificationDto;
class ReadNotificationResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReadNotificationResponseDto.prototype, "success", void 0);
exports.ReadNotificationResponseDto = ReadNotificationResponseDto;
class WrappedReadNotificationResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ReadNotificationResponseDto)
], WrappedReadNotificationResponseDto.prototype, "data", void 0);
exports.WrappedReadNotificationResponseDto = WrappedReadNotificationResponseDto;
//# sourceMappingURL=readNotification.dto.js.map