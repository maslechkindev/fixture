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
exports.TokensOptionsDto = exports.DynamicZoneDto = exports.CmsPurchaseDto = void 0;
const componentNames_enum_1 = require("../../../purchase/enums/componentNames.enum");
const class_transformer_1 = require("class-transformer");
class CmsPurchaseDto {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Currency' }),
    __metadata("design:type", String)
], CmsPurchaseDto.prototype, "currency", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Name' }),
    __metadata("design:type", String)
], CmsPurchaseDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'created_at' }),
    __metadata("design:type", String)
], CmsPurchaseDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'updated_at' }),
    __metadata("design:type", String)
], CmsPurchaseDto.prototype, "updatedAt", void 0);
exports.CmsPurchaseDto = CmsPurchaseDto;
class DynamicZoneDto {
}
__decorate([
    (0, class_transformer_1.Expose)({ name: '__component' }),
    __metadata("design:type", String)
], DynamicZoneDto.prototype, "component", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Qty_to_sell' }),
    __metadata("design:type", Number)
], DynamicZoneDto.prototype, "qtyToSell", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Premium' }),
    __metadata("design:type", Boolean)
], DynamicZoneDto.prototype, "premium", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'From_date' }),
    __metadata("design:type", String)
], DynamicZoneDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'To_date' }),
    __metadata("design:type", String)
], DynamicZoneDto.prototype, "endDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Tokens' }),
    __metadata("design:type", Object)
], DynamicZoneDto.prototype, "tokens", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Allowed_months_number' }),
    __metadata("design:type", Number)
], DynamicZoneDto.prototype, "allowedMonthsNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Price_per_period' }),
    __metadata("design:type", Number)
], DynamicZoneDto.prototype, "pricePerPeriod", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Total_amount' }),
    __metadata("design:type", Number)
], DynamicZoneDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Price_per_month' }),
    __metadata("design:type", Number)
], DynamicZoneDto.prototype, "pricePerMonth", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Description' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value)) {
            const descriptionObj = value[0];
            const { Description_text: descriptionText } = descriptionObj;
            return descriptionText;
        }
    }),
    __metadata("design:type", String)
], DynamicZoneDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'Tokens_options' }),
    __metadata("design:type", Array)
], DynamicZoneDto.prototype, "tokensOptions", void 0);
exports.DynamicZoneDto = DynamicZoneDto;
class TokensOptionsDto {
}
exports.TokensOptionsDto = TokensOptionsDto;
//# sourceMappingURL=purchase.dto.js.map