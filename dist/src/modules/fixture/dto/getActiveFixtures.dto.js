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
exports.WrappedGetActiveFixturesResponse = exports.GetActiveFixturesRequestDto = exports.ActiveFixtureDto = exports.CustomQueryParametersCalidator = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let CustomQueryParametersCalidator = class CustomQueryParametersCalidator {
    validate(value) {
        return typeof value === 'string' || Array.isArray(value);
    }
    defaultMessage(args) {
        return `Parameter ${args.property} must be a string or an array of strings`;
    }
};
CustomQueryParametersCalidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'validateStringArray', async: false })
], CustomQueryParametersCalidator);
exports.CustomQueryParametersCalidator = CustomQueryParametersCalidator;
const class_transformer_1 = require("class-transformer");
var Direction;
(function (Direction) {
    Direction["ASC"] = "ASC";
    Direction["DESC"] = "DESC";
})(Direction || (Direction = {}));
class ActiveFixtureDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "fixtureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ActiveFixtureDto.prototype, "isLive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ActiveFixtureDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "currentPeriodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "currentPeriodName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "competitionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "competitionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "sportIcon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ActiveFixtureDto.prototype, "competitionIdCMS", void 0);
exports.ActiveFixtureDto = ActiveFixtureDto;
class GetActiveFixturesRequestDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '54' }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetActiveFixturesRequestDto.prototype, "competitionTemplateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetActiveFixturesRequestDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ example: '54' }),
    __metadata("design:type", String)
], GetActiveFixturesRequestDto.prototype, "fixtureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetActiveFixturesRequestDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Direction }),
    (0, class_validator_1.IsEnum)(Direction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetActiveFixturesRequestDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetActiveFixturesRequestDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.Validate)(CustomQueryParametersCalidator),
    (0, class_transformer_1.Transform)(({ value }) => {
        return typeof value === 'string' ? [value] : value;
    }),
    __metadata("design:type", Array)
], GetActiveFixturesRequestDto.prototype, "contestTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string' }),
    __metadata("design:type", String)
], GetActiveFixturesRequestDto.prototype, "search", void 0);
exports.GetActiveFixturesRequestDto = GetActiveFixturesRequestDto;
class WrappedGetActiveFixturesResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: ActiveFixtureDto, isArray: true }),
    __metadata("design:type", Array)
], WrappedGetActiveFixturesResponse.prototype, "data", void 0);
exports.WrappedGetActiveFixturesResponse = WrappedGetActiveFixturesResponse;
//# sourceMappingURL=getActiveFixtures.dto.js.map