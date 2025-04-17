import { InstrumentTypeEnum, LiquidityTypeEnum } from "./instrument";

export class InstrumentDetails { 

    liquiditytype: LiquidityTypeEnum;
    businesskey: string;
    description: string;
    value: number;
    referenceValue: number;
    instrumentType: InstrumentTypeEnum;
    active: boolean;


    constructor(businesskey: string, description: string, value: number, 
        referenceValue: number, liquiditytype: LiquidityTypeEnum, active: boolean, instrumentType: InstrumentTypeEnum) {
        this.businesskey = businesskey;
        this.description = description;
        this.value = value;
        this.referenceValue = referenceValue;
        this.liquiditytype = liquiditytype;
        this.active = active;
        this.instrumentType = instrumentType;
    }
    toJSON() {
        return {
            businesskey: this.businesskey,
            description: this.description,
            value: this.value,
            referenceValue: this.referenceValue,
            liquiditytype: this.liquiditytype,
            active: this.active,
            instrumentType: this.instrumentType
        }
    }   
}