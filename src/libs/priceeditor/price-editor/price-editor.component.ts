import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Instrument } from '../../shared/data-access-mfdata/model/instrument';
import { PriceEditorService } from '../price-editor.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-price-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, ButtonModule, CalendarModule, InputNumberModule],
  templateUrl: './price-editor.component.html',
  styleUrl: './price-editor.component.scss'
})
export class PriceEditorComponent {

  securities: Instrument[] = [];

  inputForm= new FormGroup({

    security: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    priceDate: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), {
      nonNullable: true,
      validators: Validators.required
    }),   
    value: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    })
  });

  constructor(private service: PriceEditorService) {

    this.service.securityEventSubject.subscribe(
      {
        next: () => {
          this.loadSecurities();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadSecurities();
  }

  private loadSecurities() {
    this.securities = this.service.getSecurities();
  }

  onSubmit() {
    this.service.savePrice(this.inputForm.value.security?.businesskey, this.inputForm.value.priceDate, this.inputForm.value.value);
  }

}
