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
exports.MarketTypeForFirestoreDto = exports.MarketGroupByIdResponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class MarketGroupByIdResponseDto {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Name' }),
    __metadata("design:type", String)
], MarketGroupByIdResponseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Competition' }),
    __metadata("design:type", Array)
], MarketGroupByIdResponseDto.prototype, "competition", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'published_at' }),
    __metadata("design:type", String)
], MarketGroupByIdResponseDto.prototype, "publishedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'created_at' }),
    __metadata("design:type", String)
], MarketGroupByIdResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'updated_at' }),
    __metadata("design:type", String)
], MarketGroupByIdResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Market_group' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const [marketGroup] = value;
        if (marketGroup === null || marketGroup === void 0 ? void 0 : marketGroup.Market_type) {
            const { Market_type: marketTypes } = marketGroup;
            return marketTypes;
        }
    }),
    __metadata("design:type", Array)
], MarketGroupByIdResponseDto.prototype, "marketTypesArray", void 0);
exports.MarketGroupByIdResponseDto = MarketGroupByIdResponseDto;
class MarketTypeForFirestoreDto {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Type_id' }),
    __metadata("design:type", String)
], MarketTypeForFirestoreDto.prototype, "typeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'id' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        return typeof value === 'string' ? value : String(value);
    }),
    __metadata("design:type", Number)
], MarketTypeForFirestoreDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Market_type' }),
    __metadata("design:type", String)
], MarketTypeForFirestoreDto.prototype, "name", void 0);
exports.MarketTypeForFirestoreDto = MarketTypeForFirestoreDto;
//# sourceMappingURL=marketGroups.dto.js.map