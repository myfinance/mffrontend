import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InstrumentService } from '../instrument.service';
import { InstrumentTypeEnum } from '@mffrontend/shared/data-access-mfdata';

@Component({
  selector: 'mffrontend-instrumentinputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './instrumentinputform.component.html',
  styleUrls: ['./instrumentinputform.component.scss'],
})
export class InstrumentinputformComponent {
  instrumentTypes: InstrumentTypeEnum[] = [InstrumentTypeEnum.GIRO, InstrumentTypeEnum.BUDGET];

  instrumentForm= new FormGroup({

    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    instrumentType: new FormControl<string>(InstrumentTypeEnum.GIRO, {
      nonNullable: true,
      validators: Validators.required
    })

  });

  constructor(private instrumentervice: InstrumentService) {
  }

  onSubmit() {
    console.log(this.instrumentForm)
    if(this.instrumentForm.value.description!=null) {
      this.instrumentervice.saveInstrument(this.instrumentForm.value.description);
    }
  }
}

