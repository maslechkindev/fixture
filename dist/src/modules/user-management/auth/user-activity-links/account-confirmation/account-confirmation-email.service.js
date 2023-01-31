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
exports.AccountConfirmationEmailService = void 0;
const mailing_1 = require("../../../../integrations/mailing");
const config_1 = require("../../../../../config");
let AccountConfirmationEmailService = class AccountConfirmationEmailService {
    constructor(mailingClient) {
        this.mailingClient = mailingClient;
    }
    async sendConfirmationEmail(to, link, templateId) {
        const html = `<div>${link}</div>`;
        const dynamicTemplateData = {
            usermail: to,
            confirmationLink: link,
            homeLink: `${config_1.default.LINK_PREFIX}`,
            privacyPolicy: `${config_1.default.LINK_PREFIX}privacy-policy`,
            contactUs: `${config_1.default.LINK_PREFIX}contact-us`,
        };
        await this.mailingClient.send({
            to,
            html,
            subject: 'Complete your SportingHood account registration',
            templateId,
            dynamicTemplateData,
        });
    }
};
AccountConfirmationEmailService = __decorate([
    __param(0, (0, mailing_1.InjectMailing)()),
    __metadata("design:paramtypes", [mailing_1.MailingService])
], AccountConfirmationEmailService);
exports.AccountConfirmationEmailService = AccountConfirmationEmailService;
//# sourceMappingURL=account-confirmation-email.service.js.map