"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordModule = void 0;
const common_1 = require("@nestjs/common");
const forgot_password_controller_1 = require("./forgot-password.controller");
const forgot_password_repository_1 = require("./forgot-password.repository");
const forgot_password_service_1 = require("./forgot-password.service");
const forgot_password_email_service_1 = require("./forgot-password-email.service");
const forgot_password_links_service_1 = require("./forgot-password-links.service");
const entry_repository_1 = require("../../entry/entry.repository");
const entry_service_1 = require("../../entry/entry.service");
const firebase_auth_service_1 = require("../../firebase/firebase.auth.service");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
const account_confirmation_service_1 = require("../account-confirmation/account-confirmation.service");
const account_confirmation_email_service_1 = require("../account-confirmation/account-confirmation-email.service");
const account_confirmation_links_service_1 = require("../account-confirmation/account-confirmation-links.service");
const account_confirmation_repository_1 = require("../account-confirmation/account-confirmation.repository");
const tokens_module_1 = require("../../../../integrations/firebase/messages/tokens/tokens.module");
const events_module_1 = require("../../../../integrations/firebase/messages/events/events.module");
const follow_module_1 = require("../../../follow/follow.module");
let ForgotPasswordModule = class ForgotPasswordModule {
};
ForgotPasswordModule = __decorate([
    (0, common_1.Module)({
        controllers: [forgot_password_controller_1.ForgotPasswordController],
        imports: [tokens_module_1.TokensModule, events_module_1.EventsModule, follow_module_1.FollowModule],
        providers: [
            forgot_password_service_1.ForgotPasswordService,
            forgot_password_email_service_1.ForgotPasswordEmailService,
            forgot_password_links_service_1.ForgotPasswordLinksService,
            forgot_password_repository_1.ForgotPasswordRepository,
            entry_service_1.EntryService,
            entry_repository_1.EntryRepository,
            firebase_auth_service_1.FirebaseAuthService,
            transaction_manager_service_1.TransactionManager,
            account_confirmation_service_1.AccountConfirmationService,
            account_confirmation_email_service_1.AccountConfirmationEmailService,
            account_confirmation_links_service_1.AccountConfirmationLinksService,
            account_confirmation_repository_1.AccountConfirmationRepository,
        ],
    })
], ForgotPasswordModule);
exports.ForgotPasswordModule = ForgotPasswordModule;
//# sourceMappingURL=forgot-password.module.js.map