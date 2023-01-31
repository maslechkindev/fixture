"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const management_module_1 = require("./management/management.module");
const profile_module_1 = require("./profile/profile.module");
const follow_module_1 = require("./follow/follow.module");
let UserManagementModule = class UserManagementModule {
};
UserManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, management_module_1.ManagementModule, profile_module_1.ProfileModule, follow_module_1.FollowModule],
    })
], UserManagementModule);
exports.UserManagementModule = UserManagementModule;
//# sourceMappingURL=user-management.module.js.map