"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeModule = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const config_1 = require("../../../config");
const stripe = new stripe_1.default(config_1.default.PAYMENTS_INFO.STRIPE_API_KEY, {
    apiVersion: '2022-08-01',
});
let StripeModule = class StripeModule {
};
StripeModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [],
        providers: [{ provide: 'STRIPE', useValue: stripe }],
        exports: ['STRIPE'],
    })
], StripeModule);
exports.StripeModule = StripeModule;
//# sourceMappingURL=stripe.module.js.map