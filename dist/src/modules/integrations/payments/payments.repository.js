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
exports.PaymentRepository = void 0;
const knex_1 = require("../knex");
const common_1 = require("@nestjs/common");
const transaction_manager_service_1 = require("../../ancillary/transaction-manager/transaction-manager.service");
let PaymentRepository = class PaymentRepository {
    constructor(knex) {
        this.knex = knex;
    }
    updateExpiredPayment(paymentId) {
        return this.knex('payments').where({ id: paymentId }).del();
    }
    updateAwaitingPayment(paymentId, paymentStatus) {
        return this.knex('payments')
            .update({ status: paymentStatus, updateAt: new Date() })
            .where({ id: paymentId });
    }
    async updateSucceded(paymentId, paymentStatus, txManager) {
        const conn = txManager.transaction || this.knex;
        const result = await conn('payments')
            .update({ status: paymentStatus, updatedAt: new Date() })
            .where({ id: paymentId })
            .returning(['paymentType', 'meta', 'userId']);
        return result;
    }
    async createPremiumStatus(userId, startTime, endTime, txManager) {
        const conn = txManager.transaction || this.knex;
        await conn('premium_terms')
            .insert({ userId, startTime, endTime })
            .onConflict('id')
            .merge();
    }
    async updatePremiumStatus(userId, startTime, endTime, txManager) {
        const conn = txManager.transaction || this.knex;
        await conn('premium_terms')
            .update({ startTime, endTime })
            .where({ userId });
    }
    async getExistedPremiumTerms(userId, txManager) {
        const conn = txManager.transaction || this.knex;
        const result = await conn('premium_terms').select('*').where({ userId });
        return result;
    }
    async addFinancialTransaction(purchasePrice, txManager, meta, userId) {
        const conn = txManager.transaction || this.knex;
        await conn('financial_transactions').insert({
            amount: purchasePrice + ' $',
            meta,
            userId,
        });
    }
};
PaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, knex_1.InjectKnex)()),
    __metadata("design:paramtypes", [Function])
], PaymentRepository);
exports.PaymentRepository = PaymentRepository;
//# sourceMappingURL=payments.repository.js.map