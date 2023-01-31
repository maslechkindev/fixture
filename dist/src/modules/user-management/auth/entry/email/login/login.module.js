"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const entry_service_1 = require("../../entry.service");
const entry_repository_1 = require("../../entry.repository");
const login_controller_1 = require("./login.controller");
const login_service_1 = require("./login.service");
const login_repository_1 = require("./login.repository");
const transaction_manager_service_1 = require("../../../../../ancillary/transaction-manager/transaction-manager.service");
const follow_module_1 = require("../../../../follow/follow.module");
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    (0, common_1.Module)({
        controllers: [login_controller_1.LoginController],
        providers: [
            login_service_1.LoginService,
            entry_service_1.EntryService,
            entry_repository_1.EntryRepository,
            login_repository_1.LoginRepository,
            transaction_manager_service_1.TransactionManager,
        ],
        imports: [follow_module_1.FollowModule],
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map