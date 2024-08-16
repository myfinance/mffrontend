import { JsonConvertHelper } from "../jsonconverthelper";
import { TransactionTypeEnum } from "./transaction";

export class RecurrentTransaction { 
    transactionType: TransactionTypeEnum;
    firstInstrumentBusinessKey: string;
    secondInstrumentBusinessKey: string;
    description: string;
    nextTransactionDate: Date;
    recurrentFrequency: RecurrentFrequencyEnum;
    value: number;
    recurrentTransactionId: string | undefined;

    constructor(transactionType: TransactionTypeEnum, description: string, nextTransactionDate: Date, value: number, firstInstrumentBusinessKey: string, secondInstrumentBusinessKey: string, recurrentFrequency: RecurrentFrequencyEnum) {
        this.transactionType = transactionType;
        this.description = description;
        this.value = value;
        this.nextTransactionDate = nextTransactionDate;
        this.firstInstrumentBusinessKey = firstInstrumentBusinessKey;
        this.secondInstrumentBusinessKey = secondInstrumentBusinessKey;
        this.recurrentFrequency = recurrentFrequency; 

    }
    toJSON() {
        return {
            recurrentTransactionId: this.recurrentTransactionId,
            transactionType: this.transactionType,
            description: this.description,
            value: this.value,
            firstInstrumentBusinessKey: this.firstInstrumentBusinessKey,
            secondInstrumentBusinessKey: this.secondInstrumentBusinessKey,
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
