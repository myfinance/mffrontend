import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Instrument } from '@mffrontend/shared/data-access-mfdata';
import { InstrumentService } from '../instrument.service';

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
  instrumentForm: FormGroup = new FormGroup({
    'description': new FormControl('', Validators.required),
    'active': new FormControl(false, Validators.required)
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
    }

  }

  getSelectedInstrumentId(): string {
    if (!this.selectedInstrument) { return ''; } else { return this.selectedInstrument.businesskey; }
  }

  onSubmit() {
    console.log(this.instrumentForm);
    if(this.instrumentForm.touched) {
      console.log('touched');
      this.instrumentService.updateInstrument(this.instrumentForm.value.active, this.instrumentForm.value.description );
    } else {
      console.log('untouched');
    }
  }
}