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
exports.WrappedGetFixturesResponse = exports.GetFixturesDto = exports.GetFixturesRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var Direction;
(function (Direction) {
    Direction["ASC"] = "ASC";
    Direction["DESC"] = "DESC";
})(Direction || (Direction = {}));
class GetFixturesRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, example: [1, 2, 3] }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], GetFixturesRequestDto.prototype, "statuses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetFixturesRequestDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetFixturesRequestDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: Direction }),
    (0, class_validator_1.IsEnum)(Direction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetFixturesRequestDto.prototype, "direction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GetFixturesRequestDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string' }),
    __metadata("design:type", String)
], GetFixturesRequestDto.prototype, "search", void 0);
exports.GetFixturesRequestDto = GetFixturesRequestDto;
class GetFixturesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
                name: 'fixture',
                competition: 'competition',
                startTime: 'start time',
                state: 'state',
                currentPeriod: new Date('01/01/2021'),
                active: true,
            },
        ],
    }),
    __metadata("design:type", Array)
], GetFixturesDto.prototype, "fixtures", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], GetFixturesDto.prototype, "count", void 0);
exports.GetFixturesDto = GetFixturesDto;
class WrappedGetFixturesResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: GetFixturesDto, isArray: true }),
    __metadata("design:type", Array)
], WrappedGetFixturesResponse.prototype, "data", void 0);
exports.WrappedGetFixturesResponse = WrappedGetFixturesResponse;
//# sourceMappingURL=getfixtures.dto.js.map