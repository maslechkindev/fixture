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
exports.WrappedPostFixtureStartFreeBetsResponseDto = exports.PostFixtureStartFreeBetsResponseDto = exports.PostFixtureStartFreeBetsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PostFixtureStartFreeBetsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'free bet title',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostFixtureStartFreeBetsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'free bet info',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PostFixtureStartFreeBetsDto.prototype, "info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(30),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PostFixtureStartFreeBetsDto.prototype, "durationMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 300,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(99999),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PostFixtureStartFreeBetsDto.prototype, "betLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 300,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(60),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PostFixtureStartFreeBetsDto.prototype, "notifyInSec", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PostFixtureStartFreeBetsDto.prototype, "lockOdds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['b59f3d44-b985-42b3-85be-2f29440ca084'],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], PostFixtureStartFreeBetsDto.prototype, "markets", void 0);
exports.PostFixtureStartFreeBetsDto = PostFixtureStartFreeBetsDto;
class PostFixtureStartFreeBetsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PostFixtureStartFreeBetsResponseDto.prototype, "success", void 0);
exports.PostFixtureStartFreeBetsResponseDto = PostFixtureStartFreeBetsResponseDto;
class WrappedPostFixtureStartFreeBetsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PostFixtureStartFreeBetsResponseDto)
], WrappedPostFixtureStartFreeBetsResponseDto.prototype, "data", void 0);
exports.WrappedPostFixtureStartFreeBetsResponseDto = WrappedPostFixtureStartFreeBetsResponseDto;
//# sourceMappingURL=postFixtureStatFreeBets.dto.js.map