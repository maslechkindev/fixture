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
exports.WrappedUserBalanceResponseDto = exports.getUserBalanceDto = exports.getUserBalanceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class getUserBalanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], getUserBalanceResponseDto.prototype, "totalBalance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], getUserBalanceResponseDto.prototype, "bankrollBalance", void 0);
exports.getUserBalanceResponseDto = getUserBalanceResponseDto;
class getUserBalanceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], getUserBalanceDto.prototype, "contestInstanceId", void 0);
exports.getUserBalanceDto = getUserBalanceDto;
class WrappedUserBalanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", getUserBalanceResponseDto)
], WrappedUserBalanceResponseDto.prototype, "data", void 0);
exports.WrappedUserBalanceResponseDto = WrappedUserBalanceResponseDto;
//# sourceMappingURL=userBetsHistory.dto.js.map