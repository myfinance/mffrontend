export interface Instrument { 
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
export type AdditionalMapsEnum = 'KEYVALUE' | 'YIELDGOAL' | 'REALESTATEPROFITS' | 'EQUITYSYMBOLS' ;
export type AdditionalPropertiesEnum = 'DEFAULTGIROID' | 'INCOMEBUDGETID' | 'REALESTATEBUDGETGROUPID' | 'TENANT' | 'PARENT' | 'MATURITYDATE' | 'CURRENCYCODE' | 'ISIN' ;
export type AdditionalListsEnum = 'CHILDS';
