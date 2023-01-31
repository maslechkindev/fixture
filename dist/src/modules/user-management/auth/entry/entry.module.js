"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryModule = void 0;
const common_1 = require("@nestjs/common");
const email_entry_module_1 = require("./email/email.entry.module");
const google_module_1 = require("./google/google.module");
const entry_repository_1 = require("./entry.repository");
const apple_module_1 = require("./apple/apple.module");
const facebook_module_1 = require("./facebook/facebook.module");
const entry_service_1 = require("./entry.service");
const firestore_service_1 = require("../../../integrations/firebase/firestore/firestore.service");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const firestore_module_1 = require("../../../integrations/firebase/firestore/firestore.module");
const follow_module_1 = require("../../follow/follow.module");
let EntryModule = class EntryModule {
};
EntryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_entry_module_1.EmailEntryModule,
            google_module_1.GoogleEntryModule,
            firestore_module_1.FirestoreModule,
            apple_module_1.AppleEntryModule,
            facebook_module_1.FacebookModule,
            follow_module_1.FollowModule,
        ],
        providers: [
            entry_repository_1.EntryRepository,
            entry_service_1.EntryService,
            transaction_manager_service_1.TransactionManager,
            firestore_service_1.FirestoreService,
        ],
        exports: [entry_repository_1.EntryRepository, entry_service_1.EntryService],
    })
], EntryModule);
exports.EntryModule = EntryModule;
//# sourceMappingURL=entry.module.js.map