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
exports.WrappedGetUserInstanceResponseDto = exports.GetUserInstanceResponseDto = exports.GetUserInstanceParamsDto = exports.GetLiveAndUpcomingInstanceResponseDto = exports.CustomQueryStringArrayCheck = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let CustomQueryStringArrayCheck = class CustomQueryStringArrayCheck {
    validate(value) {
        return typeof value === 'string' || Array.isArray(value);
    }
    defaultMessage(args) {
        return `Parameter ${args.property} must be a string or an array of strings`;
    }
};
CustomQueryStringArrayCheck = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'queryStringArray', async: false })
], CustomQueryStringArrayCheck);
exports.CustomQueryStringArrayCheck = CustomQueryStringArrayCheck;
class GetLiveAndUpcomingInstanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "competitionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "competitionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "currentPeriodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "currentPeriodName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "fixtureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "isLive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "sportIcon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], GetLiveAndUpcomingInstanceResponseDto.prototype, "contestInstances", void 0);
exports.GetLiveAndUpcomingInstanceResponseDto = GetLiveAndUpcomingInstanceResponseDto;
class GetUserInstanceParamsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GetUserInstanceParamsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetUserInstanceParamsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Validate)(CustomQueryStringArrayCheck),
    (0, class_transformer_1.Transform)(({ value }) => {
        return typeof value === 'string' ? [value] : value;
    }),
    __metadata("design:type", Array)
], GetUserInstanceParamsDto.prototype, "statuses", void 0);
exports.GetUserInstanceParamsDto = GetUserInstanceParamsDto;
class GetUserInstanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], GetUserInstanceResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: GetLiveAndUpcomingInstanceResponseDto, isArray: true }),
    __metadata("design:type", Array)
], GetUserInstanceResponseDto.prototype, "data", void 0);
exports.GetUserInstanceResponseDto = GetUserInstanceResponseDto;
class WrappedGetUserInstanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetUserInstanceResponseDto)
], WrappedGetUserInstanceResponseDto.prototype, "data", void 0);
exports.WrappedGetUserInstanceResponseDto = WrappedGetUserInstanceResponseDto;
//# sourceMappingURL=getLiveAndUpcomingInstances.dto.js.map