"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const change_password_module_1 = require("./change-password/change-password.module");
const change_username_module_1 = require("./change-username/change-username.module");
const profile_repository_1 = require("./profile.repository");
const profile_service_1 = require("./profile.service");
const personal_details_module_1 = require("./personal-details/personal-details.module");
const settings_module_1 = require("./settings/settings.module");
const balance_module_1 = require("./balance/balance.module");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            change_password_module_1.ChangePasswordModule,
            change_username_module_1.ChangeUsernameModule,
            personal_details_module_1.PersonalDetailsModule,
            settings_module_1.SettingsModule,
            balance_module_1.BalanceModule,
        ],
        providers: [profile_service_1.ProfileService, profile_repository_1.ProfileRepository],
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map