import { JsonConvertHelper } from "../jsonconverthelper";
import { Trade } from "./trade";

export class Transaction { 
    transactionType: TransactionTypeEnum;
    description: string;
    transactiondate: Date;
    cashflows: Map<string, number>;
    tradeInfo: Trade;
    transactionId: string | undefined;
    accId: string;
    securityId: string;

    constructor(transactionType: TransactionTypeEnum, description: string, transactiondate: Date, cashflows: Map<string, number>, tradeInfo: Trade, accId: string, securityId: string) {
        this.transactionType = transactionType;
        this.description = description;
        this.transactiondate = transactiondate;
        this.cashflows = cashflows;
        this.tradeInfo = tradeInfo;
        this.accId = accId;
        this.securityId = securityId;
    }
    toJSON() {
        return {
            transactionId: this.transactionId,
            transactionType: this.transactionType,
            description: this.description,
            transactiondate: JsonConvertHelper.dateToIsoString(this.transactiondate),
            cashflows: Object.fromEntries(this.cashflows),
            tradeInfo: this.tradeInfo,
            accId: this.accId,
            securityId: this.securityId
        }
    }   
}
export type TransactionTypeEnum = 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'BUDGETTRANSFER' | 'DEPOTCASHFLOW' | 'INTERESTS' | 'BUY' | 'SELL' | 'UNKNOWN';
export const TransactionTypeEnum = {
    INCOME: 'INCOME' as TransactionTypeEnum,
    EXPENSE: 'EXPENSE' as TransactionTypeEnum,
    TRANSFER: 'TRANSFER' as TransactionTypeEnum,
    BUDGETTRANSFER: 'BUDGETTRANSFER' as TransactionTypeEnum,
    DEPOTCASHFLOW: 'DEPOTCASHFLOW' as TransactionTypeEnum,
    INTERESTS: 'INTERESTS' as TransactionTypeEnum,
    BUY: 'BUY' as TransactionTypeEnum,
    SELL: 'SELL' as TransactionTypeEnum,
    UNKNOWN: 'UNKNOWN' as TransactionTypeEnum
};
