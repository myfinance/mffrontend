import { EndOfDayPrice } from "./endofdayprice";

export class EndOfDayPrices { 

    instrumentBusinesskey: string;
    prices: Map<Date, EndOfDayPrice>;



    constructor(instrumentBusinesskey: string, prices: Map<Date, EndOfDayPrice>) {
        this.instrumentBusinesskey = instrumentBusinesskey;
        this.prices = new Map(
            Object.entries(prices).map(([key, value]) => [new Date(key), value])
        );
    }
    toJSON() {
        return {
            instrumentBusinesskey: this.instrumentBusinesskey,
            prices: Object.fromEntries(this.prices)
        }
    }   
}