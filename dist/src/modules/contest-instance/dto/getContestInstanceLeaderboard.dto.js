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
exports.WrappedGetContestInstanceLeaderboardResponseDto = exports.GetContestInstanceLeaderboardResponseDto = exports.GetContestInstanceLeaderboardRequestDto = exports.LeaderboardRow = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LeaderboardRow {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeaderboardRow.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeaderboardRow.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], LeaderboardRow.prototype, "registrationTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeaderboardRow.prototype, "totalBalance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeaderboardRow.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeaderboardRow.prototype, "place", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], LeaderboardRow.prototype, "prize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeaderboardRow.prototype, "prizeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], LeaderboardRow.prototype, "prizePlace", void 0);
exports.LeaderboardRow = LeaderboardRow;
class GetContestInstanceLeaderboardRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contestInstanceId' }),
    __metadata("design:type", String)
], GetContestInstanceLeaderboardRequestDto.prototype, "contestInstanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GetContestInstanceLeaderboardRequestDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetContestInstanceLeaderboardRequestDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' || value === true),
    __metadata("design:type", Boolean)
], GetContestInstanceLeaderboardRequestDto.prototype, "followingOnly", void 0);
exports.GetContestInstanceLeaderboardRequestDto = GetContestInstanceLeaderboardRequestDto;
class GetContestInstanceLeaderboardResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: LeaderboardRow, isArray: true }),
    __metadata("design:type", Array)
], GetContestInstanceLeaderboardResponseDto.prototype, "leaderboard", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LeaderboardRow }),
    __metadata("design:type", Object)
], GetContestInstanceLeaderboardResponseDto.prototype, "playerInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LeaderboardRow }),
    __metadata("design:type", Object)
], GetContestInstanceLeaderboardResponseDto.prototype, "myInfo", void 0);
exports.GetContestInstanceLeaderboardResponseDto = GetContestInstanceLeaderboardResponseDto;
class WrappedGetContestInstanceLeaderboardResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", GetContestInstanceLeaderboardResponseDto)
], WrappedGetContestInstanceLeaderboardResponseDto.prototype, "data", void 0);
exports.WrappedGetContestInstanceLeaderboardResponseDto = WrappedGetContestInstanceLeaderboardResponseDto;
//# sourceMappingURL=getContestInstanceLeaderboard.dto.js.map