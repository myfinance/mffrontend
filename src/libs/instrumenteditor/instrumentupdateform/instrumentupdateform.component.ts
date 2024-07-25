import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstrumentService } from '../instrument.service';
import { LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
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
  liquidityTypes: LiquidityTypeEnum[] = [LiquidityTypeEnum.LIQUIDE, LiquidityTypeEnum.SHORTTERM, LiquidityTypeEnum.MIDTERM, LiquidityTypeEnum.LONGTERM];
  instrumentForm: FormGroup = new FormGroup({
    'description': new FormControl('', Validators.required),
    'active': new FormControl(false, Validators.required),
    'liquidityType': new FormControl(LiquidityTypeEnum.LIQUIDE, Validators.required)
  });

  constructor(private instrumentService: InstrumentService) { }

  ngOnInit() {
    this.instrumentService.newInstrumentSelectedSubject.subscribe(
      () => {
        this.updateSelectedInstrument()
      }
    )
  }

  updateSelectedInstrument() {
    this.selectedInstrument = this.instrumentService.selectedInstrument
    if (this.selectedInstrument) {
      this.noInstrumentSelected = false;
      this.instrumentForm.get('description')?.setValue(this.selectedInstrument.description);
      this.instrumentForm.get('active')?.setValue(this.selectedInstrument.active);
      this.instrumentForm.get('liquidityType')?.setValue(this.selectedInstrument.liquidityType);
    }

  }

  getSelectedInstrumentId(): string {
    if (!this.selectedInstrument) { return ''; } else { return this.selectedInstrument.businesskey; }
  }

  onSubmit() {
    console.log(this.instrumentForm);
    if(this.instrumentForm.touched) {
      console.log('touched');
      this.instrumentService.updateInstrument(this.instrumentForm.value.active, this.instrumentForm.value.description, this.instrumentForm.value.liquidityType );
    } else {
      console.log('untouched');
    }
  }
}