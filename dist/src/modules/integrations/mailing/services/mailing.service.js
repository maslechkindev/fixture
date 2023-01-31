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
var MailingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingService = void 0;
const common_1 = require("@nestjs/common");
const R = require("ramda");
const sendgrid = require("@sendgrid/mail");
const sendgridApiClient = require("@sendgrid/client");
const config_1 = require("../../../../config");
const nodemailer = require("nodemailer");
const mailing_constants_1 = require("../common/mailing.constants");
var ContactFields;
(function (ContactFields) {
    ContactFields["date_of_birth"] = "date_of_birth";
    ContactFields["registration_date"] = "registration_date";
    ContactFields["account_confirmation_date"] = "account_confirmation_date";
    ContactFields["unique_name"] = "unique_name";
})(ContactFields || (ContactFields = {}));
const contactFieldsMap = {
    dateOfBirth: ContactFields.date_of_birth,
    registrationDate: ContactFields.registration_date,
    accountConfirmationDate: ContactFields.account_confirmation_date,
    username: ContactFields.unique_name,
};
let MailingService = MailingService_1 = class MailingService {
    constructor(options) {
        this.options = options;
        this.logger = new common_1.Logger(MailingService_1.name);
        sendgrid.setApiKey(options.sendGrid.apiKey);
        sendgridApiClient.setApiKey(options.sendGrid.apiKey);
        this.sendgridClient = sendgrid;
        this.etherealActive = config_1.default.MAILING.ETHEREAL.IS_ACTIVE;
        this.sendgridApiClient = sendgridApiClient;
        if (this.etherealActive) {
            this.etherealClient = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: options.ethereal.user,
                    pass: options.ethereal.pass,
                },
            });
        }
    }
    getAllCustomFields() {
        const request = {
            url: `/v3/marketing/field_definitions`,
            method: 'GET',
        };
        return this.sendgridApiClient.request(request);
    }
    fieldsMapper(contact) {
        const result = {};
        for (const key of Object.keys(contactFieldsMap)) {
            if (contact[key]) {
                result[contactFieldsMap[key]] = contact[key];
            }
        }
        return result;
    }
    async addUpdateContact(contact) {
        var _a, _b;
        const merged = Object.assign(Object.assign({}, contact), this.fieldsMapper(contact));
        try {
            if (this.sendgridApiClient &&
                config_1.default.MAILING.SENDGRID.CONTACT_MANAGEMENT_ACTIVE) {
                const [response] = (await this.getAllCustomFields());
                const fields = response.body.custom_fields;
                const mappedFields = fields.reduce((acc, field) => {
                    acc[field.name] = field;
                    return acc;
                }, {});
                const payload = {
                    first_name: merged.firstName,
                    last_name: merged.lastName,
                    email: merged.email,
                    country: merged.country,
                    state_province_region: merged.state,
                    unique_name: merged.unique_name,
                    custom_fields: {},
                };
                for (const fieldName of Object.keys(mappedFields)) {
                    if (merged[fieldName]) {
                        payload.custom_fields[mappedFields[fieldName].id] =
                            mappedFields[fieldName].type === 'Date'
                                ? new Date(merged[fieldName])
                                : merged[fieldName];
                    }
                }
                if (Object.keys(payload.custom_fields).length === 0) {
                    delete payload.custom_fields;
                }
                const data = JSON.stringify({
                    contacts: [payload],
                });
                const request = {
                    url: '/v3/marketing/contacts',
                    method: 'PUT',
                    body: data,
                };
                await this.sendgridApiClient.request(request);
            }
        }
        catch (err) {
            this.logger.error('send: Mailing service addContact error');
            this.logger.error(err);
            this.logger.error((_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.errors);
        }
    }
    async removeContact(contact) {
        var _a, _b, _c, _d;
        try {
            if (this.sendgridApiClient &&
                config_1.default.MAILING.SENDGRID.CONTACT_MANAGEMENT_ACTIVE) {
                const data = JSON.stringify({
                    emails: [contact.email],
                });
                const request = {
                    url: '/v3/marketing/contacts/search/emails',
                    method: 'POST',
                    body: data,
                };
                const [response, result] = await this.sendgridApiClient.request(request);
                if (result === null || result === void 0 ? void 0 : result.result[contact.email.toLowerCase()]) {
                    const id = (_b = (_a = result === null || result === void 0 ? void 0 : result.result[contact.email.toLowerCase()]) === null || _a === void 0 ? void 0 : _a.contact) === null || _b === void 0 ? void 0 : _b.id;
                    const queryParams = {
                        ids: id,
                    };
                    const deleteRequest = {
                        url: `/v3/marketing/contacts`,
                        method: 'DELETE',
                        qs: queryParams,
                    };
                    await this.sendgridApiClient.request(deleteRequest);
                }
            }
        }
        catch (err) {
            this.logger.error('send: Mailing service removeContact error');
            this.logger.error(err);
            this.logger.error((_d = (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.body) === null || _d === void 0 ? void 0 : _d.errors);
        }
    }
    async send(mailData) {
        var _a, _b;
        try {
            const { to, subject, html } = mailData;
            if (this.etherealActive &&
                this.etherealClient &&
                /@ethereal.com\s*$/.test(to)) {
                await this.etherealClient.sendMail({
                    from: this.options.sendGrid.from.email,
                    to,
                    subject,
                    html,
                });
            }
            else {
                const sendGridData = R.omit(['html'], mailData);
                await this.sendgridClient.send(Object.assign({ from: this.options.sendGrid.from }, sendGridData));
            }
        }
        catch (error) {
            this.logger.error('send: Mailing service error');
            console.error(error);
            console.error((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.errors);
        }
    }
};
MailingService = MailingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mailing_constants_1.MAILING_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MailingService);
exports.MailingService = MailingService;
//# sourceMappingURL=mailing.service.js.map