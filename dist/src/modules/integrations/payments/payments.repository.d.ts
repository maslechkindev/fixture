import { Knex } from 'modules/integrations/knex';
import { TransactionManagerService } from 'modules/ancillary/transaction-manager/transaction-manager.service';
export declare class PaymentRepository {
    private readonly knex;
    constructor(knex: Knex);
    updateExpiredPayment(paymentId: string): import("knex").Knex.QueryBuilder<any, number>;
    updateAwaitingPayment(paymentId: string, paymentStatus: string): import("knex").Knex.QueryBuilder<any, number>;
    updateSucceded(paymentId: string, paymentStatus: string, txManager: TransactionManagerService): Promise<any[]>;
    createPremiumStatus(userId: string, startTime: Date, endTime: Date, txManager: TransactionManagerService): Promise<void>;
    updatePremiumStatus(userId: string, startTime: Date, endTime: Date, txManager: TransactionManagerService): Promise<void>;
    getExistedPremiumTerms(userId: string, txManager: TransactionManagerService): Promise<any[]>;
    addFinancialTransaction(purchasePrice: number, txManager: TransactionManagerService, meta: string, userId: string): Promise<void>;
}
