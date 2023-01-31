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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpService = void 0;
const common_1 = require("@nestjs/common");
const entry_repository_1 = require("../../entry.repository");
const entry_service_1 = require("../../entry.service");
const transaction_manager_service_1 = require("../../../../../ancillary/transaction-manager/transaction-manager.service");
const user_interface_1 = require("../../../../../../interfaces/user.interface");
const auth_1 = require("../../../../../../helpers/auth");
const userStatus_1 = require("../../../../../../enums/userStatus");
let SignUpService = class SignUpService {
    constructor(entryService, entryRepository, transactionManager) {
        this.entryService = entryService;
        this.entryRepository = entryRepository;
        this.transactionManager = transactionManager;
    }
    async saveUser(createUserDto, usedPromoCode) {
        const salt = (0, auth_1.generateRandomBytes)();
        const passwordHash = await (0, auth_1.getPasswordHash)(createUserDto.password, salt);
        const { promoCode, referralLink } = await this.entryService.createReferralLink();
        const newUser = {
            email: createUserDto.email,
            dateOfBirth: createUserDto.dateOfBirth,
            passwordHash,
            salt,
            status: userStatus_1.userStatus.NOT_CONFIRMED,
            promoCode,
            referralLink,
            country: createUserDto.country,
            state: createUserDto.state,
        };
        const txManager = await this.transactionManager.begin();
        try {
            const savedUser = await this.entryRepository.createUser(txManager, newUser);
            await this.entryService.setupUser(txManager, savedUser.id, savedUser.notificationsEnabled, userStatus_1.userStatus.NOT_CONFIRMED, usedPromoCode, savedUser);
            await txManager.commit();
            return savedUser;
        }
        catch (err) {
            await txManager.rollback();
            throw err;
        }
    }
};
SignUpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [entry_service_1.EntryService,
        entry_repository_1.EntryRepository,
        transaction_manager_service_1.TransactionManager])
], SignUpService);
exports.SignUpService = SignUpService;
//# sourceMappingURL=signUp.service.js.map