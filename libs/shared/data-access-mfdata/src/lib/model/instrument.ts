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
export type AdditionalMapsEnum = 'KEYVALUE' | 'YIELDGOAL' | 'REALESTATEPROFITS' | 'EQUITYSYMBOLS' ;
export type AdditionalPropertiesEnum = 'DEFAULTGIROID' | 'INCOMEBUDGETID' | 'REALESTATEBUDGETGROUPID' | 'TENANT' | 'PARENT' | 'MATURITYDATE' | 'CURRENCYCODE' | 'ISIN' ;
export type AdditionalListsEnum = 'CHILDS';
