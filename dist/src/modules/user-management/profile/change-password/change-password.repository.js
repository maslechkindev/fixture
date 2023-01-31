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
exports.ChangePasswordRepository = void 0;
const knex_1 = require("../../../integrations/knex");
const knexTransaction_interface_1 = require("../../../../interfaces/db/knexTransaction.interface");
const promisify_1 = require("../../../../helpers/common/promisify");
const user_interface_1 = require("../../../../interfaces/user.interface");
let ChangePasswordRepository = class ChangePasswordRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async getUserById(id) {
        const data = await this.knex.first().from('users').where({ id });
        return data;
    }
    async getPreviousPasswords(userId) {
        const data = await this.knex
            .select(['passwordHash', 'salt'])
            .from('password_history')
            .where({ userId })
            .orderBy('created_at', 'desc')
            .limit(2);
        return data;
    }
    async changePassword(userId, passwordHash, salt) {
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
ChangePasswordRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], ChangePasswordRepository);
exports.ChangePasswordRepository = ChangePasswordRepository;
//# sourceMappingURL=change-password.repository.js.map