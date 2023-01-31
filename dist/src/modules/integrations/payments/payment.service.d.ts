import { User as UserType } from 'interfaces/user.interface';
import { TransactionManager } from 'modules/ancillary/transaction-manager/transaction-manager.service';
import { BalanceService } from 'modules/balance/balance.service';
import { Stripe } from 'stripe';
import { PaymentRepository } from './payments.repository';
import { FirestoreService } from '../firebase/firestore/firestore.service';
export declare class PaymentService {
    private transactionManager;
    private balanceService;
    private paymentRepository;
    private stripe;
    private firestoreService;
    constructor(transactionManager: TransactionManager, balanceService: BalanceService, paymentRepository: PaymentRepository, stripe: Stripe, firestoreService: FirestoreService);
    private logger;
    private defaultCurrency;
    initPayment(user: Partial<UserType>, amount: number, paymentId: string, options?: {
        detail1_text?: string;
        detail1_description?: string;
        currency?: string;
    }): Promise<string>;
    private statusUpdater;
    private statusCreator;
    private addFinancialTransaction;
    private premiumStatusSetter;
    private getMonthQuantityForTransactionName;
    private getTokenTransactionNameForPurchaseCardPayment;
    private updateBalance;
    private transactionNameGetters;
    private updateFireStoreBalance;
    private getFinancialTrancsactionName;
    private readonly proceses;
    processPaymentInfo(paymentStatus: string, paymentId: string): Promise<void>;
}
