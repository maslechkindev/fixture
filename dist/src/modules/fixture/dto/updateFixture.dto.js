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
exports.WrappedUpdateFixtureResponseDto = exports.UpdateFixtureResponseDto = exports.UpdateFixtureDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const tables_1 = require("../../../interfaces/db/tables");
class UpdateFixtureDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a4cf795f-37d2-4eea-a5a0-2b5323978538',
            name: 'username',
            display: true,
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], UpdateFixtureDto.prototype, "fixture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UpdateFixtureDto.prototype, "markets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UpdateFixtureDto.prototype, "contests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UpdateFixtureDto.prototype, "marketLines", void 0);
exports.UpdateFixtureDto = UpdateFixtureDto;
class UpdateFixtureResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
    }),
    __metadata("design:type", Boolean)
], UpdateFixtureResponseDto.prototype, "success", void 0);
exports.UpdateFixtureResponseDto = UpdateFixtureResponseDto;
class WrappedUpdateFixtureResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UpdateFixtureResponseDto)
], WrappedUpdateFixtureResponseDto.prototype, "data", void 0);
exports.WrappedUpdateFixtureResponseDto = WrappedUpdateFixtureResponseDto;
//# sourceMappingURL=updateFixture.dto.js.map