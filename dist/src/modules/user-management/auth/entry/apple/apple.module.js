"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleEntryModule = void 0;
const common_1 = require("@nestjs/common");
const apple_controller_1 = require("./apple.controller");
const apple_service_1 = require("./apple.service");
const apple_repository_1 = require("./apple.repository");
const entry_service_1 = require("../entry.service");
const entry_repository_1 = require("../entry.repository");
const account_confirmation_service_1 = require("../../user-activity-links/account-confirmation/account-confirmation.service");
const account_confirmation_email_service_1 = require("../../user-activity-links/account-confirmation/account-confirmation-email.service");
const account_confirmation_links_service_1 = require("../../user-activity-links/account-confirmation/account-confirmation-links.service");
const account_confirmation_repository_1 = require("../../user-activity-links/account-confirmation/account-confirmation.repository");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
const follow_module_1 = require("../../../follow/follow.module");
let AppleEntryModule = class AppleEntryModule {
};
AppleEntryModule = __decorate([
    (0, common_1.Module)({
        controllers: [apple_controller_1.AppleSSOController],
        providers: [
            apple_service_1.AppleSSOService,
            apple_repository_1.AppleSSORepository,
            entry_service_1.EntryService,
            entry_repository_1.EntryRepository,
            account_confirmation_service_1.AccountConfirmationService,
            account_confirmation_email_service_1.AccountConfirmationEmailService,
            account_confirmation_links_service_1.AccountConfirmationLinksService,
            account_confirmation_repository_1.AccountConfirmationRepository,
            transaction_manager_service_1.TransactionManager,
        ],
        imports: [follow_module_1.FollowModule],
    })
], AppleEntryModule);
exports.AppleEntryModule = AppleEntryModule;
//# sourceMappingURL=apple.module.js.map