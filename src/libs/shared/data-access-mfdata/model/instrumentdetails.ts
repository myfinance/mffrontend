import { LiquidityTypeEnum } from "./instrument";

export class InstrumentDetails { 

    liquiditytype: LiquidityTypeEnum;
    businesskey: string;
    description: string;
    value: number;
    referenceValue: number;


    constructor(businesskey: string, description: string, value: number, 
        referenceValue: number, liquiditytype: LiquidityTypeEnum) {
        this.businesskey = businesskey;
        this.description = description;
        this.value = value;
        this.referenceValue = referenceValue;
        this.liquiditytype = liquiditytype;
    }
    toJSON() {
        return {
            businesskey: this.businesskey,
            description: this.description,
            value: this.value,
            referenceValue: this.referenceValue,
            liquiditytype: this.liquiditytype
        }
    }   
}