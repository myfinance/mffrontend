export class PortfolioMetrics { 

    portfolio: string;
    totalCagr: number;
    cagrPerYear: Map<number, number>;
    totalYield: number;
    yieldPerYear: Map<number, number>;
    cashflows: number[];
    cashflowsWithStartAndEndValues: Map<number, number[]>;
    isSingleSecurity: boolean;

    constructor(portfolio: string, totalCagr: number, cagrPerYear: Map<number, number>, totalYield: number, yieldPerYear: Map<number, number>,
        cashflows: number[], cashflowsWithStartAndEndValues: Map<number, number[]>, isSingleSecurity: boolean) {
        this.portfolio = portfolio;
        this.totalCagr = totalCagr;
        this.cagrPerYear = cagrPerYear;
        this.totalYield = totalYield;
        this.yieldPerYear = yieldPerYear;
        this.cashflows = cashflows;
        this.cashflowsWithStartAndEndValues = cashflowsWithStartAndEndValues;
        this.isSingleSecurity = isSingleSecurity;
    }

    toJSON() {
        return {
            portfolio: this.portfolio,
            totalCagr: this.totalCagr,
            cagrPerYear: Object.fromEntries(this.cagrPerYear),
            totalYield: this.totalYield,
            yieldPerYear: Object.fromEntries(this.yieldPerYear),
            cashflows: this.cashflows,
            cashflowsWithStartAndEndValues: Object.fromEntries(this.cashflowsWithStartAndEndValues),
            isSingleSecurity: this.isSingleSecurity
        }
    } 
    
    static fromJson(data: any): PortfolioMetrics {
        let cagrPerYear = new Map<number, number>();
        if (data.cagrPerYear) {
            cagrPerYear = new Map<number, number>(
                Object.entries(data.cagrPerYear).map(([key, value]) => [Number(key), value as number])
            );
        }
        
        let yieldPerYear = new Map<number, number>();
        if(data.yieldPerYear){
            yieldPerYear = new Map<number, number>(
                Object.entries(data.yieldPerYear).map(([key, value]) => [Number(key), value as number])
            );
        }

        let cashflowsWithStartAndEndValues = new Map<number, number[]>();
        if(data.cashflowsWithStartAndEndValues){
            cashflowsWithStartAndEndValues = new Map<number, number[]>(
                Object.entries(data.cashflowsWithStartAndEndValues).map(([key, value]) => [Number(key), value as number[]])
            );
        }

        return new PortfolioMetrics(
            data.portfolio,
            data.totalCagr,
            cagrPerYear,
            data.totalYield,
            yieldPerYear,
            data.cashflows,
            cashflowsWithStartAndEndValues,
            data.isSingleSecurity
        );
    }
}
