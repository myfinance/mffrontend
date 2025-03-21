import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InstrumentService, tableRowTuple } from '../instrument.service';
import { AdditionalListsEnum, AdditionalMapsEnum, AdditionalPropertiesEnum, Instrument, InstrumentTypeEnum, LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { JsonConvertHelper } from '../../shared/data-access-mfdata/jsonconverthelper';



@Component({
  selector: 'mffrontend-instrumentinputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule, TableModule],
  templateUrl: './instrumentinputform.component.html',
  styleUrls: ['./instrumentinputform.component.scss'],
})
export class InstrumentinputformComponent {
  instrumentTypes: InstrumentTypeEnum[] = [InstrumentTypeEnum.GIRO, InstrumentTypeEnum.BUDGET, InstrumentTypeEnum.EQUITY, InstrumentTypeEnum.CURRENCY, InstrumentTypeEnum.DEPOT, InstrumentTypeEnum.BOND, InstrumentTypeEnum.ETF, InstrumentTypeEnum.FONDS, 
    InstrumentTypeEnum.REALESTATE, InstrumentTypeEnum.DEPRECATIONOBJECT, InstrumentTypeEnum.LIFEINSURANCE, InstrumentTypeEnum.LOAN, InstrumentTypeEnum.MONEYATCALL, InstrumentTypeEnum.TIMEDEPOSIT,InstrumentTypeEnum.BUILDINGSAVINGACCOUNT];
  liquidityTypes: LiquidityTypeEnum[] = [LiquidityTypeEnum.LIQUIDE, LiquidityTypeEnum.SHORTTERM, LiquidityTypeEnum.MIDTERM, LiquidityTypeEnum.LONGTERM];
  instruments: Instrument[] = [];
  budgetGroups: Instrument[] = [];
  currencies: Instrument[] = [];
  budgets: Instrument[] = [];
  giros: Instrument[] = [];
  accPf?: Instrument;
  yieldgoals: tableRowTuple[]= [];
  selectedYieldGoal?: tableRowTuple;
  realestateProfits: tableRowTuple[]= [];
  selectedRealestateProfit?: tableRowTuple;
  surrendervalues: tableRowTuple[]= [];
  selectedSurrendervalue?: tableRowTuple;


  instrumentForm= new FormGroup({

    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    instrumentType: new FormControl<string>(InstrumentTypeEnum.GIRO, {
      nonNullable: true,
      validators: Validators.required
    }),
    budgetGroup: new FormControl<Instrument|null>(null, {
      validators: [Validators.required, this.isBudgetGroupNecessary.bind(this)]
    }),
    liquidityType: new FormControl<string>(LiquidityTypeEnum.LIQUIDE, {
      nonNullable: true,
      validators: Validators.required
    }),
    iban: new FormControl<string>('', {
      nonNullable: false
    }),
    symbol: new FormControl<string>('', {
      nonNullable: false
    }),
    isin: new FormControl<string>('', {
      nonNullable: false
    }),
    currency: new FormControl<Instrument|null>(null, {
      validators: [Validators.required, this.isCurrencyNecessary.bind(this)]
    }),
    currencyCode: new FormControl<string>('', {
      nonNullable: false
    }),
    valuebudget: new FormControl<Instrument|null>(null, {
      validators: [Validators.required, this.isValueBudgetNecessary.bind(this)]
    }),
    newYieldGoal: new FormControl<number>(0.0, {
      nonNullable: false
    }),
    yieldGoalDate: new FormControl<Date>(new Date(), {
      nonNullable: false
    }),
    newRealestateProfit: new FormControl<number>(0.0, {
      nonNullable: false
    }),
    realestateProfitDate: new FormControl<Date>(new Date(), {
      nonNullable: false
    }),
    newSurrendervalue: new FormControl<number>(0.0, {
      nonNullable: false
    }),
    surrendervalueDate: new FormControl<Date>(new Date(), {
      nonNullable: false
    }),
    maturityDate: new FormControl<Date>(new Date(), {
      nonNullable: false
    }),
    acquisitionDate: new FormControl<Date>(new Date(), {
      nonNullable: false
    }),
    acquisitionValue: new FormControl<number>(0.0, {
      nonNullable: false
    }),
    interestRate: new FormControl<number>(0.0, {
      nonNullable: false
    }),
    annuityRate: new FormControl<number>(0.0, {
      nonNullable: false
    }),
    referenceGiro: new FormControl<Instrument|null>(null, {
      validators: [Validators.required, this.isReferenceGiroNecessary.bind(this)]
    }),
  });

  constructor(private instrumentService: InstrumentService) {
    this.instrumentService.newInstrumentsLoadedSubject.subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.loadInstruments();
  }

  loadInstruments() {
    this.instruments=this.instrumentService.getInstruments();
    this.budgetGroups = this.instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGETGROUP);
    this.accPf = this.instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.ACCOUNTPORTFOLIO)[0];
    this.currencies = this.instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.CURRENCY);
    this.budgets = this.instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET);
    this.giros = this.instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO);

  }

  isValueBudgetNecessary(control: FormControl): {[s: string]: boolean} {
    if (control== null) { return {'BudgetGroup is not necessary': false}; }
    if (control.value == null) { return {'BudgetGroup is not necessary': false}; }
    if ((control.value.instrumentType === InstrumentTypeEnum.DEPOT || control.value.instrumentType === InstrumentTypeEnum.DEPRECATIONOBJECT || control.value.instrumentType === InstrumentTypeEnum.LIFEINSURANCE)
      && control.value.valuebudget == null) {
      return {'ValueBudget is necessary': true};
    } else { return {'ValueBudget is not necessary': false}; }
  }

  isBudgetGroupNecessary(control: FormControl): {[s: string]: boolean} {
    if (control== null) { return {'BudgetGroup is not necessary': false}; }
    if (control.value == null) { return {'BudgetGroup is not necessary': false}; }
    if (control.value.instrumentType === InstrumentTypeEnum.BUDGET && control.value.budgetGroup == null) {
      return {'BudgetGroup is necessary': true};
    } else { return {'BudgetGroup is not necessary': false}; }
  }

  isCurrencyNecessary(control: FormControl): {[s: string]: boolean} {
    if (control== null) { return {'Currency is not necessary': false}; }
    if (control.value == null) { return {'Currency is not necessary': false}; }
    if (control.value.instrumentType === InstrumentTypeEnum.EQUITY) {
      return {'Currency is necessary': true};
    } else { return {'Currency is not necessary': false}; }
  }

  isReferenceGiroNecessary(control: FormControl): {[s: string]: boolean} {
    if (control== null) { return {'ReferenceGiro is not necessary': false}; }
    if (control.value == null) { return {'ReferenceGiro is not necessary': false}; }
    if (control.value.instrumentType === InstrumentTypeEnum.LOAN && control.value.valuebudget == null) {
      return {'ReferenceGiro is necessary': true};
    } else { return {'ReferenceGiro is not necessary': false}; }
  }

  addYieldGoal() {
    const yieldGoalDate = this.instrumentForm.value.yieldGoalDate;
    const newYieldGoal = this.instrumentForm.value.newYieldGoal;
    if(yieldGoalDate && newYieldGoal) {
      const newTuple : tableRowTuple={
        date: yieldGoalDate, 
        value: newYieldGoal
      }
      this.yieldgoals.push(newTuple);
    }
    
  }

  removeYieldGoal() {
    if(this.selectedYieldGoal!==undefined) {
      const selectedDate = this.selectedYieldGoal.date;
      this.yieldgoals = this.yieldgoals.filter(( obj ) => {
        return obj.date !== selectedDate;
      });
    }
  }

  addRealestateProfit() {
    const realestateProfitDate = this.instrumentForm.value.realestateProfitDate;
    const newRealestateProfit = this.instrumentForm.value.newRealestateProfit;
    if(realestateProfitDate && newRealestateProfit) {
      const newTuple : tableRowTuple={
        date: realestateProfitDate, 
        value: newRealestateProfit
      }
      this.realestateProfits.push(newTuple);
    }
    
  }

  removeRealestateProfit() {
    if(this.selectedRealestateProfit!==undefined) {
      const selectedDate = this.selectedRealestateProfit.date;
      this.realestateProfits = this.realestateProfits.filter(( obj ) => {
        return obj.date !== selectedDate;
      });
    }
  }

  addSurrendervalue() {
    const surrendervalueDate = this.instrumentForm.value.surrendervalueDate;
    const newSurrendervalue = this.instrumentForm.value.newSurrendervalue;
    if(surrendervalueDate && newSurrendervalue) {
      const newTuple : tableRowTuple={
        date: surrendervalueDate, 
        value: newSurrendervalue
      }
      this.surrendervalues.push(newTuple);
    }
    
  }

  removeSurrendervalue() {
    if(this.selectedSurrendervalue!==undefined) {
      const selectedDate = this.selectedSurrendervalue.date;
      this.surrendervalues = this.surrendervalues.filter(( obj ) => {
        return obj.date !== selectedDate;
      });
    }
  }

  onSubmit() {
    let parent = "";
    const maps = new Map<AdditionalMapsEnum, Map<string,string>>();
    const properties = new Map<AdditionalPropertiesEnum, string>();
    const lists = new Map<AdditionalListsEnum, ['']>();

    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.GIRO || this.instrumentForm.value.instrumentType === InstrumentTypeEnum.MONEYATCALL || this.instrumentForm.value.instrumentType === InstrumentTypeEnum.TIMEDEPOSIT || this.instrumentForm.value.instrumentType === InstrumentTypeEnum.BUILDINGSAVINGACCOUNT) {
      if (this.accPf!==null) {
        parent = this.accPf?.businesskey || "";
      } 
      if(this.instrumentForm.value.iban && this.instrumentForm.value.iban.trim() !==''){
        properties.set(AdditionalPropertiesEnum.IBAN, this.instrumentForm.value.iban as string);
      }
    }
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.BUDGET) {
      parent = this.instrumentForm.value.budgetGroup?.businesskey || ""
    } 
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.EQUITY) {
      const symbolCurrencyMap = new Map<string,string>();
      const symbol = this.instrumentForm.value.symbol;
      if(symbol && symbol !=="") {
        const currencyObj = this.instrumentForm.value.currency;
        let currencyBK: string|undefined;
        if(currencyObj){
          currencyBK=currencyObj.businesskey;
        }
        symbolCurrencyMap.set(symbol, currencyBK || "NA")
      }
      
      maps.set(AdditionalMapsEnum.EQUITYSYMBOLS,symbolCurrencyMap);
      properties.set(AdditionalPropertiesEnum.ISIN, this.instrumentForm.value.isin || "");
      
    } 
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.CURRENCY) {
      properties.set(AdditionalPropertiesEnum.CURRENCYCODE, this.instrumentForm.value.currencyCode || "");
    } 
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.DEPOT || this.instrumentForm.value.instrumentType === InstrumentTypeEnum.REALESTATE|| this.instrumentForm.value.instrumentType === InstrumentTypeEnum.DEPRECATIONOBJECT|| this.instrumentForm.value.instrumentType === InstrumentTypeEnum.LIFEINSURANCE) {
      properties.set(AdditionalPropertiesEnum.VALUEBUDGETID, this.instrumentForm.value.valuebudget?.businesskey || "");
      parent = this.accPf?.businesskey || "";
    } 
    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.REALESTATE) {
      const yieldGoalMap: Map<string,string> = new Map<string,string>();
      this.yieldgoals.forEach((obj) => {
        yieldGoalMap.set(JsonConvertHelper.dateToIsoString(obj.date), obj.value.toString());
      });
      maps.set(AdditionalMapsEnum.YIELDGOAL, yieldGoalMap);

      const realestateProfitMap: Map<string,string> = new Map<string,string>();
      this.realestateProfits.forEach((obj) => {
        realestateProfitMap.set(JsonConvertHelper.dateToIsoString(obj.date), obj.value.toString());
      });
      maps.set(AdditionalMapsEnum.REALESTATEPROFITS, realestateProfitMap);
    } 

    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.LIFEINSURANCE) {
      const surrendervalueMap: Map<string,string> = new Map<string,string>();
      this.surrendervalues.forEach((obj) => {
        surrendervalueMap.set(JsonConvertHelper.dateToIsoString(obj.date), obj.value.toString());
      });
      maps.set(AdditionalMapsEnum.SURRENDERVALUES, surrendervalueMap);
    } 

    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.DEPRECATIONOBJECT|| this.instrumentForm.value.instrumentType === InstrumentTypeEnum.LIFEINSURANCE|| this.instrumentForm.value.instrumentType === InstrumentTypeEnum.LOAN) {
      const date = this.instrumentForm.value.maturityDate;
      if(date!== undefined && date!== null) {
        properties.set(AdditionalPropertiesEnum.MATURITYDATE, JsonConvertHelper.dateToIsoString(date));
      }
    } 

    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.DEPRECATIONOBJECT) {
      const date = this.instrumentForm.value.acquisitionDate;
      if(date!== undefined && date!== null) {
        properties.set(AdditionalPropertiesEnum.ACQUISITIONDATE, JsonConvertHelper.dateToIsoString(date));
      }
      const value = this.instrumentForm.value.acquisitionValue || 0.0;
      properties.set(AdditionalPropertiesEnum.ACQUISITIONVALUE, value.toString());
    } 

    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.LOAN) {
      const interstrate = this.instrumentForm.value.interestRate || 0.0;
      properties.set(AdditionalPropertiesEnum.INTERESTRATE, interstrate.toString());
      const annuity = this.instrumentForm.value.annuityRate || 0.0;
      properties.set(AdditionalPropertiesEnum.ANNUITYRATE, annuity.toString());
      properties.set(AdditionalPropertiesEnum.REFERENCEGIRO, this.instrumentForm.value.referenceGiro?.businesskey || "");
    } 

    console.log(this.instrumentForm)
    if(this.instrumentForm.value.description!=null && this.instrumentForm.value.instrumentType!=null) {
      this.instrumentService.saveInstrument(this.instrumentForm.value.description, 
        this.instrumentForm.value.instrumentType  as InstrumentTypeEnum,
        parent, maps, properties, lists, this.instrumentForm.value.liquidityType as LiquidityTypeEnum);
    }
  }
}
