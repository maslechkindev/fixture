import { Currency } from 'enums/currency';
import { TRANSACTION_TYPES } from '../balance.repository';
export interface BalanceChangeDetails {
    userId: string;
    amount: number;
    currency: Currency;
    transactionName: string;
    transactionType: TRANSACTION_TYPES;
}
