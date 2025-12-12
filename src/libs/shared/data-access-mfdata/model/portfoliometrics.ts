export class PortfolioMetrics { 

    portfolio: string;
    totalCagr: number;
    cagrPerYear: Map<number, number>;
    totalYield: number;
    yieldPerYear: Map<number, number>;
    cashflows: number[];
    cashflowsWithStartAndEndValues: Map<number, number[]>;

    constructor(portfolio: string, totalCagr: number, cagrPerYear: Map<number, number>, totalYield: number, yieldPerYear: Map<number, number>,
        cashflows: number[], cashflowsWithStartAndEndValues: Map<number, number[]>) {
        this.portfolio = portfolio;
        this.totalCagr = totalCagr;
        this.cagrPerYear = new Map<number, number>();
        this.totalYield = totalYield;
        this.yieldPerYear = new Map<number, number>();
        this.cashflows = cashflows;
        this.cashflowsWithStartAndEndValues = new Map<number, number[]>();
        
        this.cagrPerYear = new Map(Object.entries(cagrPerYear).map(([k, v]) => [Number(k), v]));
        this.yieldPerYear = new Map(Object.entries(yieldPerYear).map(([k, v]) => [Number(k), v]));
        this.cashflowsWithStartAndEndValues = new Map(Object.entries(cashflowsWithStartAndEndValues).map(([k, v]) => [Number(k), v]));
    }
    toJSON() {
        return {
            portfolio: this.portfolio,
            totalCagr: this.totalCagr,
            cagrPerYear: Object.fromEntries(this.cagrPerYear),
            totalYield: this.totalYield,
            yieldPerYear: Object.fromEntries(this.yieldPerYear),
            cashflows: this.cashflows,
            cashflowsWithStartAndEndValues: Object.fromEntries(this.cashflowsWithStartAndEndValues)
        }
    }   
}
