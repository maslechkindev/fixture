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
exports.WrappedActiveContestInstancesResponseDto = exports.ActiveContestInstancesResponseDto = exports.ContestInstanceEntity = exports.ActiveContestInstancesDto = exports.CustomQueryStringArrayCheck = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const errors_1 = require("../../../helpers/errors");
const tables_1 = require("../../../interfaces/db/tables");
const class_validator_2 = require("class-validator");
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
    (0, class_validator_2.ValidatorConstraint)({ name: 'queryStringArray', async: false })
], CustomQueryStringArrayCheck);
exports.CustomQueryStringArrayCheck = CustomQueryStringArrayCheck;
class ActiveContestInstancesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fixtureId' }),
    (0, class_validator_1.IsNotEmpty)({
        context: errors_1.ERRORS.CONTEST.FIXTURE_ID_REQUIRED,
    }),
    __metadata("design:type", String)
], ActiveContestInstancesDto.prototype, "fixtureId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'periodId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ActiveContestInstancesDto.prototype, "periodId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '3' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ActiveContestInstancesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_2.Validate)(CustomQueryStringArrayCheck),
    (0, class_transformer_1.Transform)(({ value }) => {
        return typeof value === 'string' ? [value] : value;
    }),
    __metadata("design:type", Array)
], ActiveContestInstancesDto.prototype, "contestTypes", void 0);
exports.ActiveContestInstancesDto = ActiveContestInstancesDto;
class ContestInstanceEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "contestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "instanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ContestInstanceEntity.prototype, "instanceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "instanceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ContestInstanceEntity.prototype, "currentParticipants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ContestInstanceEntity.prototype, "maxParticipants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "entryCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ContestInstanceEntity.prototype, "entryFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "prizeAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "prizeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "periodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "periodName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ContestInstanceEntity.prototype, "isParticipant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ContestInstanceEntity.prototype, "status", void 0);
exports.ContestInstanceEntity = ContestInstanceEntity;
class ActiveContestInstancesResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveContestInstancesResponseDto.prototype, "periodName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveContestInstancesResponseDto.prototype, "periodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ActiveContestInstancesResponseDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ContestInstanceEntity, isArray: true }),
    __metadata("design:type", Array)
], ActiveContestInstancesResponseDto.prototype, "contestInstances", void 0);
exports.ActiveContestInstancesResponseDto = ActiveContestInstancesResponseDto;
class WrappedActiveContestInstancesResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActiveContestInstancesResponseDto, isArray: true }),
    __metadata("design:type", Array)
], WrappedActiveContestInstancesResponseDto.prototype, "data", void 0);
exports.WrappedActiveContestInstancesResponseDto = WrappedActiveContestInstancesResponseDto;
//# sourceMappingURL=activeContestInstances.dto.js.map