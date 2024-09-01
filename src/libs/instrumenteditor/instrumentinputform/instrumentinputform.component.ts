import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InstrumentService } from '../instrument.service';
import { AdditionalListsEnum, AdditionalMapsEnum, AdditionalPropertiesEnum, Instrument, InstrumentTypeEnum, LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';

@Component({
  selector: 'mffrontend-instrumentinputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './instrumentinputform.component.html',
  styleUrls: ['./instrumentinputform.component.scss'],
})
export class InstrumentinputformComponent {
  instrumentTypes: InstrumentTypeEnum[] = [InstrumentTypeEnum.GIRO, InstrumentTypeEnum.BUDGET, InstrumentTypeEnum.EQUITY, InstrumentTypeEnum.CURRENCY];
  liquidityTypes: LiquidityTypeEnum[] = [LiquidityTypeEnum.LIQUIDE, LiquidityTypeEnum.SHORTTERM, LiquidityTypeEnum.MIDTERM, LiquidityTypeEnum.LONGTERM];
  instruments: Instrument[] = [];
  budgetGroups: Instrument[] = [];
  currencies: Instrument[] = [];
  accPf?: Instrument;
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
    })

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

  onSubmit() {
    let parent = "";
    const maps = new Map<AdditionalMapsEnum, Map<string,string>>();
    const properties = new Map<AdditionalPropertiesEnum, string>();
    const lists = new Map<AdditionalListsEnum, ['']>();

    if (this.instrumentForm.value.instrumentType === InstrumentTypeEnum.GIRO) {
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
    console.log(this.instrumentForm)
    if(this.instrumentForm.value.description!=null && this.instrumentForm.value.instrumentType!=null) {
      this.instrumentService.saveInstrument(this.instrumentForm.value.description, 
        this.instrumentForm.value.instrumentType  as InstrumentTypeEnum,
        parent, maps, properties, lists, this.instrumentForm.value.liquidityType as LiquidityTypeEnum);
    }
  }
}
