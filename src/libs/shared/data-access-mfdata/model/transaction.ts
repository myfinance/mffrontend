import { JsonConvertHelper } from "../jsonconverthelper";

export class Transaction { 
    transactionType: TransactionTypeEnum;
    description: string;
    transactiondate: Date;
    transactionId: string | undefined;
    accKey: string;
    budgetKey: string;
    trgBudgetKey: string;
    trgAccKey: string;
    value: number;
    depotBusinessKey: string;
    securityBusinessKey: string;
    amount: number;
    insuranceKey: string;

 

    constructor(transactionId: string, transactionType: TransactionTypeEnum, description: string, transactiondate: Date, accKey: string, budgetKey: string, trgBudgetKey: string, trgAccKey: string, value: number, securityBusinessKey: string, depotBusinessKey: string, amount: number, insuranceKey: string) {
        this.transactionType = transactionType;
        this.transactionId = transactionId;
        this.description = description;
        this.transactiondate = transactiondate;
        this.budgetKey = budgetKey;
        this.accKey = accKey;
        this.trgBudgetKey = trgBudgetKey;
        this.trgAccKey = trgAccKey;
        this.value = value;
        this.securityBusinessKey = securityBusinessKey;
        this.depotBusinessKey = depotBusinessKey;
        this.amount = amount;
        this.insuranceKey = insuranceKey;
    }
    toJSON() {
        return {
            transactionId: this.transactionId,
            transactionType: this.transactionType,
            description: this.description,
            transactiondate: JsonConvertHelper.dateToIsoString(this.transactiondate),
            budgetKey: this.budgetKey,
            accKey: this.accKey,
            trgBudgetKey: this.trgBudgetKey,
            trgAccKey: this.trgAccKey,
            value: this.value,
            securityBusinessKey: this.securityBusinessKey,
            depotBusinessKey: this.depotBusinessKey,
            amount: this.amount,
            insuranceKey: this.insuranceKey,

        }
    }  
    
    static fromJson(data: any): Transaction {
                const transaction = new Transaction(data.transactionId, data.transactionType, data.description, new Date(data.transactiondate), data.accKey, data.budgetKey, data.trgBudgetKey, data.trgAccKey, data.value, data.securityBusinessKey, data.depotBusinessKey, data.amount, data.insuranceKey);
        return transaction;
    }
}



export type TransactionTypeEnum = 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'BUDGETTRANSFER' | 'DEPOTCASHFLOW' | 'INTERESTS' | 'BUY' | 'SELL' | 'LIFEINSURANCEEXPENSE' | 'UNKNOWN';
export const TransactionTypeEnum = {
    INCOME: 'INCOME' as TransactionTypeEnum,
    EXPENSE: 'EXPENSE' as TransactionTypeEnum,
    TRANSFER: 'TRANSFER' as TransactionTypeEnum,
    BUDGETTRANSFER: 'BUDGETTRANSFER' as TransactionTypeEnum,
    DEPOTCASHFLOW: 'DEPOTCASHFLOW' as TransactionTypeEnum,
    INTERESTS: 'INTERESTS' as TransactionTypeEnum,
    BUY: 'BUY' as TransactionTypeEnum,
    SELL: 'SELL' as TransactionTypeEnum,
    LIFEINSURANCEEXPENSE: 'LIFEINSURANCEEXPENSE' as TransactionTypeEnum,
    UNKNOWN: 'UNKNOWN' as TransactionTypeEnum
};
