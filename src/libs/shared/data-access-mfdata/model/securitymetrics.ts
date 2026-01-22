import { JsonConvertHelper } from "../jsonconverthelper";
import { InstrumentTypeEnum } from "./instrument";

export class SecurityMetrics {
    businesskey: string;
    description: string;
    currencyCode: string;
    currencyKey: string;
    fiscalEndDate: Date;
    securityLifecyclePhase: SecurityLifecyclePhaseEnum;
    securityLifecyclePhaseOverride: SecurityLifecyclePhaseEnum;
    securityLifecyclePhaseAutoCalculated: SecurityLifecyclePhaseEnum;
    sector: string;
    country: string;
    lastUpdateTs: Date;
    priceLastUpdateTs: Date;
    lastManualReviewTs: Date;
    instrumentType: InstrumentTypeEnum;
    metricScore: string;
    moatScore: string;
    riskScore: string;
    growthScore: string;
    opportunityScore: string;
    opportunityScoreValue: number;
    comment: string;  

    // all values are yearly TTM values
    //mandatory
    price: number;
    priceInEuro: number;
    sharesOutstanding: number;
    revenue: number;
    capitalExpenditures: number;
    operatingCashflow: number;
    netIncome: number;
    operatingIncome: number;
    operatingIncomeLastYear: number;
    hasDividendsOrBuyBacks: boolean;

    //optional
    totalAssets: number;
    totalLiabilities: number;
    shortLongTermDebtTotal: number;
    totalCash: number;
    dilutedEPS5Y: number;
    dividendPerShare: number;
    forwardFreeCashflow5YCAGR: number;
    forwardPriceToSales: number;
    beta: number;
    tam: number;
    goodwill: number;
    ebitda: number;
    ebit: number;
    grossProfit: number;
    totalEquity: number;
    currentLiabilities: number;
    forwardSales: number;
    forwardFCF: number;
    forwardEps: number;

    //calculated
    freeCashflow: number;
    expectedFreeCashflow: number;
    avgFreeCashflow5Y: number;
    avgFreeCashflowGrowth5Y: number;
    pe: number;
    evPerEarnings: number;
    roa: number;
    roe: number;
    roce: number;
    debtToAssets: number;
    dividendYield: number;
    dividendPayoutRatio: number;
    intrinsicValue: number;
    intrinsicValueMargin: number;
    intrinsicValueEVMargin: number;
    lynchScore: number;
    revenueGrowthRate: number;
    eps: number;
    ruleOfFourty: number;
    grossMargin: number;
    pricePerSales: number;
    fcfMargin: number;
    //config
    avgMarktcapFreeCashflowRatio: number;
    expectedCashflowGrowth: number;
    expectedFreeCashflowOverride: number;
    pricePerGrossProfit: number;
    priceToFCF: number;
    evToFCF: number;
    forwardPriceToFCF: number;
    forwardEvToFCF: number;
    forwardPe: number;
    forwardEvPerEarnings: number;


    //historical map<fiscalaenddate, value>. fiscalaenddate is a Date, the values are TTM(trailing twelve month) values
    historicalRevenue: Map<number, number>;
    historicalNetIncome: Map<number, number>;
    historicalFreeCashflow: Map<number, number>;
    expectedFreeCashflowGrowthPerYear: Map<number, number>;

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
        securityLifecyclePhase: SecurityLifecyclePhaseEnum,
        securityLifecyclePhaseOverride: SecurityLifecyclePhaseEnum,
        securityLifecyclePhaseAutoCalculated: SecurityLifecyclePhaseEnum,
        metricScore: string,
        moatScore: string,
        riskScore: string,
        growthScore: string,
        opportunityScore: string,
        opportunityScoreValue: number,
        comment: string,
        sector: string,
        country: string,
        lastUpdateTs: Date,
        priceLastUpdateTs: Date,
        lastManualReviewTs: Date,
        price: number,
        priceInEuro: number,
        sharesOutstanding: number,
        revenue: number,
        capitalExpenditures: number,
        operatingCashflow: number,
        netIncome: number,
        operatingIncome: number,
        operatingIncomeLastYear: number,
        hasDividendsOrBuyBacks: boolean,
        totalAssets: number,
        totalLiabilities: number,
        shortLongTermDebtTotal: number,
        totalCash: number,
        dilutedEPS5Y: number,
        dividendPerShare: number,
        forwardFreeCashflow5YCAGR: number,
        forwardPriceToSales: number,
        beta: number,
        tam: number,
        goodwill: number,
        ebitda: number,
        ebit: number,
        grossProfit: number,
        totalEquity: number,
        currentLiabilities: number,
        forwardSales: number,
        forwardFCF: number,
        forwardEps: number,
        freeCashflow: number,
        expectedFreeCashflow: number,
        avgFreeCashflow5Y: number,
        avgFreeCashflowGrowth5Y: number,
        pe: number,
        evPerEarnings: number,
        roa: number,
        roe: number,
        roce: number,
        debtToAssets: number,
        dividendYield: number,
        dividendPayoutRatio: number,
        intrinsicValue: number,
        intrinsicValueMargin: number,
        intrinsicValueEVMargin: number,
        lynchScore: number,
        revenueGrowthRate: number,
        eps: number,
        ruleOfFourty: number,
        grossMargin: number,
        pricePerSales: number,
        fcfMargin: number,
        avgMarktcapFreeCashflowRatio: number,
        expectedCashflowGrowth: number,
        expectedFreeCashflowOverride: number,
        pricePerGrossProfit: number,
        priceToFCF: number,
        evToFCF: number,
        forwardPriceToFCF: number,
        forwardEvToFCF: number,
        forwardPe: number,
        forwardEvPerEarnings: number,
        historicalRevenue: Map<number, number>,
        historicalNetIncome: Map<number, number>,
        historicalFreeCashflow: Map<number, number>,
        expectedFreeCashflowGrowthPerYear: Map<number, number>,
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
        this.securityLifecyclePhaseOverride = securityLifecyclePhaseOverride;
        this.securityLifecyclePhaseAutoCalculated = securityLifecyclePhaseAutoCalculated;
        this.metricScore = metricScore;
        this.moatScore = moatScore;
        this.riskScore = riskScore;
        this.growthScore = growthScore;
        this.opportunityScore = opportunityScore;
        this.opportunityScoreValue = opportunityScoreValue
        this.comment = comment;
        this.sector = sector;
        this.country = country;
        this.lastUpdateTs = lastUpdateTs;
        this.priceLastUpdateTs = priceLastUpdateTs;
        this.lastManualReviewTs = lastManualReviewTs;
        this.price = price;
        this.priceInEuro = priceInEuro;
        this.sharesOutstanding = sharesOutstanding;
        this.revenue = revenue;
        this.capitalExpenditures = capitalExpenditures;
        this.operatingCashflow = operatingCashflow;
        this.netIncome = netIncome;
        this.operatingIncome = operatingIncome;
        this.operatingIncomeLastYear = operatingIncomeLastYear;
        this.hasDividendsOrBuyBacks = hasDividendsOrBuyBacks;
        this.totalAssets = totalAssets;
        this.totalLiabilities = totalLiabilities;
        this.shortLongTermDebtTotal = shortLongTermDebtTotal;
        this.totalCash = totalCash;
        this.dilutedEPS5Y = dilutedEPS5Y;
        this.dividendPerShare = dividendPerShare;
        this.forwardFreeCashflow5YCAGR = forwardFreeCashflow5YCAGR;
        this.forwardPriceToSales = forwardPriceToSales;
        this.beta = beta;
        this.tam = tam;
        this.goodwill = goodwill;
        this.ebitda = ebitda;
        this.ebit = ebit;
        this.grossProfit = grossProfit;
        this.totalEquity = totalEquity;
        this.currentLiabilities = currentLiabilities;
        this.forwardSales = forwardSales;
        this.forwardFCF = forwardFCF;
        this.forwardEps = forwardEps;
        this.freeCashflow = freeCashflow;
        this.expectedFreeCashflow = expectedFreeCashflow;
        this.avgFreeCashflow5Y = avgFreeCashflow5Y;
        this.avgFreeCashflowGrowth5Y = avgFreeCashflowGrowth5Y;
        this.pe = pe;
        this.evPerEarnings = evPerEarnings;
        this.roa = roa;
        this.roe = roe;
        this.roce = roce;
        this.debtToAssets = debtToAssets;
        this.dividendYield = dividendYield;
        this.dividendPayoutRatio = dividendPayoutRatio;
        this.intrinsicValue = intrinsicValue;
        this.intrinsicValueMargin = intrinsicValueMargin;
        this.intrinsicValueEVMargin = intrinsicValueEVMargin;
        this.lynchScore = lynchScore;
        this.revenueGrowthRate = revenueGrowthRate;
        this.eps = eps;
        this.ruleOfFourty = ruleOfFourty;
        this.grossMargin = grossMargin;
        this.pricePerSales = pricePerSales;
        this.fcfMargin = fcfMargin;
        this.avgMarktcapFreeCashflowRatio = avgMarktcapFreeCashflowRatio;
        this.expectedCashflowGrowth = expectedCashflowGrowth;
        this.expectedFreeCashflowOverride = expectedFreeCashflowOverride;
        this.pricePerGrossProfit = pricePerGrossProfit;
        this.priceToFCF = priceToFCF;
        this.evToFCF = evToFCF;
        this.forwardPriceToFCF = forwardPriceToFCF;
        this.forwardEvToFCF = forwardEvToFCF;
        this.forwardPe = forwardPe;
        this.forwardEvPerEarnings = forwardEvPerEarnings;
        this.historicalRevenue = historicalRevenue;
        this.historicalNetIncome = historicalNetIncome;
        this.historicalFreeCashflow = historicalFreeCashflow;
        this.expectedFreeCashflowGrowthPerYear = expectedFreeCashflowGrowthPerYear;
        this.rankByPE = rankByPE;
        this.rankByRoA = rankByRoA;
        this.rankByRoAAndPE = rankByRoAAndPE;
        this.rankByIntrinsicValueMargin = rankByIntrinsicValueMargin;
        this.rankByLynchScore = rankByLynchScore;
        this.rankByLynchAndIntrinsicValueMargin = rankByLynchAndIntrinsicValueMargin;
        this.instrumentType = instrumentType;
    }

    toJSON() {
        let histFCFObj: { [key: number]: number } = {};
        if(this.historicalFreeCashflow instanceof Map){
          histFCFObj =Object.fromEntries(this.historicalFreeCashflow);
        } else {// it is already an object and not a map because it is loaded from the backend and there aonly parsed from json to object
          histFCFObj = this.historicalFreeCashflow
        }
        let expectedFreeCashflowGrowthPerYearObj: { [key: number]: number } = {};
        if(this.expectedFreeCashflowGrowthPerYear instanceof Map){
          expectedFreeCashflowGrowthPerYearObj =Object.fromEntries(this.expectedFreeCashflowGrowthPerYear);
        } else {// it is already an object and not a map because it is loaded from the backend and there aonly parsed from json to object
          expectedFreeCashflowGrowthPerYearObj = this.expectedFreeCashflowGrowthPerYear
        }
        return {
            businesskey: this.businesskey,
            description: this.description,
            currencyCode: this.currencyCode,
            currencyKey: this.currencyKey,
            fiscalEndDate: JsonConvertHelper.dateToIsoString(this.fiscalEndDate),
            securityLifecyclePhase: this.securityLifecyclePhase,
            securityLifecyclePhaseOverride: this.securityLifecyclePhaseOverride,
            securityLifecyclePhaseAutoCalculated: this.securityLifecyclePhaseAutoCalculated,
            metricScore: this.metricScore,
            moatScore: this.moatScore,
            riskScore: this.riskScore,
            growthScore: this.growthScore,
            opportunityScore: this.opportunityScore,
            opportunityScoreValue: this.opportunityScoreValue,
            comment: this.comment,
            sector: this.sector,
            country: this.country,
            lastUpdateTs: JsonConvertHelper.dateTimeToIsoString(this.lastUpdateTs),
            priceLastUpdateTs: JsonConvertHelper.dateTimeToIsoString(this.priceLastUpdateTs),
            lastManualReviewTs: JsonConvertHelper.dateTimeToIsoString(this.lastManualReviewTs),
            price: this.price,
            priceInEuro: this.priceInEuro,
            sharesOutstanding: this.sharesOutstanding,
            revenue: this.revenue,
            capitalExpenditures: this.capitalExpenditures,
            operatingCashflow: this.operatingCashflow,
            netIncome: this.netIncome,
            operatingIncome: this.operatingIncome,
            operatingIncomeLastYear: this.operatingIncomeLastYear,
            hasDividendsOrBuyBacks: this.hasDividendsOrBuyBacks,
            totalAssets: this.totalAssets,
            totalLiabilities: this.totalLiabilities,
            shortLongTermDebtTotal: this.shortLongTermDebtTotal,
            totalCash: this.totalCash,
            dilutedEPS5Y: this.dilutedEPS5Y,
            dividendPerShare: this.dividendPerShare,
            forwardFreeCashflow5YCAGR: this.forwardFreeCashflow5YCAGR,
            forwardPriceToSales: this.forwardPriceToSales,
            beta: this.beta,
            tam: this.tam,
            goodwill: this.goodwill,
            ebitda: this.ebitda,
            ebit: this.ebit,
            grossProfit: this.grossProfit,
            totalEquity: this.totalEquity,
            currentLiabilities: this.currentLiabilities,
            forwardSales: this.forwardSales,
            forwardFCF: this.forwardFCF,
            forwardEps: this.forwardEps,
            freeCashflow: this.freeCashflow,
            expectedFreeCashflow: this.expectedFreeCashflow,
            avgFreeCashflow5Y: this.avgFreeCashflow5Y,
            avgFreeCashflowGrowth5Y: this.avgFreeCashflowGrowth5Y,
            pe: this.pe,
            evPerEarnings: this.evPerEarnings,
            roa: this.roa,
            roe: this.roe,
            roce: this.roce,
            debtToAssets: this.debtToAssets,
            dividendYield: this.dividendYield === Infinity ? null : this.dividendYield,
            dividendPayoutRatio: this.dividendPayoutRatio,
            intrinsicValue: this.intrinsicValue,
            intrinsicValueMargin: this.intrinsicValueMargin,
            intrinsicValueEVMargin: this.intrinsicValueEVMargin,
            lynchScore: this.lynchScore,
            revenueGrowthRate: this.revenueGrowthRate,
            eps: this.eps,
            ruleOfFourty: this.ruleOfFourty,
            grossMargin: this.grossMargin,
            pricePerSales: this.pricePerSales,
            fcfMargin: this.fcfMargin,
            avgMarktcapFreeCashflowRatio: this.avgMarktcapFreeCashflowRatio,
            expectedCashflowGrowth: this.expectedCashflowGrowth,
            expectedFreeCashflowOverride: this.expectedFreeCashflowOverride,
            pricePerGrossProfit: this.pricePerGrossProfit,
            priceToFCF: this.priceToFCF,
            evToFCF: this.evToFCF,
            forwardPriceToFCF: this.forwardPriceToFCF,
            forwardEvToFCF: this.forwardEvToFCF,
            forwardPe: this.forwardPe,
            forwardEvPerEarnings: this.forwardEvPerEarnings,
            historicalRevenue: this.historicalRevenue,
            historicalNetIncome: this.historicalNetIncome,
            historicalFreeCashflow: histFCFObj,
            expectedFreeCashflowGrowthPerYear: expectedFreeCashflowGrowthPerYearObj,
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
            data.securityLifecyclePhaseOverride,
            data.securityLifecyclePhaseAutoCalculated,
            data.metricScore,
            data.moatScore,
            data.riskScore,
            data.growthScore,
            data.opportunityScore,
            data.opportunityScoreValue,
            data.comment,
            data.sector,
            data.country,
            new Date(data.lastUpdateTs),
            new Date(data.priceLastUpdateTs),
            new Date(data.lastManualReviewTs),
            data.price,
            data.priceInEuro,
            data.sharesOutstanding,
            data.revenue,
            data.capitalExpenditures,
            data.operatingCashflow,
            data.netIncome,
            data.operatingIncome,
            data.operatingIncomeLastYear,
            data.hasDividendsOrBuyBacks,
            data.totalAssets,
            data.totalLiabilities,
            data.shortLongTermDebtTotal,
            data.totalCash,
            data.dilutedEPS5Y,
            data.dividendPerShare,
            data.forwardFreeCashflow5YCAGR,
            data.forwardPriceToSales,
            data.beta,
            data.tam,
            data.goodwill,
            data.ebitda,
            data.ebit,
            data.grossProfit,
            data.totalEquity,
            data.currentLiabilities,
            data.forwardSales,
            data.forwardFCF,
            data.forwardEps,
            data.freeCashflow,
            data.expectedFreeCashflow,
            data.avgFreeCashflow5Y,
            data.avgFreeCashflowGrowth5Y,
            data.pe,
            data.evPerEarnings,
            data.roa,
            data.roe,
            data.roce,
            data.debtToAssets,
            data.dividendYield,
            data.dividendPayoutRatio,
            data.intrinsicValue,
            data.intrinsicValueMargin,
            data.intrinsicValueEVMargin,
            data.lynchScore,
            data.revenueGrowthRate,
            data.eps,
            data.ruleOfFourty,
            data.grossMargin,
            data.pricePerSales,
            data.fcfMargin,
            data.avgMarktcapFreeCashflowRatio,
            data.expectedCashflowGrowth,
            data.expectedFreeCashflowOverride,
            data.pricePerGrossProfit,
            data.priceToFCF,
            data.evToFCF,
            data.forwardPriceToFCF,
            data.forwardEvToFCF,
            data.forwardPe,
            data.forwardEvPerEarnings,
            data.historicalRevenue ? new Map(Object.entries(data.historicalRevenue)) : new Map(),
            data.historicalNetIncome ? new Map(Object.entries(data.historicalNetIncome)) : new Map(),
            data.historicalFreeCashflow ? new Map(Object.entries(data.historicalFreeCashflow)) : new Map(),
            data.expectedFreeCashflowGrowthPerYear ? new Map(Object.entries(data.expectedFreeCashflowGrowthPerYear)) : new Map(),
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

export type SecurityLifecyclePhaseEnum = 'STARTUP' | 'HYPERGROWTH' | 'BREAKEVEN' | 'OPERATINGLEVERAGE' | 'CAPITALRETURN' | 'DECLINE';
export const SecurityLifecyclePhaseEnum = {
    STARTUP: 'STARTUP' as SecurityLifecyclePhaseEnum,
    HYPERGROWTH: 'HYPERGROWTH' as SecurityLifecyclePhaseEnum,
    BREAKEVEN: 'BREAKEVEN' as SecurityLifecyclePhaseEnum,
    OPERATINGLEVERAGE: 'OPERATINGLEVERAGE' as SecurityLifecyclePhaseEnum,
    CAPITALRETURN: 'CAPITALRETURN' as SecurityLifecyclePhaseEnum,
    DECLINE: 'DECLINE' as SecurityLifecyclePhaseEnum
};