"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../../../../middlewares/auth/auth.middleware");
const settings_service_1 = require("./settings.service");
const settings_repository_1 = require("./settings.repository");
const settings_controller_1 = require("./settings.controller");
const firebase_auth_module_1 = require("../../auth/firebase/firebase.auth.module");
const firestore_module_1 = require("../../../integrations/firebase/firestore/firestore.module");
const auth_module_1 = require("../../../../middlewares/auth/auth.module");
let SettingsModule = class SettingsModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(settings_controller_1.SettingsController);
    }
};
SettingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [settings_controller_1.SettingsController],
        providers: [settings_service_1.SettingsService, settings_repository_1.SettingsRepository],
        imports: [firebase_auth_module_1.FirebaseAuthModule, firestore_module_1.FirestoreModule, auth_module_1.AuthMiddlewareModule],
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map