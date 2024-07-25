import { Trade } from "./trade";

export class Transaction { 
    transactionType: TransactionTypeEnum;
    description: string;
    transactiondate: Date;
    cashflows: Map<string, number>;
    // map of instrumentBusinesskey and value
    trades: Trade[];
    transactionId: string | undefined;

    constructor(transactionType: TransactionTypeEnum, description: string, transactiondate: Date, cashflows: Map<string, number>, trades: Trade[]) {
        this.transactionType = transactionType;
        this.description = description;
        this.transactiondate = transactiondate;
        this.cashflows = cashflows;
        this.trades = trades;
    }
    toJSON() {
        return {
            transactionId: this.transactionId,
            transactionType: this.transactionType,
            description: this.description,
            transactiondate: this.transactiondate,
            cashflows: Object.fromEntries(this.cashflows),
            trades: this.trades
        }
    }   
}
export type TransactionTypeEnum = 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'BUDGETTRANSFER' | 'LINKEDINCOMEEXPENSES' | 'TRADE' | 'UNKNOWN';
export const TransactionTypeEnum = {
    INCOME: 'INCOME' as TransactionTypeEnum,
    EXPENSE: 'EXPENSE' as TransactionTypeEnum,
    TRANSFER: 'TRANSFER' as TransactionTypeEnum,
    BUDGETTRANSFER: 'BUDGETTRANSFER' as TransactionTypeEnum,
    LINKEDINCOMEEXPENSES: 'LINKEDINCOMEEXPENSES' as TransactionTypeEnum,
    TRADE: 'TRADE' as TransactionTypeEnum,
    UNKNOWN: 'UNKNOWN' as TransactionTypeEnum
};


