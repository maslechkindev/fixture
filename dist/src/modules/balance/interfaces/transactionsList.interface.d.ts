export default interface TransactionsListInterface {
    txId: string;
    type: string;
    status: number;
    createdAt: Date;
    amount: string;
    meta: Record<string, string>;
    currency: string;
    createdBy: string | null;
    fullcount: number;
}
