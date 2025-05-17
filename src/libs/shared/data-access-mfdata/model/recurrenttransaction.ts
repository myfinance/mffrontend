import { JsonConvertHelper } from "../jsonconverthelper";
import { TransactionTypeEnum } from "./transaction";

export class RecurrentTransaction { 
    transactionType: TransactionTypeEnum;
    accKey: string;
    budgetKey: string;
    trgAccKey: string;
    trgBudgetKey: string;
    insuranceKey: string;
    description: string;
    nextTransactionDate: Date;
    recurrentFrequency: RecurrentFrequencyEnum;
    value: number;
    recurrentTransactionId: string | undefined;

    constructor(transactionType: TransactionTypeEnum, description: string, nextTransactionDate: Date, value: number, accKey: string, budgetKey: string, trgAccKey: string, trgBudgetKey: string, insuranceKey: string, recurrentFrequency: RecurrentFrequencyEnum) {
        this.transactionType = transactionType;
        this.description = description;
        this.value = value;
        this.nextTransactionDate = nextTransactionDate;
        this.accKey = accKey;
        this.budgetKey = budgetKey;
        this.trgAccKey = trgAccKey;
        this.trgBudgetKey = trgBudgetKey;
        this.insuranceKey = insuranceKey;
        this.recurrentFrequency = recurrentFrequency; 

    }
    toJSON() {
        return {
            recurrentTransactionId: this.recurrentTransactionId,
            transactionType: this.transactionType,
            description: this.description,
            value: this.value,
            accKey: this.accKey,
            budgetKey: this.budgetKey,
            trgAccKey: this.trgAccKey,
            trgBudgetKey: this.trgBudgetKey,
            insuranceKey: this.insuranceKey,
            nextTransactionDate: JsonConvertHelper.dateToIsoString(this.nextTransactionDate),
            recurrentFrequency: this.recurrentFrequency
        }
    }   
}
export type RecurrentFrequencyEnum = 'MONTHLY' | 'QUATERLY' | 'YEARLY' | 'UNKNOWN';
export const RecurrentFrequencyEnum = {
    MONTHLY: 'MONTHLY' as RecurrentFrequencyEnum,
    QUATERLY: 'QUATERLY' as RecurrentFrequencyEnum,
    YEARLY: 'YEARLY' as RecurrentFrequencyEnum,
    UNKNOWN: 'UNKNOWN' as RecurrentFrequencyEnum
};
