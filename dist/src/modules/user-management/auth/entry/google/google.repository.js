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
exports.GoogleSSORepository = void 0;
const knex_1 = require("../../../../integrations/knex");
const userStatus_1 = require("../../../../../enums/userStatus");
const generateUsername_1 = require("../../../../../helpers/user/generateUsername");
const transaction_manager_service_1 = require("../../../../ancillary/transaction-manager/transaction-manager.service");
let GoogleSSORepository = class GoogleSSORepository {
    constructor(knex) {
        this.knex = knex;
    }
    getAccountById(id) {
        return this.knex.first().from('google_accounts').where({ id });
    }
    async saveUserAndCreateAccount(transactionManager, userData, googleAccountData) {
        if (userData.status === userStatus_1.userStatus.CONFIRMED) {
            const username = await (0, generateUsername_1.default)(this.knex);
            userData.username = username;
        }
        const conn = transactionManager.transaction || this.knex;
        const insertData = userData.status === userStatus_1.userStatus.CONFIRMED
            ? Object.assign(Object.assign({}, userData), { confirmedAt: this.knex.raw('now()') }) : userData;
        const [user] = await conn('users').insert(insertData).returning(['*']);
        await conn('google_accounts').insert({
            id: googleAccountData.id,
            userId: user.id,
        });
        return Object.assign({ userId: user.id }, user);
    }
};
GoogleSSORepository = __decorate([
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], GoogleSSORepository);
exports.GoogleSSORepository = GoogleSSORepository;
//# sourceMappingURL=google.repository.js.map