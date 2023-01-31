"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountConfirmationModule = void 0;
const common_1 = require("@nestjs/common");
const account_confirmation_service_1 = require("./account-confirmation.service");
const account_confirmation_email_service_1 = require("./account-confirmation-email.service");
const account_confirmation_links_service_1 = require("./account-confirmation-links.service");
const account_confirmation_repository_1 = require("./account-confirmation.repository");
let AccountConfirmationModule = class AccountConfirmationModule {
};
AccountConfirmationModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            account_confirmation_service_1.AccountConfirmationService,
            account_confirmation_email_service_1.AccountConfirmationEmailService,
            account_confirmation_links_service_1.AccountConfirmationLinksService,
            account_confirmation_repository_1.AccountConfirmationRepository,
        ],
        exports: [
            account_confirmation_service_1.AccountConfirmationService,
            account_confirmation_email_service_1.AccountConfirmationEmailService,
            account_confirmation_links_service_1.AccountConfirmationLinksService,
            account_confirmation_repository_1.AccountConfirmationRepository,
        ],
    })
], AccountConfirmationModule);
exports.AccountConfirmationModule = AccountConfirmationModule;
//# sourceMappingURL=account-confirmation.module.js.map