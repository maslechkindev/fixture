"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpModule = void 0;
const common_1 = require("@nestjs/common");
const signUp_controller_1 = require("./signUp.controller");
const signUp_service_1 = require("./signUp.service");
const entry_service_1 = require("../../entry.service");
const entry_repository_1 = require("../../entry.repository");
const transaction_manager_service_1 = require("../../../../../ancillary/transaction-manager/transaction-manager.service");
const account_confirmation_module_1 = require("../../../user-activity-links/account-confirmation/account-confirmation.module");
const follow_module_1 = require("../../../../follow/follow.module");
const auth_middleware_1 = require("../../../../../../middlewares/auth/auth.middleware");
const auth_module_1 = require("../../../../../../middlewares/auth/auth.module");
let SignUpModule = class SignUpModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({
            path: 'auth/signup/custom-token',
            method: common_1.RequestMethod.GET,
        });
    }
};
SignUpModule = __decorate([
    (0, common_1.Module)({
        controllers: [signUp_controller_1.SignUpController],
        providers: [signUp_service_1.SignUpService, entry_service_1.EntryService, entry_repository_1.EntryRepository, transaction_manager_service_1.TransactionManager],
        imports: [account_confirmation_module_1.AccountConfirmationModule, follow_module_1.FollowModule, auth_module_1.AuthMiddlewareModule],
    })
], SignUpModule);
exports.SignUpModule = SignUpModule;
//# sourceMappingURL=signUp.module.js.map