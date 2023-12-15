import { Trade } from "./trade";

export interface Transaction { 
    transactionType: TransactionTypeEnum;
    description: string;
    transactiondate: Date;
    cashflows: Map<string, number>;
    // map of instrumentBusinesskey and value
    trades: Trade[];
}
export type TransactionTypeEnum = 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'BUDGETTRANSFER' | 'LINKEDINCOMEEXPENSES' | 'TRADE' | 'UNKNOWN';
