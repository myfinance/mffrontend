import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstrumentService, tableRowTuple } from '../instrument.service';
import { AdditionalMapsEnum, AdditionalPropertiesEnum, InstrumentTypeEnum, LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { JsonConvertHelper } from '../../shared/data-access-mfdata/jsonconverthelper';

@Component({
  selector: 'mffrontend-instrumentupdateform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, CalendarModule],
  templateUrl: './instrumentupdateform.component.html',
  styleUrls: ['./instrumentupdateform.component.scss'],
})
export class InstrumentupdateformComponent implements OnInit {
  noInstrumentSelected = true;
  selectedInstrument: Instrument | undefined;
  currencies: Instrument[] = [];
  yieldgoals: tableRowTuple[] = [];
  selectedYieldGoal?: tableRowTuple;
  realestateProfits: tableRowTuple[] = [];
  selectedRealestateProfit?: tableRowTuple;
  surrendervalues: tableRowTuple[] = [];
  selectedSurrendervalue?: tableRowTuple;
  liquidityTypes: LiquidityTypeEnum[] = [LiquidityTypeEnum.LIQUIDE, LiquidityTypeEnum.SHORTTERM, LiquidityTypeEnum.MIDTERM, LiquidityTypeEnum.LONGTERM];

  instrumentForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    active: new FormControl(false, Validators.required),
    liquidityType: new FormControl(LiquidityTypeEnum.LIQUIDE, Validators.required),
    symbol: new FormControl<string>('', {
      nonNullable: false
    }),
    currency: new FormControl<Instrument | null>(null, {
      validators: [Validators.required, this.isCurrencyNecessary.bind(this)]
    }),
    currencyCode: new FormControl<string>('', {
      nonNullable: false
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
    this.currencies = this.instrumentService.getInstruments().filter(instrument => instrument.instrumentType === InstrumentTypeEnum.CURRENCY);

  }

  ngOnInit() {
    this.instrumentService.newInstrumentSelectedSubject.subscribe(
      () => {
        this.updateSelectedInstrument()
      }
    )
  }

  addYieldGoal() {
    const yieldGoalDate = this.instrumentForm.value.yieldGoalDate;
    const newYieldGoal = this.instrumentForm.value.newYieldGoal;
    if (yieldGoalDate && newYieldGoal) {
      const newTuple: tableRowTuple = {
        date: yieldGoalDate,
        value: newYieldGoal
      }
      this.yieldgoals.push(newTuple);
    }

  }

  removeYieldGoal() {
    if (this.selectedYieldGoal !== undefined) {
      const selectedDate = this.selectedYieldGoal.date;
      this.yieldgoals = this.yieldgoals.filter((obj) => {
        return obj.date !== selectedDate;
      });
    }
  }

  addRealestateProfit() {
    const realestateProfitDate = this.instrumentForm.value.realestateProfitDate;
    const newRealestateProfit = this.instrumentForm.value.newRealestateProfit;
    if (realestateProfitDate && newRealestateProfit) {
      const newTuple: tableRowTuple = {
        date: realestateProfitDate,
        value: newRealestateProfit
      }
      this.realestateProfits.push(newTuple);
    }

  }

  removeRealestateProfit() {
    if (this.selectedRealestateProfit !== undefined) {
      const selectedDate = this.selectedRealestateProfit.date;
      this.realestateProfits = this.realestateProfits.filter((obj) => {
        return obj.date !== selectedDate;
      });
    }
  }

  addSurrendervalue() {
    const surrendervalueDate = this.instrumentForm.value.surrendervalueDate;
    const newSurrendervalue = this.instrumentForm.value.newSurrendervalue;
    if(surrendervalueDate && newSurrendervalue!==undefined && newSurrendervalue!==null) {
      const newTuple : tableRowTuple={
        date: surrendervalueDate, 
        value: newSurrendervalue
      }
      this.surrendervalues.push(newTuple);
    }
  }

  removeSurrendervalue() {
    if (this.selectedSurrendervalue !== undefined) {
      const selectedDate = this.selectedSurrendervalue.date;
      this.surrendervalues = this.surrendervalues.filter((obj) => {
        return obj.date !== selectedDate;
      });
    }
  }

  isCurrencyNecessary(control: FormControl): { [s: string]: boolean } {
    if (control == null) { return { 'Currency is not necessary': false }; }
    if (control.value == null) { return { 'Currency is not necessary': false }; }
    if (control.value.instrumentType === InstrumentTypeEnum.EQUITY) {
      return { 'Currency is necessary': true };
    } else { return { 'Currency is not necessary': false }; }
  }

  updateSelectedInstrument() {
    this.selectedInstrument = this.instrumentService.selectedInstrument
    if (this.selectedInstrument) {
      this.noInstrumentSelected = false;
      this.instrumentForm.get('description')?.setValue(this.selectedInstrument.description);
      this.instrumentForm.get('active')?.setValue(this.selectedInstrument.active);
      this.instrumentForm.get('liquidityType')?.setValue(this.selectedInstrument.liquidityType);
      if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.EQUITY) {
        if (this.selectedInstrument.additionalMaps && this.selectedInstrument.additionalMaps.size > 0) {
          const symbolsmap = this.selectedInstrument.additionalMaps.get(AdditionalMapsEnum.EQUITYSYMBOLS);
          if (symbolsmap && symbolsmap.size > 0) {
            const symbol = symbolsmap.keys().next().value;
            if (symbol) {
              const currency = symbolsmap.get(symbol);
              this.instrumentForm.get('symbol')?.setValue(symbol);
              this.instrumentForm.get('currency')?.setValue(currency);
            }
          }
        }
      }
      if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.CURRENCY) {
        if (this.selectedInstrument.additionalProperties) {
          const currencyCode = this.selectedInstrument.additionalProperties.get(AdditionalPropertiesEnum.CURRENCYCODE);
          if (currencyCode) {
            this.instrumentForm.get('currencyCode')?.setValue(currencyCode);
          }
        }
      }
      if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.REALESTATE) {
        const yieldgoals = this.selectedInstrument.additionalMaps.get(AdditionalMapsEnum.YIELDGOAL);
        if (yieldgoals && yieldgoals.size > 0) {
          this.yieldgoals =[];
          yieldgoals.forEach((value, key) => {
            const newTuple: tableRowTuple = {
              date: new Date(key),
              value: parseFloat(value)
            }
            this.yieldgoals.push(newTuple);
          })
        }
        const profits = this.selectedInstrument.additionalMaps.get(AdditionalMapsEnum.REALESTATEPROFITS);
        if (profits && profits.size > 0) {
          this.realestateProfits =[];
          profits.forEach((value, key) => {
            const newTuple: tableRowTuple = {
              date: new Date(key),
              value: parseFloat(value)
            }
            this.realestateProfits.push(newTuple);
          })
        }
      }
      if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.LIFEINSURANCE) {
        const surrenderValues = this.selectedInstrument.additionalMaps.get(AdditionalMapsEnum.SURRENDERVALUES);
        this.surrendervalues =[];
        if (surrenderValues && surrenderValues.size > 0) {
          surrenderValues.forEach((value, key) => {
            const newTuple: tableRowTuple = {
              date: new Date(key),
              value: parseFloat(value)
            }
            this.surrendervalues.push(newTuple);
          })
        }
      }
    }

  }

  getSelectedInstrumentId(): string {
    if (!this.selectedInstrument) { return ''; } else { return this.selectedInstrument.businesskey; }
  }

  onSubmit() {
    console.log(this.instrumentForm);
    if (this.instrumentForm.touched) {
      console.log('touched');
      let maps = new Map<AdditionalMapsEnum, Map<string, string>>();
      if (this.selectedInstrument) {
        if (this.selectedInstrument.additionalMaps && this.selectedInstrument.additionalMaps.size > 0) {
          maps = this.selectedInstrument.additionalMaps;
        }
        if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.EQUITY) {
          let symbolsmap = new Map<string, string>();
          const currency = this.instrumentForm.value.currency as Instrument;
          const currencyBK = currency.businesskey;
          if (currencyBK) {
            symbolsmap.set(this.instrumentForm.value.symbol, currencyBK);
          }
          maps.set(AdditionalMapsEnum.EQUITYSYMBOLS, symbolsmap);
        }
        if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.REALESTATE) {
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
    
        if (this.selectedInstrument.instrumentType === InstrumentTypeEnum.LIFEINSURANCE) {
          const surrendervalueMap: Map<string,string> = new Map<string,string>();
          this.surrendervalues.forEach((obj) => {
            surrendervalueMap.set(JsonConvertHelper.dateToIsoString(obj.date), obj.value.toString());
          });
          maps.set(AdditionalMapsEnum.SURRENDERVALUES, surrendervalueMap);
        } 
      }
      this.instrumentService.updateInstrument(this.instrumentForm.value.active, this.instrumentForm.value.description, this.instrumentForm.value.liquidityType, maps);
    } else {
      console.log('untouched');
    }
  }
}