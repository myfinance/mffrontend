export class ValueCurve { 

    valueCurve: Map<Date, number>;
    serviceAddress: string;
    instrumentBusinesskey: string;
    parentBusinesskey: string;


    constructor(valueCurve: Map<Date, number>, serviceAddress: string, instrumentBusinesskey: string, 
        parentBusinesskey: string) {
        this.valueCurve = valueCurve;
        this.serviceAddress = serviceAddress;
        this.instrumentBusinesskey = instrumentBusinesskey;
        this.parentBusinesskey = parentBusinesskey;
    }
    toJSON() {
        return {
            serviceAddress: this.serviceAddress,
            instrumentBusinesskey: this.instrumentBusinesskey,
            parentBusinesskey: this.parentBusinesskey,
            valueCurve: Object.fromEntries(this.valueCurve)
        }
    }   
}

export type ValuationTypeEnum = 'MARKETVALUE' | 'PRUDENT' | 'STATIC';
export const ValuationTypeEnum = {
    MARKETVALUE: 'MARKETVALUE' as ValuationTypeEnum,
    PRUDENT: 'PRUDENT' as ValuationTypeEnum,
    STATIC: 'STATIC' as ValuationTypeEnum
};