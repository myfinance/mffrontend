export class Instrument {
    instrumentType: InstrumentTypeEnum;
    description: string;
    active: boolean;
    treelastchanged: Date;
    businesskey: string;
    parentBusinesskey: string;
    serviceAddress: string;
    tenantBusinesskey: string;
    additionalMaps: Map<AdditionalMapsEnum, Map<string, string>>;
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
        this.serviceAddress = '';
        this.tenantBusinesskey = tenantBusinesskey;
        this.additionalMaps = new Map<AdditionalMapsEnum, Map<string, string>>();
        this.additionalProperties = new Map<AdditionalPropertiesEnum, string>();
        this.additionalLists = new Map<AdditionalListsEnum, string[]>();
        this.liquidityType = LiquidityTypeEnum.LIQUIDE;
    }

    // Static method to convert a plain object to an Instrument instance
    static fromJson(data: any): Instrument {
        const additionalProperties = new Map<AdditionalPropertiesEnum, string>(
            Object.entries(data.additionalProperties).map(([key, value]) => [key as AdditionalPropertiesEnum, value as string])
        );
        // Convert additionalMaps to Map<AdditionalMapsEnum, Map<string, string>>
        const additionalMaps = new Map<AdditionalMapsEnum, Map<string, string>>(
            Object.entries(data.additionalMaps).map(([key, value]) => [
                AdditionalMapsEnum[key as keyof typeof AdditionalMapsEnum],
                new Map(Object.entries(value as { [key: string]: string }))
            ])
        );
        const additionalLists = new Map<AdditionalListsEnum, string[]>(
            Object.entries(data.additionalLists).map(([key, value]) => [key as AdditionalListsEnum, value as string[]])
        );
        const instrument = new Instrument(data.instrumentType, data.description, data.parentBusinesskey, data.tenantBusinesskey);
        instrument.businesskey = data.businesskey;
        instrument.active = data.active;
        instrument.liquidityType = data.liquidityType;
        instrument.additionalLists = data.additionalLists;
        instrument.additionalMaps = data.additionalMaps;
        instrument.additionalProperties = additionalProperties;
        return instrument;
    }

    public static instrumentToJson(instrument: Instrument): string {
        const additionalMapsObj: { [key: string]: { [key: string]: string } } = {};
        instrument.additionalMaps.forEach((innerMap, key) => {
          additionalMapsObj[key] = Object.fromEntries(innerMap);
        });
    
        let additionalPropertiesObj: { [key: string]: string } = {};
        if(instrument.additionalProperties instanceof Map){
          additionalPropertiesObj =Object.fromEntries(instrument.additionalProperties);
        } else {// it is already an object and not a map because it is loaded from the backend and there aonly parsed from json to object
          additionalPropertiesObj = instrument.additionalProperties
        }
        let additionalListsObj: { [key: string]: string[] } = {};
        if(instrument.additionalLists instanceof Map){
          additionalListsObj =Object.fromEntries(instrument.additionalLists);
        } else {// it is already an object and not a map because it is loaded from the backend and there aonly parsed from json to object
          additionalListsObj = instrument.additionalLists;
        }
    
        return JSON.stringify({
          instrumentType: instrument.instrumentType,
          liquidityType: instrument.liquidityType,
          description: instrument.description,
          active: instrument.active,
          treelastchanged: instrument.treelastchanged,
          businesskey: instrument.businesskey,
          parentBusinesskey: instrument.parentBusinesskey,
          serviceAddress: instrument.serviceAddress,
          tenantBusinesskey: instrument.tenantBusinesskey,
          additionalMaps: additionalMapsObj,
          additionalProperties: additionalPropertiesObj,
          additionalLists: additionalListsObj
        });
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
export type LiquidityTypeEnum = 'LIQUIDE' | 'SHORTTERM' | 'MIDTERM' | 'LONGTERM' | 'UNKNOWN';
export const LiquidityTypeEnum = {
    LIQUIDE: 'LIQUIDE' as LiquidityTypeEnum,
    SHORTTERM: 'SHORTTERM' as LiquidityTypeEnum,
    MIDTERM: 'MIDTERM' as LiquidityTypeEnum,
    LONGTERM: 'LONGTERM' as LiquidityTypeEnum,
    UNKNOWN: 'UNKNOWN' as LiquidityTypeEnum
};
export type AdditionalMapsEnum = 'KEYVALUE' | 'YIELDGOAL' | 'REALESTATEPROFITS' | 'EQUITYSYMBOLS';
export const AdditionalMapsEnum = {
    KEYVALUE: 'KEYVALUE' as AdditionalMapsEnum,
    YIELDGOAL: 'YIELDGOAL' as AdditionalMapsEnum,
    REALESTATEPROFITS: 'REALESTATEPROFITS' as AdditionalMapsEnum,
    EQUITYSYMBOLS: 'EQUITYSYMBOLS' as AdditionalMapsEnum
};
export type AdditionalPropertiesEnum = 'DEFAULTGIROID' | 'INCOMEBUDGETID' | 'REALESTATEBUDGETGROUPID' | 'MATURITYDATE' | 'CURRENCYCODE' | 'ISIN' | 'IBAN';
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
