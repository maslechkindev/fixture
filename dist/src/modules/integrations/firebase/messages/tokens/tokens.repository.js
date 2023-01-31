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
exports.TokensRepository = void 0;
const knex_1 = require("../../../knex");
let TokensRepository = class TokensRepository {
    constructor(knex) {
        this.knex = knex;
    }
    add(userId, token) {
        return this.knex('notification_identifiers').insert({
            userId,
            token,
        });
    }
    async update(userId, newToken, oldToken) {
        await this.knex('notification_identifiers')
            .update({
            token: newToken,
        })
            .where({
            userId,
            token: oldToken,
        });
    }
    remove(userId, token) {
        return this.knex('notification_identifiers')
            .where({
            userId,
            token,
        })
            .del();
    }
    async getUserTokens(userId, tokensToOmit = []) {
        const userTokens = await this.knex('notification_identifiers')
            .select('token')
            .where({ userId })
            .whereNotIn('token', tokensToOmit);
        return userTokens.map(({ token }) => token);
    }
};
TokensRepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], TokensRepository);
exports.TokensRepository = TokensRepository;
//# sourceMappingURL=tokens.repository.js.map