"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleEntryModule = void 0;
const common_1 = require("@nestjs/common");
const entry_service_1 = require("../entry.service");
const entry_repository_1 = require("../entry.repository");
const firebase_auth_service_1 = require("../../firebase/firebase.auth.service");
const google_controller_1 = require("./google.controller");
const google_service_1 = require("./google.service");
const google_repository_1 = require("./google.repository");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
const follow_module_1 = require("../../../follow/follow.module");
let GoogleEntryModule = class GoogleEntryModule {
};
GoogleEntryModule = __decorate([
    (0, common_1.Module)({
        controllers: [google_controller_1.GoogleSSOController],
        providers: [
            google_service_1.GoogleSSOService,
            google_repository_1.GoogleSSORepository,
            entry_service_1.EntryService,
            entry_repository_1.EntryRepository,
            firebase_auth_service_1.FirebaseAuthService,
            transaction_manager_service_1.TransactionManager,
        ],
        imports: [follow_module_1.FollowModule],
    })
], GoogleEntryModule);
exports.GoogleEntryModule = GoogleEntryModule;
//# sourceMappingURL=google.module.js.map