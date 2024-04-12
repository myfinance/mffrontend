import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InstrumentService } from '../instrument.service';
import { InstrumentTypeEnum, Instrument, AdditionalMapsEnum, AdditionalListsEnum, AdditionalPropertiesEnum, LiquidityTypeEnum } from '@mffrontend/shared/data-access-mfdata';

@Component({
  selector: 'mffrontend-instrumentinputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './instrumentinputform.component.html',
  styleUrls: ['./instrumentinputform.component.scss'],
})
export class InstrumentinputformComponent {
  instrumentTypes: InstrumentTypeEnum[] = [InstrumentTypeEnum.GIRO, InstrumentTypeEnum.BUDGET];
  liquidityTypes: LiquidityTypeEnum[] = [LiquidityTypeEnum.LIQUIDE, LiquidityTypeEnum.SHORTTERM, LiquidityTypeEnum.MIDTERM, LiquidityTypeEnum.LONGTERM];
  instruments: Instrument[] = [];
  budgetGroups: Instrument[] = [];
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
    })

  });

  constructor(private instrumentService: InstrumentService) {
    this.instrumentService.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.instrumentService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();
  }

  loadInstruments() {
    this.instrumentService.getInstruments().subscribe(
      (instruments) => {
        this.instruments = instruments;
        this.budgetGroups = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGETGROUP);
        this.accPf = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.ACCOUNTPORTFOLIO)[0];
      }
    )
  }

  isBudgetGroupNecessary(control: FormControl): {[s: string]: boolean} {
    if (control== null) { return {'BudgetGroup is not necessary': false}; }
    if (control.value == null) { return {'BudgetGroup is not necessary': false}; }
    if (control.value.instrumentType === InstrumentTypeEnum.BUDGET && control.value.budgetGroup == null) {
      return {'BudgetGroup is necessary': true};
    } else { return {'BudgetGroup is not necessary': false}; }
  }

  onSubmit() {
    let parent = "";
    const maps = new Map<AdditionalMapsEnum, string>();
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
    console.log(this.instrumentForm)
    if(this.instrumentForm.value.description!=null && this.instrumentForm.value.instrumentType!=null) {
      this.instrumentService.saveInstrument(this.instrumentForm.value.description, 
        this.instrumentForm.value.instrumentType  as InstrumentTypeEnum,
        parent, maps, properties, lists, this.instrumentForm.value.liquidityType as LiquidityTypeEnum);
    }
  }
}
