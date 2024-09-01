import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstrumentService } from '../instrument.service';
import { AdditionalMapsEnum, AdditionalPropertiesEnum, InstrumentTypeEnum, LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';

@Component({
  selector: 'mffrontend-instrumentupdateform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './instrumentupdateform.component.html',
  styleUrls: ['./instrumentupdateform.component.scss'],
})
export class InstrumentupdateformComponent implements OnInit {
  noInstrumentSelected = true;
  selectedInstrument: Instrument | undefined;
  currencies: Instrument[] = [];
  liquidityTypes: LiquidityTypeEnum[] = [LiquidityTypeEnum.LIQUIDE, LiquidityTypeEnum.SHORTTERM, LiquidityTypeEnum.MIDTERM, LiquidityTypeEnum.LONGTERM];
  instrumentForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    active: new FormControl(false, Validators.required),
    liquidityType: new FormControl(LiquidityTypeEnum.LIQUIDE, Validators.required),
    symbol: new FormControl<string>('', {
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
    this.currencies = this.instrumentService.getInstruments().filter(instrument => instrument.instrumentType === InstrumentTypeEnum.CURRENCY);

  }

  ngOnInit() {
    this.instrumentService.newInstrumentSelectedSubject.subscribe(
      () => {
        this.updateSelectedInstrument()
      }
    )
  }

  isCurrencyNecessary(control: FormControl): {[s: string]: boolean} {
    if (control== null) { return {'Currency is not necessary': false}; }
    if (control.value == null) { return {'Currency is not necessary': false}; }
    if (control.value.instrumentType === InstrumentTypeEnum.EQUITY) {
      return {'Currency is necessary': true};
    } else { return {'Currency is not necessary': false}; }
  }

  updateSelectedInstrument() {
    this.selectedInstrument = this.instrumentService.selectedInstrument
    if (this.selectedInstrument) {
      this.noInstrumentSelected = false;
      this.instrumentForm.get('description')?.setValue(this.selectedInstrument.description);
      this.instrumentForm.get('active')?.setValue(this.selectedInstrument.active);
      this.instrumentForm.get('liquidityType')?.setValue(this.selectedInstrument.liquidityType);
      if(this.selectedInstrument.instrumentType === InstrumentTypeEnum.EQUITY) {
        if(this.selectedInstrument.additionalMaps && this.selectedInstrument.additionalMaps.size>0){
          const symbolsmap = this.selectedInstrument.additionalMaps.get(AdditionalMapsEnum.EQUITYSYMBOLS);
          if(symbolsmap && symbolsmap.size>0){
            const symbol = symbolsmap.keys().next().value;
            const currency = symbolsmap.get(symbol);
            this.instrumentForm.get('symbol')?.setValue(symbol);
            this.instrumentForm.get('currency')?.setValue(currency);
          }
        }
      }
      if(this.selectedInstrument.instrumentType === InstrumentTypeEnum.CURRENCY) {
        if(this.selectedInstrument.additionalProperties){
          const currencyCode = this.selectedInstrument.additionalProperties.get(AdditionalPropertiesEnum.CURRENCYCODE);
          if(currencyCode){
            this.instrumentForm.get('currencyCode')?.setValue(currencyCode);
          }
        }
      }
    }

  }

  getSelectedInstrumentId(): string {
    if (!this.selectedInstrument) { return ''; } else { return this.selectedInstrument.businesskey; }
  }

  onSubmit() {
    console.log(this.instrumentForm);
    if(this.instrumentForm.touched) {
      console.log('touched');
      let maps = new Map<AdditionalMapsEnum, Map<string,string>>();
      if(this.selectedInstrument){
        if(this.selectedInstrument.additionalMaps && this.selectedInstrument.additionalMaps.size>0){
          maps = this.selectedInstrument.additionalMaps;
        }
        if(this.selectedInstrument.instrumentType === InstrumentTypeEnum.EQUITY) {
          let symbolsmap = new Map<string,string>();
          const currency = this.instrumentForm.value.currency as Instrument;
          const currencyBK=currency.businesskey;
          if(currencyBK) {
            symbolsmap.set(this.instrumentForm.value.symbol,currencyBK);
          }
          maps.set(AdditionalMapsEnum.EQUITYSYMBOLS,symbolsmap);
        }
      }
      this.instrumentService.updateInstrument(this.instrumentForm.value.active, this.instrumentForm.value.description, this.instrumentForm.value.liquidityType, maps);
    } else {
      console.log('untouched');
    }
  }
}