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
  transactionTypes: TransactionTypeEnum[] = [TransactionTypeEnum.EXPENSE, TransactionTypeEnum.INCOME, TransactionTypeEnum.BUDGETTRANSFER, TransactionTypeEnum.TRANSFER,TransactionTypeEnum.BUY, TransactionTypeEnum.SELL, TransactionTypeEnum.DEPOTCASHFLOW, TransactionTypeEnum.INTERESTS];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];
  depots: Instrument[] = [];
  securities: Instrument[] = [];
  accounts: Instrument[] = [];//for interests
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
    amount: new FormControl<number>(0, {
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
    }),
    depot: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    security: new FormControl<Instrument | undefined>(undefined, {
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
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO).sort((a, b) => a.description.localeCompare(b.description));
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET).sort((a, b) => a.description.localeCompare(b.description));
        this.depots = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.DEPOT).sort((a, b) => a.description.localeCompare(b.description));
        this.securities = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.EQUITY || instrument.instrumentType === InstrumentTypeEnum.BOND || instrument.instrumentType === InstrumentTypeEnum.ETF|| instrument.instrumentType === InstrumentTypeEnum.FONDS).sort((a, b) => a.description.localeCompare(b.description));
        this.accounts = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.DEPOT || instrument.instrumentType === InstrumentTypeEnum.MONEYATCALL || instrument.instrumentType === InstrumentTypeEnum.TIMEDEPOSIT|| instrument.instrumentType === InstrumentTypeEnum.LOAN|| instrument.instrumentType === InstrumentTypeEnum.BUILDINGSAVINGACCOUNT).sort((a, b) => a.description.localeCompare(b.description));
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
      this.transactionForm.controls['amount'].setValue(transaction.amount);
      this.transactionForm.controls['srcAcc'].setValue(this.giros.filter(instrument => instrument.businesskey ===transaction.accKey)[0]);
      this.transactionForm.controls['srcBudget'].setValue(this.budgets.filter(instrument => instrument.businesskey ===transaction.budgetKey)[0]);
      this.transactionForm.controls['trgAcc'].setValue(this.giros.filter(instrument => instrument.businesskey ===transaction.trgAccKey)[0]);
      this.transactionForm.controls['trgBudget'].setValue(this.budgets.filter(instrument => instrument.businesskey ===transaction.trgBudgetKey)[0]);
      this.transactionForm.controls['depot'].setValue(this.depots.filter(instrument => instrument.businesskey ===transaction.depotBusinessKey)[0]);
      this.transactionForm.controls['security'].setValue(this.securities.filter(instrument => instrument.businesskey ===transaction.securityBusinessKey)[0]);
    } else {
      this.transactionSelected = false;
      this.transactionForm.reset();
    }

  }

  saveTransaction(transactionId: string|undefined){
    console.log(this.transactionForm);

    if (this.transactionForm.value.description != null && this.transactionForm.value.transactionType != null && this.transactionForm.value.transactionDate != null && this.transactionForm.value.value != null) {
      switch (this.transactionForm.value.transactionType) {
        case TransactionTypeEnum.EXPENSE: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.transactionService.saveExpense(this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.INCOME: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.transactionService.saveIncome(this.transactionForm.value.description, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.BUY: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null && this.transactionForm.value.depot!=null && this.transactionForm.value.security!=null && this.transactionForm.value.amount!=null) {
            const desc = 'buy ' + this.transactionForm.value.security.description;
            this.transactionService.saveBuy(desc, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget, transactionId, this.transactionForm.value.depot.businesskey, this.transactionForm.value.security.businesskey, this.transactionForm.value.amount);
          }
          break;
        }
        case TransactionTypeEnum.SELL: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null && this.transactionForm.value.depot!=null && this.transactionForm.value.security!=null && this.transactionForm.value.amount!=null) {
            const desc = 'sell ' + this.transactionForm.value.security.description;
            this.transactionService.saveSell(desc, this.transactionForm.value.transactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc, this.transactionForm.value.srcBudget, transactionId, this.transactionForm.value.depot.businesskey, this.transactionForm.value.security.businesskey, this.transactionForm.value.amount);
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
      transactionId = this.transactionService.getSelectedTransaction()?.transactionId;
    }
    this.saveTransaction(transactionId);
  }

  deleteTransaction(){
    this.transactionService.deleteTransaction();
  }
}
