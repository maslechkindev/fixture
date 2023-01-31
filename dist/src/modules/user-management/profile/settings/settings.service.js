"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const settings_repository_1 = require("./settings.repository");
const firestore_service_1 = require("../../../integrations/firebase/firestore/firestore.service");
const transaction_manager_service_1 = require("../../../ancillary/transaction-manager/transaction-manager.service");
const firebase_auth_service_1 = require("../../auth/firebase/firebase.auth.service");
const mailing_1 = require("../../../integrations/mailing");
const R = require("ramda");
let SettingsService = class SettingsService {
    constructor(settingsRepository, fireStoreService, transactionManager, firebaseAuthService, mailingClient) {
        this.settingsRepository = settingsRepository;
        this.fireStoreService = fireStoreService;
        this.transactionManager = transactionManager;
        this.firebaseAuthService = firebaseAuthService;
        this.mailingClient = mailingClient;
    }
    async updateNotifications(userId, notificationsEnabled) {
        await this.fireStoreService.mergeUpdate('users', userId, {
            notificationsEnabled,
        });
        const neccessaryFields = [
            'lastName',
            'state',
            'firstName',
            'notificationsEnabled',
            'email',
            'dateOfBirth',
            'country',
            'createdAt',
            'confirmedAt',
            'username',
        ];
        const [returnedFields] = await this.settingsRepository.updateNotifications(userId, notificationsEnabled, neccessaryFields);
        if (!returnedFields.notificationsEnabled) {
            await this.mailingClient.removeContact({ email: returnedFields.email });
            return;
        }
        const { dateOfBirth } = returnedFields;
        const dataToAddContact = Object.assign(Object.assign({}, R.omit(['dateOfBirth', 'notificationsEnabled'], returnedFields)), { registrationDate: returnedFields.createdAt, accountConfirmationDate: returnedFields.confirmedAt, dateOfBirth: dateOfBirth });
        await this.mailingClient.addUpdateContact(dataToAddContact);
    }
    async deactivateAccount(userId, email) {
        const txManager = await this.transactionManager.begin();
        try {
            await this.settingsRepository.deactivateAccount(txManager, userId);
            await this.firebaseAuthService.revokeRefreshTokens(userId);
            this.mailingClient.removeContact({ email });
            await txManager.commit();
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mailing_1.InjectMailing)()),
    __metadata("design:paramtypes", [settings_repository_1.SettingsRepository,
        firestore_service_1.FirestoreService,
        transaction_manager_service_1.TransactionManager,
        firebase_auth_service_1.FirebaseAuthService,
        mailing_1.MailingService])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map