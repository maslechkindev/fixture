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
exports.WrappedTokenVerificationGetDTO = exports.TokenVerificationGetDTO = exports.ResponseCode = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ResponseCode;
(function (ResponseCode) {
    ResponseCode["NONE"] = "NONE";
    ResponseCode["USER_EXISTS"] = "USER_EXISTS";
    ResponseCode["GET_CODE"] = "GET_CODE";
    ResponseCode["GET_CODE_EMAIL"] = "GET_CODE_EMAIL";
})(ResponseCode = exports.ResponseCode || (exports.ResponseCode = {}));
class TokenVerificationGetDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ResponseCode }),
    (0, class_validator_1.IsEnum)(ResponseCode),
    __metadata("design:type", String)
], TokenVerificationGetDTO.prototype, "code", void 0);
exports.TokenVerificationGetDTO = TokenVerificationGetDTO;
class WrappedTokenVerificationGetDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", TokenVerificationGetDTO)
], WrappedTokenVerificationGetDTO.prototype, "data", void 0);
exports.WrappedTokenVerificationGetDTO = WrappedTokenVerificationGetDTO;
//# sourceMappingURL=tokenVerificationResponse.dto.js.map