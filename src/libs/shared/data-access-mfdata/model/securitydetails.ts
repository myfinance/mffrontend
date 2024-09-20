import { InstrumentTypeEnum } from "./instrument";

export class SecurityDetails { 

    businesskey: string;
    description: string;
    value: number;
    referenceValue: number;
    instrumentType: InstrumentTypeEnum;


    constructor(businesskey: string, description: string, value: number, 
        referenceValue: number, instrumentType: InstrumentTypeEnum) {
        this.businesskey = businesskey;
        this.description = description;
        this.value = value;
        this.referenceValue = referenceValue;
        this.instrumentType = instrumentType;
    }
    toJSON() {
        return {
            businesskey: this.businesskey,
            description: this.description,
            value: this.value,
            referenceValue: this.referenceValue,
            instrumentType: this.instrumentType
        }
    }   
}