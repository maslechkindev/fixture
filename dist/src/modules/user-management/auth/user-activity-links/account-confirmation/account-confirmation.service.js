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
exports.AccountConfirmationService = void 0;
const auth_1 = require("../../../../../helpers/auth");
const account_confirmation_repository_1 = require("./account-confirmation.repository");
const account_confirmation_email_service_1 = require("./account-confirmation-email.service");
const account_confirmation_links_service_1 = require("./account-confirmation-links.service");
const common_1 = require("@nestjs/common");
const userVerificationTokenData_types_1 = require("../../entry/email/signup/types/userVerificationTokenData.types");
let AccountConfirmationService = class AccountConfirmationService {
    constructor(accountConfirmationEmailService, accountConfirmationLinksService, accountConfirmationRepository) {
        this.accountConfirmationEmailService = accountConfirmationEmailService;
        this.accountConfirmationLinksService = accountConfirmationLinksService;
        this.accountConfirmationRepository = accountConfirmationRepository;
    }
    async createAndSetEmailVerificationToken(email, ip = '') {
        const token = (0, auth_1.generateRandomBytes)();
        await this.accountConfirmationRepository.setOrUpdateEmailVerificationToken(token, email, ip);
        return token;
    }
    async sendConfirmationEmail(email, token, templateId) {
        const shortLink = await this.accountConfirmationLinksService.createConfirmationLink(token);
        await this.accountConfirmationEmailService.sendConfirmationEmail(email, shortLink, templateId);
    }
    async isBlockedToResendConfirmationLink(email, ip) {
        return this.accountConfirmationRepository.minutesBlocked(email, ip);
    }
    async getVerifyAccountEmailTokenData(token) {
        return this.accountConfirmationRepository.getVerifyAccountEmailTokenData(token);
    }
    async getLastValidTokenByEmail(email) {
        return this.accountConfirmationRepository.getLastValidTokenByEmail(email);
    }
    async deleteUserConfirmationEmailTokens(email) {
        return this.accountConfirmationRepository.deleteUserConfirmationEmailTokens(email);
    }
};
AccountConfirmationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_confirmation_email_service_1.AccountConfirmationEmailService,
        account_confirmation_links_service_1.AccountConfirmationLinksService,
        account_confirmation_repository_1.AccountConfirmationRepository])
], AccountConfirmationService);
exports.AccountConfirmationService = AccountConfirmationService;
//# sourceMappingURL=account-confirmation.service.js.map