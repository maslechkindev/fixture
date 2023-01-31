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
exports.WrappedPostFixtureCreateContestsBulkResponseDto = exports.PostFixtureCreateContestsBulkResponseDto = exports.PostFixtureCreateContestsBulkRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PostFixtureCreateContestsBulkRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'fixture id field',
    }),
    __metadata("design:type", String)
], PostFixtureCreateContestsBulkRequestDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '[cmsContestTemplateId, cmsContestTemplateId2]',
    }),
    __metadata("design:type", String)
], PostFixtureCreateContestsBulkRequestDto.prototype, "cmsContestTemplateIds", void 0);
exports.PostFixtureCreateContestsBulkRequestDto = PostFixtureCreateContestsBulkRequestDto;
class PostFixtureCreateContestsBulkResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PostFixtureCreateContestsBulkResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PostFixtureCreateContestsBulkResponseDto.prototype, "notCreatedContests", void 0);
exports.PostFixtureCreateContestsBulkResponseDto = PostFixtureCreateContestsBulkResponseDto;
class WrappedPostFixtureCreateContestsBulkResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PostFixtureCreateContestsBulkResponseDto)
], WrappedPostFixtureCreateContestsBulkResponseDto.prototype, "data", void 0);
exports.WrappedPostFixtureCreateContestsBulkResponseDto = WrappedPostFixtureCreateContestsBulkResponseDto;
//# sourceMappingURL=postFixtureCreateContestsBulk.dto.js.map