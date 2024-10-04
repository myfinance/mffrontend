export class EndOfDayPrice { 

    value: number;
    currencyKey: string;

    constructor(currencyKey: string, value: number) {
        this.currencyKey = currencyKey;
        this.value = value;
    }
    toJSON() {
        return {
            currencyKey: this.currencyKey,
            value: this.value
        }
    }   
}