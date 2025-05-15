import { InstrumentTypeEnum } from "./instrument";

export class Position { 

    depotId: string;
    depotDescription: string;
    securityId: string;
    securityDescription: string;
    securityType: InstrumentTypeEnum;
    amount: number;
    value: number;


    constructor(depotId: string, depotDescription: string, securityId: string, securityDescription: string, securityType: InstrumentTypeEnum, amount: number, value: number) {
        this.depotId = depotId;
        this.depotDescription = depotDescription;
        this.securityId = securityId;
        this.securityDescription = securityDescription;
        this.securityType = securityType;
        this.amount = amount;
        this.value = value;
    }
    toJSON() {
        return {
            depotId: this.depotId,
            depotDescription: this.depotDescription,
            securityId: this.securityId,
            securityDescription: this.securityDescription,
            securityType: this.securityType,
            amount: this.amount,
            value: this.value
        }
    }   
}