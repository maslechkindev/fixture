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
exports.WrappedPostFixtureStartFreeBetsResponseDto = exports.PostLockOddsChangeResponseDto = exports.PostLockOddsChangeDto = exports.LockOdds = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LockOdds {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '6',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], LockOdds.prototype, "contestTemplate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a1d5ea45-edbf-4409-a313-6ca223cf4718',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LockOdds.prototype, "fixtureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LockOdds.prototype, "lockOdds", void 0);
exports.LockOdds = LockOdds;
class PostLockOddsChangeDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => LockOdds),
    __metadata("design:type", Array)
], PostLockOddsChangeDto.prototype, "lockOdds", void 0);
exports.PostLockOddsChangeDto = PostLockOddsChangeDto;
class PostLockOddsChangeResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PostLockOddsChangeResponseDto.prototype, "success", void 0);
exports.PostLockOddsChangeResponseDto = PostLockOddsChangeResponseDto;
class WrappedPostFixtureStartFreeBetsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PostLockOddsChangeResponseDto)
], WrappedPostFixtureStartFreeBetsResponseDto.prototype, "data", void 0);
exports.WrappedPostFixtureStartFreeBetsResponseDto = WrappedPostFixtureStartFreeBetsResponseDto;
//# sourceMappingURL=postLockOddsChange.dto.js.map