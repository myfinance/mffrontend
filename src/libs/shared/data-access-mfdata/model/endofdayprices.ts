import { JsonConvertHelper } from "../jsonconverthelper";
import { EndOfDayPrice } from "./endofdayprice";

export class EndOfDayPrices { 

    instrumentBusinesskey: string;
    prices: Map<Date, EndOfDayPrice>;



    constructor(instrumentBusinesskey: string, prices: Map<Date, EndOfDayPrice>) {
        this.instrumentBusinesskey = instrumentBusinesskey;
        this.prices = prices;
    }
    toJSON() {
        return {
            instrumentBusinesskey: this.instrumentBusinesskey,
            prices: Object.fromEntries(Array.from(this.prices.entries()).map(([date, price]) => [JsonConvertHelper.dateToIsoString(date), price]))
        }
    }   
}