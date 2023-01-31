"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityLinksModule = void 0;
const common_1 = require("@nestjs/common");
const forgot_password_module_1 = require("./forgot-password/forgot-password.module");
const account_confirmation_module_1 = require("./account-confirmation/account-confirmation.module");
let UserActivityLinksModule = class UserActivityLinksModule {
};
UserActivityLinksModule = __decorate([
    (0, common_1.Module)({
        imports: [forgot_password_module_1.ForgotPasswordModule, account_confirmation_module_1.AccountConfirmationModule],
    })
], UserActivityLinksModule);
exports.UserActivityLinksModule = UserActivityLinksModule;
//# sourceMappingURL=user-activity-links.module.js.map