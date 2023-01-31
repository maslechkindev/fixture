"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../../../../../middlewares/auth/auth.middleware");
const notifications_service_1 = require("./notifications.service");
const notifications_controller_1 = require("./notifications.controller");
const firebase_admin_module_1 = require("../../admin/firebase-admin.module");
const firestore_module_1 = require("../../firestore/firestore.module");
const firebase_auth_module_1 = require("../../../../user-management/auth/firebase/firebase.auth.module");
const entry_module_1 = require("../../../../user-management/auth/entry/entry.module");
const tokens_module_1 = require("../tokens/tokens.module");
const auth_module_1 = require("../../../../../middlewares/auth/auth.module");
let NotificationsModule = class NotificationsModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'notifications/read', method: common_1.RequestMethod.PUT });
    }
};
NotificationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService],
        imports: [
            auth_module_1.AuthMiddlewareModule,
            firebase_admin_module_1.FirebaseAdminModule,
            firestore_module_1.FirestoreModule,
            tokens_module_1.TokensModule,
            entry_module_1.EntryModule,
            firebase_auth_module_1.FirebaseAuthModule,
        ],
        exports: [notifications_service_1.NotificationsService],
    })
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map