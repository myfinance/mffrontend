import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Instrument } from '../../shared/data-access-mfdata/model/instrument';
import { PriceEditorService } from '../price-editor.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { EndOfDayPrices } from '../../shared/data-access-mfdata/model/endofdayprices';
import { TableModule } from 'primeng/table';
import localeDe from '@angular/common/locales/de';

@Component({
  selector: 'app-price-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, ButtonModule, CalendarModule, InputNumberModule, TableModule],
  templateUrl: './price-editor.component.html',
  styleUrl: './price-editor.component.scss'
})
export class PriceEditorComponent {

  securities: Instrument[] = [];
  eodPrices: EndOfDayPrices | undefined;

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
    registerLocaleData(localeDe);
    this.service.securityEventSubject.subscribe(
      {
        next: () => {
          this.loadSecurities();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadSecurities();

    this.inputForm.controls.security.valueChanges.subscribe(
      (security) => {
        if(security) {
          this.service.loadPrices(security.businesskey).subscribe(
            (prices) => {
              this.eodPrices = prices;
            }
          )
        } else {
          this.eodPrices = undefined;
        }
      }
    )
  }

  private loadSecurities() {
    this.securities = this.service.getSecurities().sort((a, b) => a.description.localeCompare(b.description));
  }

  onSubmit() {
    this.service.savePrice(this.inputForm.value.security?.businesskey, this.inputForm.value.priceDate, this.inputForm.value.value);
  }

}
