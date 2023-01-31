"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookModule = void 0;
const common_1 = require("@nestjs/common");
const facebook_controller_1 = require("./facebook.controller");
const facebook_repository_1 = require("./facebook.repository");
const facebook_service_1 = require("./facebook.service");
const entry_service_1 = require("../entry.service");
const entry_repository_1 = require("../entry.repository");
const firebase_auth_service_1 = require("../../firebase/firebase.auth.service");
const axios_1 = require("@nestjs/axios");
const facebook_api_service_1 = require("./facebook-api.service");
const account_confirmation_service_1 = require("../../user-activity-links/account-confirmation/account-confirmation.service");
const account_confirmation_email_service_1 = require("../../user-activity-links/account-confirmation/account-confirmation-email.service");
const account_confirmation_links_service_1 = require("../../user-activity-links/account-confirmation/account-confirmation-links.service");
const account_confirmation_repository_1 = require("../../user-activity-links/account-confirmation/account-confirmation.repository");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
const follow_module_1 = require("../../../follow/follow.module");
let FacebookModule = class FacebookModule {
};
FacebookModule = __decorate([
    (0, common_1.Module)({
        controllers: [facebook_controller_1.FacebookSSOController],
        imports: [axios_1.HttpModule, follow_module_1.FollowModule],
        providers: [
            facebook_repository_1.FacebookSSORepository,
            facebook_service_1.FacebookSSOService,
            entry_service_1.EntryService,
            entry_repository_1.EntryRepository,
            firebase_auth_service_1.FirebaseAuthService,
            facebook_api_service_1.FacebookAPIService,
            account_confirmation_service_1.AccountConfirmationService,
            account_confirmation_email_service_1.AccountConfirmationEmailService,
            account_confirmation_links_service_1.AccountConfirmationLinksService,
            account_confirmation_repository_1.AccountConfirmationRepository,
            transaction_manager_service_1.TransactionManager,
        ],
    })
], FacebookModule);
exports.FacebookModule = FacebookModule;
//# sourceMappingURL=facebook.module.js.map