import { Cashflow } from "./cashflow";
import { InstrumentTypeEnum } from "./instrument";

export class InstrumentFullDetails { 


    businesskey: string;
    description: string;
    instrumentType: InstrumentTypeEnum;
    additionalValues: Map<string, number>
    valueCurve: Map<Date, number>;
    incomeInPeriod: Cashflow[];
    expensesInPeriod: Cashflow[];



    constructor(businesskey: string, description: string, instrumentType: InstrumentTypeEnum, 
        expensesInPeriod:Cashflow[],incomeInPeriod:Cashflow[], additionalValues: Map<string, number>) {
        this.businesskey = businesskey;
        this.description = description;
        this.instrumentType = instrumentType;
        this.expensesInPeriod = expensesInPeriod;
        this.incomeInPeriod = incomeInPeriod;
        this.additionalValues = new Map<string, number>();
        this.valueCurve = new Map<Date, number>();
        this.additionalValues = new Map(Object.entries(additionalValues));
    }
    toJSON() {
        return {
            businesskey: this.businesskey,
            description: this.description,
            instrumentType: this.instrumentType,
            additionalValues: Object.fromEntries(this.additionalValues),
            valueCurve: Object.fromEntries(this.valueCurve),
            expensesInPeriod: this.expensesInPeriod,
            incomeInPeriod: this.incomeInPeriod
        }
    }   
}