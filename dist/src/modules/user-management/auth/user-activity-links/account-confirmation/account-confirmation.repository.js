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
exports.AccountConfirmationRepository = void 0;
const config_1 = require("../../../../../config");
const knex_1 = require("../../../../integrations/knex");
const linkType_enum_1 = require("../linkType.enum");
const userVerificationTokenData_types_1 = require("../../entry/email/signup/types/userVerificationTokenData.types");
const { LINK_VALIDITY_MINUTES, BLOCKING_EMAILS_MINUTES } = config_1.default.EXPIRATIONS.CONFIRMATION_EMAIL;
let AccountConfirmationRepository = class AccountConfirmationRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async setOrUpdateEmailVerificationToken(token, email, ip) {
        await this.knex
            .insert({
            email,
            token,
            deviceIdentifier: ip,
            expiredAt: this.knex.raw(`now() + ?::INTERVAL`, [
                `${LINK_VALIDITY_MINUTES} minutes`,
            ]),
            type: linkType_enum_1.linkType.CONFIRMATION_EMAIL,
        })
            .onConflict(['email', 'deviceIdentifier', 'type'])
            .merge(['id', 'token', 'createdAt', 'expiredAt'])
            .into('user_activity_links');
    }
    async minutesBlocked(email, ip) {
        const [result] = await this.knex
            .select({
            minutes: this.knex.raw(`? - TRUNC(EXTRACT(EPOCH FROM (now() - "createdAt")/60))`, [BLOCKING_EMAILS_MINUTES]),
        })
            .from('user_activity_links')
            .where({
            type: linkType_enum_1.linkType.CONFIRMATION_EMAIL,
            email,
            deviceIdentifier: ip,
        })
            .andWhere('createdAt', '>', this.knex.raw(`now() - ?::INTERVAL`, [
            `${BLOCKING_EMAILS_MINUTES} minutes`,
        ]));
        return (result === null || result === void 0 ? void 0 : result.minutes) || 0;
    }
    async getVerifyAccountEmailTokenData(token) {
        return this.knex
            .first()
            .from('user_activity_links')
            .innerJoin('users', 'user_activity_links.email', 'users.email')
            .where({ token, type: linkType_enum_1.linkType.CONFIRMATION_EMAIL })
            .andWhereRaw('"expiredAt" > now()');
    }
    async getLastValidTokenByEmail(email) {
        return this.knex
            .first()
            .from('user_activity_links')
            .where({ email, type: linkType_enum_1.linkType.CONFIRMATION_EMAIL })
            .andWhereRaw('"expiredAt" > now()')
            .orderBy('createdAt', 'desc');
    }
    async deleteUserConfirmationEmailTokens(email) {
        return this.knex('user_activity_links')
            .where({ email, type: linkType_enum_1.linkType.CONFIRMATION_EMAIL })
            .del();
    }
};
AccountConfirmationRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], AccountConfirmationRepository);
exports.AccountConfirmationRepository = AccountConfirmationRepository;
//# sourceMappingURL=account-confirmation.repository.js.map