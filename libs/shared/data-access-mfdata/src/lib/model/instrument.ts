export class Instrument { 
    instrumentType: InstrumentTypeEnum;
    description: string;
    active: boolean;
    treelastchanged: Date;
    businesskey: string;
    parentBusinesskey: string;
    serviceAddress: string;
    tenantBusinesskey: string;
    additionalMaps: Map<AdditionalMapsEnum, string>;
    additionalProperties: Map<AdditionalPropertiesEnum, string>;
    additionalLists: Map<AdditionalListsEnum, string[]>;
    liquidityType: LiquidityTypeEnum;

    constructor(instrumentType: InstrumentTypeEnum, description: string, parentBusinesskey: string, tenantBusinesskey: string) {
        this.instrumentType = instrumentType;
        this.description = description;
        this.active = true;
        this.treelastchanged = new Date();
        this.businesskey = '';
        this.parentBusinesskey = parentBusinesskey;
        this.serviceAddress ='';
        this.tenantBusinesskey = tenantBusinesskey;
        this.additionalMaps = new Map<AdditionalMapsEnum, string>();
        this.additionalProperties = new Map<AdditionalPropertiesEnum, string>();
        this.additionalLists = new Map<AdditionalListsEnum, string[]>();
        this.liquidityType = LiquidityTypeEnum.LIQUIDE;
    }
    toJSON() {
        return {
            instrumentType: this.instrumentType,
            liquidityType: this.liquidityType,
            description: this.description,
            active: this.active,
            treelastchanged: this.treelastchanged,
            businesskey: this.businesskey,
            parentBusinesskey: this.parentBusinesskey,
            serviceAddress: this.serviceAddress,
            tenantBusinesskey: this.tenantBusinesskey,
            additionalMaps: Object.fromEntries(this.additionalMaps),
            additionalProperties: Object.fromEntries(this.additionalProperties),
            additionalLists: Object.fromEntries(this.additionalLists)
        }
    }    
}
export type InstrumentTypeEnum = 'GIRO' | 'MONEYATCALL' | 'TIMEDEPOSIT' | 'BUILDINGSAVINGACCOUNT' | 'BUDGET' | 'TENANT' | 'ACCOUNTPORTFOLIO' | 'ARTIFICALPORTFOLIO' | 'BUDGETGROUP' | 'DEPOT' | 'BUILDINGSAVING' | 'CURRENCY' | 'EQUITY' | 'FONDS' | 'ETF' | 'INDEX' | 'BOND' | 'LIFEINSURANCE' | 'DEPRECATIONOBJECT' | 'REALESTATE' | 'LOAN' | 'BUDGETPORTFOLIO' | 'UNKNOWN';
export const InstrumentTypeEnum = {
    GIRO: 'GIRO' as InstrumentTypeEnum,
    MONEYATCALL: 'MONEYATCALL' as InstrumentTypeEnum,
    TIMEDEPOSIT: 'TIMEDEPOSIT' as InstrumentTypeEnum,
    BUILDINGSAVINGACCOUNT: 'BUILDINGSAVINGACCOUNT' as InstrumentTypeEnum,
    BUDGET: 'BUDGET' as InstrumentTypeEnum,
    TENANT: 'TENANT' as InstrumentTypeEnum,
    ACCOUNTPORTFOLIO: 'ACCOUNTPORTFOLIO' as InstrumentTypeEnum,
    ARTIFICALPORTFOLIO: 'ARTIFICALPORTFOLIO' as InstrumentTypeEnum,
    BUDGETGROUP: 'BUDGETGROUP' as InstrumentTypeEnum,
    DEPOT: 'DEPOT' as InstrumentTypeEnum,
    BUILDINGSAVING: 'BUILDINGSAVING' as InstrumentTypeEnum,
    CURRENCY: 'CURRENCY' as InstrumentTypeEnum,
    EQUITY: 'EQUITY' as InstrumentTypeEnum,
    FONDS: 'FONDS' as InstrumentTypeEnum,
    ETF: 'ETF' as InstrumentTypeEnum,
    INDEX: 'INDEX' as InstrumentTypeEnum,
    BOND: 'BOND' as InstrumentTypeEnum,
    LIFEINSURANCE: 'LIFEINSURANCE' as InstrumentTypeEnum,
    DEPRECATIONOBJECT: 'DEPRECATIONOBJECT' as InstrumentTypeEnum,
    REALESTATE: 'REALESTATE' as InstrumentTypeEnum,
    LOAN: 'LOAN' as InstrumentTypeEnum,
    BUDGETPORTFOLIO: 'BUDGETPORTFOLIO' as InstrumentTypeEnum,
    UNKNOWN: 'UNKNOWN' as InstrumentTypeEnum
};
export type LiquidityTypeEnum = 'LIQUIDE' | 'SHORTTERM' | 'MIDTERM' | 'LONGTERM'| 'UNKNOWN';
export const LiquidityTypeEnum = {
    LIQUIDE: 'LIQUIDE' as LiquidityTypeEnum,
    SHORTTERM: 'SHORTTERM' as LiquidityTypeEnum,
    MIDTERM: 'MIDTERM' as LiquidityTypeEnum,
    LONGTERM: 'LONGTERM' as LiquidityTypeEnum,
    UNKNOWN: 'UNKNOWN' as LiquidityTypeEnum
};
export type AdditionalMapsEnum = 'KEYVALUE' | 'YIELDGOAL' | 'REALESTATEPROFITS' | 'EQUITYSYMBOLS' ;
export type AdditionalPropertiesEnum = 'DEFAULTGIROID' | 'INCOMEBUDGETID' | 'REALESTATEBUDGETGROUPID' | 'MATURITYDATE' | 'CURRENCYCODE' | 'ISIN'| 'IBAN' ;
export const AdditionalPropertiesEnum = {
    DEFAULTGIROID: 'DEFAULTGIROID' as AdditionalPropertiesEnum,
    INCOMEBUDGETID: 'INCOMEBUDGETID' as AdditionalPropertiesEnum,
    REALESTATEBUDGETGROUPID: 'REALESTATEBUDGETGROUPID' as AdditionalPropertiesEnum,
    MATURITYDATE: 'MATURITYDATE' as AdditionalPropertiesEnum,
    CURRENCYCODE: 'CURRENCYCODE' as AdditionalPropertiesEnum,
    ISIN: 'ISIN' as AdditionalPropertiesEnum,
    IBAN: 'IBAN' as AdditionalPropertiesEnum
};
export type AdditionalListsEnum = 'CHILDS';
