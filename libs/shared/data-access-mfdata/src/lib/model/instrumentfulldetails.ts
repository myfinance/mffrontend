import { InstrumentTypeEnum } from "./instrument";
import { Transaction } from "./transaction";

export class InstrumentFullDetails { 


    businesskey: string;
    description: string;
    instrumenttype: InstrumentTypeEnum;
    additionalValues: Map<string, number>
    valueCurve: Map<Date, number>;
    expensesLastMonth: Transaction[];
    incomeLastMonth: Transaction[];



    constructor(businesskey: string, description: string, instrumenttype: InstrumentTypeEnum, 
        additionalValues: Map<string, number>, valueCurve: Map<Date, number>,expensesLastMonth:Transaction[],incomeLastMonth:Transaction[]) {
        this.businesskey = businesskey;
        this.description = description;
        this.instrumenttype = instrumenttype;
        this.additionalValues = additionalValues;
        this.valueCurve = valueCurve;
        this.expensesLastMonth = expensesLastMonth;
        this.incomeLastMonth = incomeLastMonth;
    }
    toJSON() {
        return {
            businesskey: this.businesskey,
            description: this.description,
            instrumenttype: this.instrumenttype,
            additionalValues: this.additionalValues,
            valueCurve: this.valueCurve,
            expensesLastMonth: this.expensesLastMonth,
            incomeLastMonth: this.incomeLastMonth
        }
    }   
}