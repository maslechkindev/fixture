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
exports.WrappedSearchUserInstanceResponseDto = exports.SearchUserContestInstanceResponseDto = exports.SearchUserContestInstancesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SearchUserContestInstancesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserContestInstancesDto.prototype, "subString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchUserContestInstancesDto.prototype, "userId", void 0);
exports.SearchUserContestInstancesDto = SearchUserContestInstancesDto;
class SearchUserContestInstanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchUserContestInstanceResponseDto.prototype, "contestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchUserContestInstanceResponseDto.prototype, "instanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SearchUserContestInstanceResponseDto.prototype, "instanceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchUserContestInstanceResponseDto.prototype, "instanceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchUserContestInstanceResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SearchUserContestInstanceResponseDto.prototype, "currentParticipants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SearchUserContestInstanceResponseDto.prototype, "maxParticipants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchUserContestInstanceResponseDto.prototype, "entryCurrency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SearchUserContestInstanceResponseDto.prototype, "entryFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchUserContestInstanceResponseDto.prototype, "prizeAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SearchUserContestInstanceResponseDto.prototype, "leavingAllowed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SearchUserContestInstanceResponseDto.prototype, "templateId", void 0);
exports.SearchUserContestInstanceResponseDto = SearchUserContestInstanceResponseDto;
class WrappedSearchUserInstanceResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: SearchUserContestInstanceResponseDto, isArray: true }),
    __metadata("design:type", Array)
], WrappedSearchUserInstanceResponseDto.prototype, "data", void 0);
exports.WrappedSearchUserInstanceResponseDto = WrappedSearchUserInstanceResponseDto;
//# sourceMappingURL=searchLiveContestInstances.dto.js.map