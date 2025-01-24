

export class Trade { 
    depotBusinessKey: string;
    securityBusinessKey: string;
    amount: number;

    constructor(depotBusinessKey: string, securityBusinessKey: string, amount: number) {
        this.depotBusinessKey = depotBusinessKey;
        this.securityBusinessKey = securityBusinessKey;
        this.amount = amount;
    }
    toJSON() {
        return {
            depotBusinessKey: this.depotBusinessKey,
            securityBusinessKey: this.securityBusinessKey,
            amount: this.amount
        }
    }   
}