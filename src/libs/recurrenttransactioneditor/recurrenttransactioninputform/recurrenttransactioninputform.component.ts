import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { TransactionTypeEnum } from '../../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { RecurrenttransactionService } from '../recurrenttransaction.service';
import { RecurrentFrequencyEnum } from '../../shared/data-access-mfdata/model/recurrenttransaction';

@Component({
  selector: 'mffrontend-recurrenttransactioninputform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, ButtonModule, CalendarModule, InputNumberModule],
  templateUrl: './recurrenttransactioninputform.component.html',
  styleUrl: './recurrenttransactioninputform.component.scss'
})
export class RecurrenttransactioninputformComponent  {
  transactionTypes: TransactionTypeEnum[] = [TransactionTypeEnum.EXPENSE, TransactionTypeEnum.INCOME, TransactionTypeEnum.BUDGETTRANSFER, TransactionTypeEnum.TRANSFER,  TransactionTypeEnum.LIFEINSURANCEEXPENSE];
  frequencies: RecurrentFrequencyEnum[] = [RecurrentFrequencyEnum.MONTHLY, RecurrentFrequencyEnum.QUARTERLY, RecurrentFrequencyEnum.YEARLY];
  giros: Instrument[] = [];
  budgets: Instrument[] = [];
  incomeBudgets: Instrument[] = [];
  lifeinsurences: Instrument[] = [];
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
    nextTransactionDate: new FormControl<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), {
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
    }),
    lifeinsurence: new FormControl<Instrument | undefined>(undefined, {
      nonNullable: false
    }),
    recurrentFrequency: new FormControl<string>(RecurrentFrequencyEnum.MONTHLY, {
      nonNullable: true,
      validators: Validators.required
    })

  });

  constructor(private service: RecurrenttransactionService) {
    this.service.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.service.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();

    this.service.newRecurrentTransactionSelectedSubject.subscribe(
      () => {
        this.setNewSelectedTransaction();
      }
    )
  }

  loadInstruments() {
    this.service.getInstruments().subscribe(
      (instruments) => {
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO
          || instrument.instrumentType === InstrumentTypeEnum.BUILDINGSAVINGACCOUNT
          || instrument.instrumentType === InstrumentTypeEnum.LOAN
          || instrument.instrumentType === InstrumentTypeEnum.MONEYATCALL
          || instrument.instrumentType === InstrumentTypeEnum.TIMEDEPOSIT
        )
          .sort((a, b) => a.description.localeCompare(b.description));
        this.budgets = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.BUDGET).sort((a, b) => a.description.localeCompare(b.description));
        this.lifeinsurences = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.LIFEINSURANCE).sort((a, b) => a.description.localeCompare(b.description));
      }
    )
    this.service.getIncomeBudgets().subscribe(
      (budgtes) => {
        this.incomeBudgets = budgtes;
      }
    )
  }

  setNewSelectedTransaction(){
    const transaction = this.service.getSelectedRecurrentTransaction();
    if(transaction!==undefined) {
      this.transactionSelected = true;
      this.transactionForm.controls['description'].setValue(transaction.description);
      this.transactionForm.controls['transactionType'].setValue(transaction.transactionType);
      this.transactionForm.controls['nextTransactionDate'].setValue(new Date(transaction.nextTransactionDate));
      this.transactionForm.controls['value'].setValue(transaction.value);
      this.transactionForm.controls['srcAcc'].setValue(this.giros.filter(instrument => instrument.businesskey === transaction.accKey)[0]);
      this.transactionForm.controls['trgAcc'].setValue(this.giros.filter(instrument => instrument.businesskey === transaction.trgAccKey)[0]);
      this.transactionForm.controls['trgBudget'].setValue(this.budgets.filter(instrument => instrument.businesskey ===transaction.trgBudgetKey)[0]);
      this.transactionForm.controls['recurrentFrequency'].setValue(transaction.recurrentFrequency);
      this.transactionForm.controls['lifeinsurence'].setValue(this.lifeinsurences.filter(instrument => instrument.businesskey ===transaction.insuranceKey)[0]);
      if(transaction.transactionType == TransactionTypeEnum.INCOME || transaction.transactionType == TransactionTypeEnum.BUDGETTRANSFER) {
        this.transactionForm.controls['srcBudget'].setValue(this.incomeBudgets.filter(instrument => instrument.businesskey ===transaction.budgetKey)[0]);
      } else {
        this.transactionForm.controls['srcBudget'].setValue(this.budgets.filter(instrument => instrument.businesskey ===transaction.budgetKey)[0]);
      }
    } else {
      this.transactionSelected = false;
      this.transactionForm.reset();
    }

  }

  saveTransaction(transactionId: string|undefined){
    console.log(this.transactionForm);

    if (this.transactionForm.value.description != null 
      && this.transactionForm.value.transactionType != null 
      && this.transactionForm.value.nextTransactionDate != null 
      && this.transactionForm.value.value != null
      && this.transactionForm.value.recurrentFrequency != null) {
        let recurentFrequency = RecurrentFrequencyEnum.MONTHLY;
        switch (this.transactionForm.value.recurrentFrequency) {
          case RecurrentFrequencyEnum.MONTHLY: {
            recurentFrequency = RecurrentFrequencyEnum.MONTHLY;
            break;
          }
          case RecurrentFrequencyEnum.QUARTERLY: {
            recurentFrequency = RecurrentFrequencyEnum.QUARTERLY;
            break;
          }
          case RecurrentFrequencyEnum.YEARLY: {
            recurentFrequency = RecurrentFrequencyEnum.YEARLY;
            break;
          }
          default: {
            return;
          }
        }
      switch (this.transactionForm.value.transactionType) {
        case TransactionTypeEnum.EXPENSE: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.service.saveRecurrentTransaction(TransactionTypeEnum.EXPENSE, this.transactionForm.value.description, this.transactionForm.value.nextTransactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc.businesskey, this.transactionForm.value.srcBudget.businesskey, "","","",recurentFrequency, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.INCOME: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null) {
            this.service.saveRecurrentTransaction(TransactionTypeEnum.INCOME, this.transactionForm.value.description, this.transactionForm.value.nextTransactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc.businesskey, this.transactionForm.value.srcBudget.businesskey, "","","", recurentFrequency, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.TRANSFER: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.trgAcc!=null) {
            this.service.saveRecurrentTransaction(TransactionTypeEnum.TRANSFER, this.transactionForm.value.description, this.transactionForm.value.nextTransactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc.businesskey, "", this.transactionForm.value.trgAcc.businesskey,"","", recurentFrequency, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.BUDGETTRANSFER: {
          if(this.transactionForm.value.srcBudget!=null && this.transactionForm.value.trgBudget!=null) {
            this.service.saveRecurrentTransaction(TransactionTypeEnum.BUDGETTRANSFER, this.transactionForm.value.description, this.transactionForm.value.nextTransactionDate, this.transactionForm.value.value, "", this.transactionForm.value.srcBudget.businesskey, "", this.transactionForm.value.trgBudget.businesskey, "", recurentFrequency, transactionId);
          }
          break;
        }
        case TransactionTypeEnum.LIFEINSURANCEEXPENSE: {
          if(this.transactionForm.value.srcAcc!=null && this.transactionForm.value.srcBudget!=null && this.transactionForm.value.lifeinsurence!=null) {
            this.service.saveRecurrentTransaction(TransactionTypeEnum.LIFEINSURANCEEXPENSE, this.transactionForm.value.description, this.transactionForm.value.nextTransactionDate, this.transactionForm.value.value, this.transactionForm.value.srcAcc.businesskey, this.transactionForm.value.srcBudget.businesskey, "","",this.transactionForm.value.lifeinsurence.businesskey,recurentFrequency, transactionId);
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
      transactionId = this.service.getSelectedRecurrentTransaction()?.recurrentTransactionId;
    }
    this.saveTransaction(transactionId);
  }

  deleteTransaction(){
    this.service.deleteTransaction();
  }
}

