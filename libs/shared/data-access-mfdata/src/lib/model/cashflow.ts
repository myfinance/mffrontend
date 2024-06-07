export class Cashflow { 

    description: string;
    transactiondate: Date;
    instrumentBusinesskey: string;
    value: number;


    constructor(description: string, transactiondate: Date, instrumentBusinesskey: string, value: number) {
        this.description = description;
        this.transactiondate = transactiondate;
        this.instrumentBusinesskey = instrumentBusinesskey;
        this.value = value;
    }
    toJSON() {
        return {
            description: this.description,
            transactiondate: this.transactiondate,
            instrumentBusinesskey: this.instrumentBusinesskey,
            value: this.value
        }
    }   
}