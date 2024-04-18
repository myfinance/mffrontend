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