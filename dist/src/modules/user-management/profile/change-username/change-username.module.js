"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUsernameModule = void 0;
const common_1 = require("@nestjs/common");
const change_username_service_1 = require("./change-username.service");
const change_username_repository_1 = require("./change-username.repository");
const firebase_auth_service_1 = require("../../auth/firebase/firebase.auth.service");
const profile_repository_1 = require("../profile.repository");
const profile_service_1 = require("../profile.service");
const entry_module_1 = require("../../auth/entry/entry.module");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const notifications_module_1 = require("../../../integrations/firebase/messages/notifications/notifications.module");
const contest_instance_participants_module_1 = require("../../../contest-instance/contest-instance-participants/contest-instance-participants.module");
let ChangeUsernameModule = class ChangeUsernameModule {
};
ChangeUsernameModule = __decorate([
    (0, common_1.Module)({
        providers: [
            change_username_service_1.ChangeUsernameService,
            change_username_repository_1.ChangeUsernameRepository,
            firebase_auth_service_1.FirebaseAuthService,
            profile_repository_1.ProfileRepository,
            profile_service_1.ProfileService,
            transaction_manager_service_1.TransactionManager,
        ],
        imports: [
            entry_module_1.EntryModule,
            notifications_module_1.NotificationsModule,
            contest_instance_participants_module_1.ContestInstanceParticipantsModule,
        ],
        exports: [change_username_service_1.ChangeUsernameService, change_username_repository_1.ChangeUsernameRepository],
    })
], ChangeUsernameModule);
exports.ChangeUsernameModule = ChangeUsernameModule;
//# sourceMappingURL=change-username.module.js.map