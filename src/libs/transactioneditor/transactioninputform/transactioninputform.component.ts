import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { TransactionTypeEnum } from '../../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'mffrontend-transactioninputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, ButtonModule, CalendarModule, InputNumberModule],
  templateUrl: './transactioninputform.component.html',
  styleUrls: ['./transactioninputform.component.scss'],
})
export class TransactioninputformComponent {
  transactionTypes: TransactionTypeEnum[] = [TransactionTypeEnum.EXPENSE, TransactionTypeEnum.INCOME, TransactionTypeEnum.BUDGETTRANSFER, TransactionTypeEnum.TRANSFER];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];
  transactionSelected = false;
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
    srcAcc: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    srcBudget: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    trgAcc: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    trgBudget: new FormControl<Instrument | undefined>(undefined, {
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

    this.transactionService.newTransactionSelectedSubject.subscribe(
      () => {
        this.setNewSelectedTransaction();
      }
    )
  }

  loadInstruments() {
    this.transactionService.getInstruments().subscribe(
      (instruments) => {
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO);
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET);
      }
    )
  }

  setNewSelectedTransaction(){
    const transaction = this.transactionService.getSelectedTransaction();
    if(transaction!==undefined) {
      this.transactionSelected = true;
      this.transactionForm.controls['description'].setValue(transaction.description);
      this.transactionForm.controls['transactionType'].setValue(transaction.transactionType);
      this.transactionForm.controls['transactionDate'].setValue(transaction.transactiondate);
      this.transactionForm.controls['value'].setValue(transaction.value);
      this.transactionForm.controls['srcAcc'].setValue(this.giros.filter(instrument => instrument.businesskey ===transaction.instrument1?.businesskey)[0]);
      this.transactionForm.controls['srcBudget'].setValue(this.budgets.filter(instrument => instrument.businesskey ===transaction.instrument2?.businesskey)[0]);
    }

  }

  saveTransaction(transactionId: string|undefined){
    console.log(this.transactionForm);

    if (this.transactionForm.value.description != null && this.transactionForm.value.transactionType != null && this.transactionForm.value.transactionDate != null && this.transactionForm.value.value != null) {
      switch (this.transactionForm.value.transactionType) {
        case TransactionTypeEnum.EXPENSE: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.transactionService.saveIncomeExpense(true, this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.INCOME: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.transactionService.saveIncomeExpense(false, this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.TRANSFER: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.trgAcc!=null) {
            this.transactionService.saveTransfer(this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.trgAcc, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.BUDGETTRANSFER: {
          if(this.transactionForm.value.srcBudget!=null && this.transactionForm.value.trgBudget!=null) {
            this.transactionService.saveBudgetTransfer(this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcBudget, this.transactionForm.value.trgBudget, transactionId);
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

  insertTransaction() {
    this.saveTransaction(undefined);
  }

  updateTransaction(){
    let transactionId = undefined;
    if(this.transactionSelected){
      transactionId = this.transactionService.getSelectedTransaction()?.id;
    }
    this.saveTransaction(transactionId);
  }

  deleteTransaction(){
    this.transactionService.deleteTransaction();
  }
}
