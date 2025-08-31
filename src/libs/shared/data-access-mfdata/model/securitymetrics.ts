import { JsonConvertHelper } from "../jsonconverthelper";
import { InstrumentTypeEnum } from "./instrument";

export class SecurityMetrics {
    businesskey: string;
    description: string;
    currencyCode: string;
    currencyKey: string;
    fiscalEndDate: Date;
    securityLifecyclePhase: string;
    riskProfile: string;
    sector: string;
    lastUpdateTs: Date;
    priceLastUpdateTs: Date;
    instrumentType: InstrumentTypeEnum;

    // all values are yearly TTM values
    //mandatory
    price: number;
    priceInEuro: number;
    sharesOutstanding: number;
    revenue: number;
    capitalExpenditures: number;
    operatingCashflow: number;
    netIncome: number;

    //optional
    totalAssets: number;
    totalLiabilities: number;
    dilutedEPS5Y: number;
    dividendPerShare: number;
    forwardFreeCashflow5YCAGR: number;
    forwardPriceToSales: number;
    beta: number;
    tam: number;
    forwardPE: number;
    minForwardFCF10YCAGR: number;
    avgForwardFCF10YCAGR: number;
    maxForwardFCF10YCAGR: number;

    //calculated
    freeCashflow: number;
    pe: number;
    roa: number;
    debtToAssets: number;
    dividendYield: number;
    dividendPayoutRatio: number;
    intrinsicValue: number;
    intrinsicValueMargin: number;
    lynchScore: number;
    avgHistoricalFCFGrowthRate: number;
    revenueGrowthRate: number;
    eps: number;

    //config
    avgMarktcapFreeCashflowRatio: number;
    expectedCashflowGrowth: number;

    //historical map<fiscalaenddate, value>. fiscalaenddate is a Date, the values are TTM(trailing twelve month) values
    historicalRevenue: Map<Date, number>;
    historicalNetIncome: Map<Date, number>;
    historicalFreeCashflow: Map<Date, number>;

    //ranks
    rankByPE: number;
    rankByRoA: number;
    rankByRoAAndPE: number;
    rankByIntrinsicValueMargin: number;
    rankByLynchScore: number;
    rankByLynchAndIntrinsicValueMargin: number;

    constructor(
        businesskey: string,
        description: string,
        currencyCode: string,
        currencyKey: string,
        fiscalEndDate: Date,
        securityLifecyclePhase: string,
        riskProfile: string,
        sector: string,
        lastUpdateTs: Date,
        priceLastUpdateTs: Date,
        price: number,
        priceInEuro: number,
        sharesOutstanding: number,
        revenue: number,
        capitalExpenditures: number,
        operatingCashflow: number,
        netIncome: number,
        totalAssets: number,
        totalLiabilities: number,
        dilutedEPS5Y: number,
        dividendPerShare: number,
        forwardFreeCashflow5YCAGR: number,
        forwardPriceToSales: number,
        beta: number,
        tam: number,
        forwardPE: number,
        minForwardFCF10YCAGR: number,
        avgForwardFCF10YCAGR: number,
        maxForwardFCF10YCAGR: number,
        freeCashflow: number,
        pe: number,
        roa: number,
        debtToAssets: number,
        dividendYield: number,
        dividendPayoutRatio: number,
        intrinsicValue: number,
        intrinsicValueMargin: number,
        lynchScore: number,
        avgHistoricalFCFGrowthRate: number,
        revenueGrowthRate: number,
        eps: number,
        avgMarktcapFreeCashflowRatio: number,
        expectedCashflowGrowth: number,
        historicalRevenue: Map<Date, number>,
        historicalNetIncome: Map<Date, number>,
        historicalFreeCashflow: Map<Date, number>,
        rankByPE: number,
        rankByRoA: number,
        rankByRoAAndPE: number,
        rankByIntrinsicValueMargin: number,
        rankByLynchScore: number,
        rankByLynchAndIntrinsicValueMargin: number, 
        instrumentType: InstrumentTypeEnum
    ) {
        this.businesskey = businesskey;
        this.description = description;
        this.currencyCode = currencyCode;
        this.currencyKey = currencyKey;
        this.fiscalEndDate = fiscalEndDate;
        this.securityLifecyclePhase = securityLifecyclePhase;
        this.riskProfile = riskProfile;
        this.sector = sector;
        this.lastUpdateTs = lastUpdateTs;
        this.priceLastUpdateTs = priceLastUpdateTs;
        this.price = price;
        this.priceInEuro = priceInEuro;
        this.sharesOutstanding = sharesOutstanding;
        this.revenue = revenue;
        this.capitalExpenditures = capitalExpenditures;
        this.operatingCashflow = operatingCashflow;
        this.netIncome = netIncome;
        this.totalAssets = totalAssets;
        this.totalLiabilities = totalLiabilities;
        this.dilutedEPS5Y = dilutedEPS5Y;
        this.dividendPerShare = dividendPerShare;
        this.forwardFreeCashflow5YCAGR = forwardFreeCashflow5YCAGR;
        this.forwardPriceToSales = forwardPriceToSales;
        this.beta = beta;
        this.tam = tam;
        this.forwardPE = forwardPE;
        this.minForwardFCF10YCAGR = minForwardFCF10YCAGR;
        this.avgForwardFCF10YCAGR = avgForwardFCF10YCAGR;
        this.maxForwardFCF10YCAGR = maxForwardFCF10YCAGR;
        this.freeCashflow = freeCashflow;
        this.pe = pe;
        this.roa = roa;
        this.debtToAssets = debtToAssets;
        this.dividendYield = dividendYield;
        this.dividendPayoutRatio = dividendPayoutRatio;
        this.intrinsicValue = intrinsicValue;
        this.intrinsicValueMargin = intrinsicValueMargin;
        this.lynchScore = lynchScore;
        this.avgHistoricalFCFGrowthRate = avgHistoricalFCFGrowthRate;
        this.revenueGrowthRate = revenueGrowthRate;
        this.eps = eps;
        this.avgMarktcapFreeCashflowRatio = avgMarktcapFreeCashflowRatio;
        this.expectedCashflowGrowth = expectedCashflowGrowth;
        this.historicalRevenue = historicalRevenue;
        this.historicalNetIncome = historicalNetIncome;
        this.historicalFreeCashflow = historicalFreeCashflow;
        this.rankByPE = rankByPE;
        this.rankByRoA = rankByRoA;
        this.rankByRoAAndPE = rankByRoAAndPE;
        this.rankByIntrinsicValueMargin = rankByIntrinsicValueMargin;
        this.rankByLynchScore = rankByLynchScore;
        this.rankByLynchAndIntrinsicValueMargin = rankByLynchAndIntrinsicValueMargin;
        this.instrumentType = instrumentType;
    }

    toJSON() {
        return {
            businesskey: this.businesskey,
            description: this.description,
            currencyCode: this.currencyCode,
            currencyKey: this.currencyKey,
            fiscalEndDate: JsonConvertHelper.dateToIsoString(this.fiscalEndDate),
            securityLifecyclePhase: this.securityLifecyclePhase,
            riskProfile: this.riskProfile,
            sector: this.sector,
            lastUpdateTs: JsonConvertHelper.dateTimeToIsoString(this.lastUpdateTs),
            priceLastUpdateTs: JsonConvertHelper.dateTimeToIsoString(this.priceLastUpdateTs),
            price: this.price,
            priceInEuro: this.priceInEuro,
            sharesOutstanding: this.sharesOutstanding,
            revenue: this.revenue,
            capitalExpenditures: this.capitalExpenditures,
            operatingCashflow: this.operatingCashflow,
            netIncome: this.netIncome,
            totalAssets: this.totalAssets,
            totalLiabilities: this.totalLiabilities,
            dilutedEPS5Y: this.dilutedEPS5Y,
            dividendPerShare: this.dividendPerShare,
            forwardFreeCashflow5YCAGR: this.forwardFreeCashflow5YCAGR,
            forwardPriceToSales: this.forwardPriceToSales,
            beta: this.beta,
            tam: this.tam,
            forwardPE: this.forwardPE,
            minForwardFCF10YCAGR: this.minForwardFCF10YCAGR,
            avgForwardFCF10YCAGR: this.avgForwardFCF10YCAGR,
            maxForwardFCF10YCAGR: this.maxForwardFCF10YCAGR,
            freeCashflow: this.freeCashflow,
            pe: this.pe,
            roa: this.roa,
            debtToAssets: this.debtToAssets,
            dividendYield: this.dividendYield === Infinity ? null : this.dividendYield,
            dividendPayoutRatio: this.dividendPayoutRatio,
            intrinsicValue: this.intrinsicValue,
            intrinsicValueMargin: this.intrinsicValueMargin,
            lynchScore: this.lynchScore,
            avgHistoricalFCFGrowthRate: this.avgHistoricalFCFGrowthRate,
            revenueGrowthRate: this.revenueGrowthRate,
            eps: this.eps,
            avgMarktcapFreeCashflowRatio: this.avgMarktcapFreeCashflowRatio,
            expectedCashflowGrowth: this.expectedCashflowGrowth,
            historicalRevenue: this.historicalRevenue,
            historicalNetIncome: this.historicalNetIncome,
            historicalFreeCashflow: this.historicalFreeCashflow,
            rankByPE: this.rankByPE,
            rankByRoA: this.rankByRoA,
            rankByRoAAndPE: this.rankByRoAAndPE,
            rankByIntrinsicValueMargin: this.rankByIntrinsicValueMargin,
            rankByLynchScore: this.rankByLynchScore,
            rankByLynchAndIntrinsicValueMargin: this.rankByLynchAndIntrinsicValueMargin,
            instrumentType: this.instrumentType
        }
    }

    static fromJson(data: any): SecurityMetrics {
        return new SecurityMetrics(
            data.businesskey,
            data.description,
            data.currencyCode,
            data.currencyKey,
            new Date(data.fiscalEndDate),
            data.securityLifecyclePhase,
            data.riskProfile,
            data.sector,
            new Date(data.lastUpdateTs),
            new Date(data.priceLastUpdateTs),
            data.price,
            data.priceInEuro,
            data.sharesOutstanding,
            data.revenue,
            data.capitalExpenditures,
            data.operatingCashflow,
            data.netIncome,
            data.totalAssets,
            data.totalLiabilities,
            data.dilutedEPS5Y,
            data.dividendPerShare,
            data.forwardFreeCashflow5YCAGR,
            data.forwardPriceToSales,
            data.beta,
            data.tam,
            data.forwardPE,
            data.minForwardFCF10YCAGR,
            data.avgForwardFCF10YCAGR,
            data.maxForwardFCF10YCAGR,
            data.freeCashflow,
            data.pe,
            data.roa,
            data.debtToAssets,
            data.dividendYield,
            data.dividendPayoutRatio,
            data.intrinsicValue,
            data.intrinsicValueMargin,
            data.lynchScore,
            data.avgHistoricalFCFGrowthRate,
            data.revenueGrowthRate,
            data.eps,
            data.avgMarktcapFreeCashflowRatio,
            data.expectedCashflowGrowth,
            data.historicalRevenue,
            data.historicalNetIncome,
            data.historicalFreeCashflow,
            data.rankByPE,
            data.rankByRoA,
            data.rankByRoAAndPE,
            data.rankByIntrinsicValueMargin,
            data.rankByLynchScore,
            data.rankByLynchAndIntrinsicValueMargin,
            data.instrumentType
        );
    }
}

export type MarketDataImportTypeEnum = 'TIME_SERIES_WEEKLY' | 'PREV_CLOSE' | 'SECURITYMETRICS';
export const MarketDataImportTypeEnum = {
    TIME_SERIES_WEEKLY: 'TIME_SERIES_WEEKLY' as MarketDataImportTypeEnum,
    PREV_CLOSE: 'PREV_CLOSE' as MarketDataImportTypeEnum,
    SECURITYMETRICS: 'SECURITYMETRICS' as MarketDataImportTypeEnum
};
