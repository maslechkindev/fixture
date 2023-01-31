"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordModule = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../../../../middlewares/auth/auth.middleware");
const change_password_service_1 = require("./change-password.service");
const change_password_controller_1 = require("./change-password.controller");
const change_password_repository_1 = require("./change-password.repository");
const firebase_auth_service_1 = require("../../auth/firebase/firebase.auth.service");
const profile_repository_1 = require("../profile.repository");
const profile_service_1 = require("../profile.service");
const tokens_module_1 = require("../../../integrations/firebase/messages/tokens/tokens.module");
const events_module_1 = require("../../../integrations/firebase/messages/events/events.module");
const auth_module_1 = require("../../../../middlewares/auth/auth.module");
let ChangePasswordModule = class ChangePasswordModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(change_password_controller_1.ChangePasswordController);
    }
};
ChangePasswordModule = __decorate([
    (0, common_1.Module)({
        controllers: [change_password_controller_1.ChangePasswordController],
        providers: [
            change_password_service_1.ChangePasswordService,
            change_password_repository_1.ChangePasswordRepository,
            firebase_auth_service_1.FirebaseAuthService,
            profile_repository_1.ProfileRepository,
            profile_service_1.ProfileService,
        ],
        imports: [tokens_module_1.TokensModule, events_module_1.EventsModule, auth_module_1.AuthMiddlewareModule],
    })
], ChangePasswordModule);
exports.ChangePasswordModule = ChangePasswordModule;
//# sourceMappingURL=change-password.module.js.map