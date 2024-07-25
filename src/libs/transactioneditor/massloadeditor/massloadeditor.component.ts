import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { Transaction } from '../../shared/data-access-mfdata/model/transaction';

@Component({
  selector: 'mffrontend-massloadeditor',
  standalone: true,
  imports: [CommonModule, TableModule, DropdownModule, FormsModule, InputSwitchModule, ButtonModule,ReactiveFormsModule, CalendarModule,InputNumberModule],
  templateUrl: './massloadeditor.component.html',
  styleUrl: './massloadeditor.component.scss',
})
export class MassloadeditorComponent {

  content: string[][] = [];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];
  selectedGiro: Instrument | undefined = undefined;

  dynamicForm: FormGroup;

  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      giro: ['', [Validators.required]],
      rows: this.fb.array([])
    });

    this.transactionService.newFileSelectedSubject.subscribe({
      next:
        () => {
          this.loadData();
        },
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })

    this.transactionService.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.transactionService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();


  }

  get rows(): FormArray {
    if(this.dynamicForm ===undefined || this.dynamicForm ===null){
      return this.fb.array([])
    }
    return this.dynamicForm.get('rows') as FormArray;
  }

  loadData(){
    this.content=this.transactionService.getMassloadContent();
    this.initForm();
  }

  loadInstruments() {
    this.transactionService.getInstruments().subscribe(
      (instruments) => {
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO);
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET);
      }
    )
  }

  onSubmit(): void {
    if (this.dynamicForm.valid ) {
      console.log(this.dynamicForm.value);
      const result: Transaction[] = [];
      this.rows.controls.forEach(element => {
        if(!element.get('ignore')?.value){
          const transactionDate = this.parseGermanDate(element.get('transactiondate')?.value);
          result.push(this.transactionService.createIncomeExpense(element.get('description')?.value, transactionDate, element.get('value')?.value, this.dynamicForm.get('giro')?.value, element.get('budget')?.value, undefined ));
        }
      });
      this.transactionService.saveTransactions(result);
    } else {
      console.log('Form is invalid');
    }
  }

  parseGermanDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  }

  parseGermanNumber(value: string): number | null {
    const parts = new Intl.NumberFormat('de-DE').formatToParts(12345.6);
    const groupSeparator = parts.find(part => part.type === 'group')?.value || '.';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || ',';

    // Replace group separators with empty string and decimal separators with a dot
    const normalizedValue = value.replace(new RegExp(`\\${groupSeparator}`, 'g'), '').replace(decimalSeparator, '.');

    const number = parseFloat(normalizedValue);

    return isNaN(number) ? null : number;
  }

  private initForm(): void {
    this.content.forEach(row => {
      const formGroup = this.fb.group({
        description: [row[2], Validators.required],
        transactiondate: [row[1], Validators.required],
        value: [this.parseGermanNumber(row[3]), Validators.required],
        budget: [null, Validators.required],
        ignore: [false],
      });
      this.rows.push(formGroup);
    });
  }


}
