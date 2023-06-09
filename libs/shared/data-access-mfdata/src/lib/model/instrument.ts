export interface Instrument { 
    instrumentType: InstrumentTypeEnum;
    description: string;
    active: boolean;
    treelastchanged: Date;
    businesskey: string;
    parentBusinesskey: string;
    serviceAddress: string;
    tenantBusinesskey: string;
    additionalMaps: string[];
    additionalProperties: string[];
    additionalLists: string[];
    
}
export type InstrumentTypeEnum = 'GIRO' | 'MONEYATCALL' | 'TIMEDEPOSIT' | 'BUILDINGSAVINGACCOUNT' | 'BUDGET' | 'TENANT' | 'ACCOUNTPORTFOLIO' | 'ARTIFICALPORTFOLIO' | 'BUDGETGROUP' | 'DEPOT' | 'BUILDINGSAVING' | 'CURRENCY' | 'EQUITY' | 'FONDS' | 'ETF' | 'INDEX' | 'BOND' | 'LIFEINSURANCE' | 'DEPRECATIONOBJECT' | 'REALESTATE' | 'LOAN' | 'BUDGETPORTFOLIO' | 'UNKNOWN';
