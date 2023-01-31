"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const users_repository_1 = require("./users.repository");
const account_confirmation_module_1 = require("../../auth/user-activity-links/account-confirmation/account-confirmation.module");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const firebase_auth_service_1 = require("../../auth/firebase/firebase.auth.service");
const contest_instance_participants_module_1 = require("../../../contest-instance/contest-instance-participants/contest-instance-participants.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            users_repository_1.UsersRepository,
            transaction_manager_service_1.TransactionManager,
            firebase_auth_service_1.FirebaseAuthService,
        ],
        imports: [account_confirmation_module_1.AccountConfirmationModule, contest_instance_participants_module_1.ContestInstanceParticipantsModule],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map