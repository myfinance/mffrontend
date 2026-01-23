import { JsonConvertHelper } from "../jsonconverthelper";
import { InstrumentTypeEnum } from "./instrument";
import { SecurityLifecyclePhaseEnum } from "./securitymetrics";

export class PositionMetrics { 

    businesskey: String;
    description: String;
    instrumentType: InstrumentTypeEnum;
    sector: String;
    country: String;
    portfolio: String;
    securityLifecyclePhase: SecurityLifecyclePhaseEnum;

    metricScore: String;
    moatScore: String;
    riskScore: String;
    growthScore: String;
    //green yellow or red depending on opportunityScoreValue
    opportunityScore: String;

    totalCagr: number;
    cagrPerYear: Map<number, number>;
    yieldPerYear: Map<number, number>;


    amount: number;
    value: number;

    constructor(businesskey: String, description: String, instrumentType: InstrumentTypeEnum, sector: String, country: String, portfolio: String, securityLifecyclePhase: SecurityLifecyclePhaseEnum,
        metricScore: String, moatScore: String, riskScore: String, growthScore: String, opportunityScore: String,
        totalCagr: number, cagrPerYear: Map<number, number>, yieldPerYear: Map<number, number>,
        amount: number, value: number) {
        this.businesskey = businesskey;
        this.description = description;
        this.instrumentType = instrumentType;
        this.sector = sector;
        this.country = country;
        this.portfolio = portfolio;
        this.securityLifecyclePhase = securityLifecyclePhase;
        this.metricScore = metricScore;
        this.moatScore = moatScore;
        this.riskScore = riskScore;
        this.growthScore = growthScore;
        this.opportunityScore = opportunityScore;
        this.totalCagr = totalCagr;
        this.cagrPerYear = cagrPerYear;
        this.yieldPerYear = yieldPerYear;
        this.amount = amount;
        this.value = value;
    }

    toJSON() {
        return {
            businesskey: this.businesskey,
            description: this.description,
            instrumentType: this.instrumentType,
            sector: this.sector,
            country: this.country,
            portfolio: this.portfolio,
            securityLifecyclePhase: this.securityLifecyclePhase,
            metricScore: this.metricScore,
            moatScore: this.moatScore,
            riskScore: this.riskScore,
            growthScore: this.growthScore,
            opportunityScore: this.opportunityScore,
            totalCagr: this.totalCagr,
            cagrPerYear: Object.fromEntries(this.cagrPerYear),
            yieldPerYear: Object.fromEntries(this.yieldPerYear),
            amount: this.amount,
            value: this.value
        }
    } 
    
    static fromJson(data: any): PositionMetrics {
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

        return new PositionMetrics(
            data.businesskey,
            data.description,
            data.instrumentType,
            data.sector,
            data.country,
            data.portfolio,
            data.securityLifecyclePhase,
            data.metricScore,
            data.moatScore,
            data.riskScore,
            data.growthScore,
            data.opportunityScore,
            data.totalCagr,
            cagrPerYear,
            yieldPerYear,
            data.amount,
            data.value
        );
    }
}