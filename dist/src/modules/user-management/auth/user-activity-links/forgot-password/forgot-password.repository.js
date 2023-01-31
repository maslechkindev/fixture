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
exports.ForgotPasswordRepository = void 0;
const knex_1 = require("../../../../integrations/knex");
const linkType_enum_1 = require("../linkType.enum");
const config_1 = require("../../../../../config");
const knexTransaction_interface_1 = require("../../../../../interfaces/db/knexTransaction.interface");
const promisify_1 = require("../../../../../helpers/common/promisify");
const user_interface_1 = require("../../../../../interfaces/user.interface");
const { LINK_VALIDITY_MINUTES, BLOCKING_EMAILS_MINUTES } = config_1.default.EXPIRATIONS.FORGOT_PASSWORD;
let ForgotPasswordRepository = class ForgotPasswordRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async minutesBlocked(email, ip) {
        const [result] = await this.knex
            .select({
            minutes: this.knex.raw(`? - TRUNC(EXTRACT(EPOCH FROM (now() - "createdAt")/60))`, [BLOCKING_EMAILS_MINUTES]),
        })
            .from('user_activity_links')
            .where({
            type: linkType_enum_1.linkType.FORGOT_PASSWORD,
            email,
            deviceIdentifier: ip,
        })
            .andWhere('createdAt', '>', this.knex.raw(`now() - ?::INTERVAL`, [
            `${BLOCKING_EMAILS_MINUTES} minutes`,
        ]));
        return (result === null || result === void 0 ? void 0 : result.minutes) || 0;
    }
    async setOrUpdateToken(token, email, ip) {
        await this.knex
            .insert({
            email,
            token,
            deviceIdentifier: ip,
            expiredAt: this.knex.raw(`now() + ?::INTERVAL`, [
                `${LINK_VALIDITY_MINUTES} minutes`,
            ]),
            type: linkType_enum_1.linkType.FORGOT_PASSWORD,
        })
            .onConflict(['email', 'deviceIdentifier', 'type'])
            .merge(['id', 'token', 'createdAt', 'expiredAt'])
            .into('user_activity_links');
    }
    async getTokenInfo(token) {
        const data = await this.knex
            .first()
            .from('user_activity_links')
            .where({
            token,
            type: linkType_enum_1.linkType.FORGOT_PASSWORD,
        })
            .andWhereRaw('"expiredAt" > now()');
        return data;
    }
    async getPreviousPasswords(userId) {
        const prev = await this.knex
            .select(['passwordHash', 'salt'])
            .from('password_history')
            .where({ userId })
            .orderBy('created_at', 'desc')
            .limit(2);
        return prev.map((e) => ({
            passwordHash: e.passwordHash,
            salt: e.salt,
        }));
    }
    async changeUserPassword(userId, passwordHash, salt) {
        const trx = await (0, promisify_1.default)(this.knex.transaction.bind(this.knex));
        try {
            const [oldData] = await trx('users')
                .select(['passwordHash', 'salt', 'id'])
                .where({ id: userId });
            const [user] = await trx('users')
                .update({ passwordHash, salt })
                .where({ id: userId })
                .returning(['id', 'email']);
            await trx('login_attempts').delete().where({ userId: user.id });
            await trx('user_activity_links')
                .delete()
                .where({ email: user.email, type: linkType_enum_1.linkType.FORGOT_PASSWORD });
            if (oldData.passwordHash && oldData.salt) {
                await trx('password_history').insert({
                    userId: user.id,
                    passwordHash: oldData.passwordHash,
                    salt: oldData.salt,
                });
            }
            await trx.commit();
            return { id: user.id };
        }
        catch (error) {
            await trx.rollback();
            throw new Error(error);
        }
    }
};
ForgotPasswordRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], ForgotPasswordRepository);
exports.ForgotPasswordRepository = ForgotPasswordRepository;
//# sourceMappingURL=forgot-password.repository.js.map