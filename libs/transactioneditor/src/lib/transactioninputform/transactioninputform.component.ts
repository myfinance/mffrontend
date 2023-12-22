import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Instrument, InstrumentTypeEnum, TransactionTypeEnum } from '@mffrontend/shared/data-access-mfdata';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'mffrontend-transactioninputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: './transactioninputform.component.html',
  styleUrls: ['./transactioninputform.component.scss'],
})
export class TransactioninputformComponent {
  transactionTypes: TransactionTypeEnum[] = [TransactionTypeEnum.EXPENSE, TransactionTypeEnum.INCOME];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];
  transactionForm = new FormGroup({

    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    transactionType: new FormControl<string>(TransactionTypeEnum.EXPENSE, {
      nonNullable: true,
      validators: Validators.required
    }),
    transactionDate: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), {
      nonNullable: true,
      validators: Validators.required
    }),
    value: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required
    }),
    srcAcc: new FormControl<Instrument | null>(null, {
      nonNullable: false
    }),
    srcBudget: new FormControl<Instrument | null>(null, {
      nonNullable: false
    })

  });

  constructor(private transactionService: TransactionService) {
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

  loadInstruments() {
    this.transactionService.getInstruments().subscribe(
      (instruments) => {
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO);
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET);
      }
    )
  }

  onSubmit() {
    console.log(this.transactionForm);
    if (this.transactionForm.value.description != null && this.transactionForm.value.transactionType != null && this.transactionForm.value.transactionDate != null && this.transactionForm.value.value != null) {
      switch (this.transactionForm.value.transactionType) {
        case TransactionTypeEnum.EXPENSE: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.transactionService.saveIncomeExpense(true, this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget);
          }
          break;
        }
        case TransactionTypeEnum.INCOME: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.transactionService.saveIncomeExpense(false, this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget);
          }
          break;
        }
        default: {
          //statements; 
          break;
        }
      }
    }
  }
}
