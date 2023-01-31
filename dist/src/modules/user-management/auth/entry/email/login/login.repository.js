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
exports.LoginRepository = void 0;
const knex_1 = require("../../../../../integrations/knex");
const promisify_1 = require("../../../../../../helpers/common/promisify");
let LoginRepository = class LoginRepository {
    constructor(knex) {
        this.knex = knex;
    }
    updateFirstLoginField(userId) {
        return this.knex('users')
            .where({ id: userId })
            .update({ firstLoginPassed: true });
    }
    async incrementLoginAttempts(userId) {
        const trx = await (0, promisify_1.default)(this.knex.transaction.bind(this.knex));
        const createOrUpdate = (data) => {
            if (data) {
                return trx('login_attempts')
                    .update({
                    attempts: data.attempts + 1,
                })
                    .where({ userId })
                    .returning(['attempts']);
            }
            return trx('login_attempts')
                .insert({ userId, attempts: 1 })
                .returning(['attempts']);
        };
        try {
            const currentData = await trx('login_attempts')
                .first()
                .where({ userId });
            const [{ attempts }] = await createOrUpdate(currentData);
            await trx.commit();
            return attempts;
        }
        catch (error) {
            await trx.rollback(error);
            throw new Error();
        }
    }
    currentLoginAttempts(userId) {
        return this.knex('login_attempts').first().where({ userId });
    }
    setLoginAttempts(userId, attempts) {
        return this.knex('login_attempts').update({ attempts }).where({ userId });
    }
};
LoginRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], LoginRepository);
exports.LoginRepository = LoginRepository;
//# sourceMappingURL=login.repository.js.map