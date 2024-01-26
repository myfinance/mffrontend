import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Instrument, Transaction, TransactionTypeEnum } from '@mffrontend/shared/data-access-mfdata';
import { TransactionService } from '../transaction.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface TransactionObjectView { 
  id: string;
  transactionType: TransactionTypeEnum;
  description: string;
  transactiondate: Date;
  instrument1: Instrument | undefined;
  instrument2: Instrument | undefined;
  instrument3: Instrument | undefined;
  value: number;
}


@Component({
  selector: 'mffrontend-transactionview',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDatepickerModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDividerModule],
  templateUrl: './transactionview.component.html',
  styleUrls: ['./transactionview.component.scss'],
})
export class TransactionviewComponent {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['transactionDate', 'description', 'TransactionType', 'value', 'instrument1', 'instrument2'];
  selectedTransaction: TransactionObjectView | undefined;
  version = 'na';
  instruments: Instrument[] = [];
  transactionViewObjects: TransactionObjectView[] = [];
  range = new FormGroup({
    start: new FormControl<Date>(new Date(2023,11,2)),
    end: new FormControl<Date>(new Date(Date.now()))
  });

  constructor(private transactionService: TransactionService) {
    this.transactionService.getConfigLoadedSubject().subscribe({
      next:
        () => {
          this.loadInstruments();
          this.loadTransactions();
        },
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
    this.transactionService.getTransactionEventSubject().subscribe(
      () => {
        this.loadTransactions();
      }
    )
    this.loadTransactions();
  }

  loadTransactions() {
    let startDate = new Date(Date.now());
    startDate.setMonth(startDate.getMonth() -1);
    let endDate = new Date(Date.now());
    if(this.range.value.start!== undefined && this.range.value.end!== undefined && this.range.value.start!== null && this.range.value.end!== null) {
      startDate = this.range.value.start;
      endDate = this.range.value.end;
    }
    console.info('startdate:'+ startDate.toString());
    console.info('enddate:'+ endDate.toString());
    this.transactionService.getTransactions(startDate, endDate).subscribe(
      (transactions) => {
        this.transactions = transactions;
        this.transactionViewObjects = this.convertTransactions(this.transactions);
      }
    )
  }

  loadInstruments() {
    this.transactionService.getInstruments().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
  }

  convertTransactions(transactions: Transaction[]): TransactionObjectView[] {
    const transactionViewObjects: TransactionObjectView[] = [];
    transactions.forEach((transaction) => {
      const transactionViewObject: TransactionObjectView = {
        id: '',
        transactionType: transaction.transactionType,
        description: transaction.description,
        transactiondate: transaction.transactiondate,
        value: 0.0,
        instrument1: undefined,
        instrument2: undefined,
        instrument3: undefined
      };
      if(transaction.transactionId) {
        transactionViewObject.id = transaction.transactionId;
      }
      
      const keys: string[] = Object.keys(transaction.cashflows);
      const key1 = keys[0];
      const key2 = keys[1];
      transactionViewObject.instrument1 = this.instruments.filter(instrument => instrument.businesskey === key1)[0];
      transactionViewObject.instrument2 = this.instruments.filter(instrument => instrument.businesskey === key2)[0];
      const value = Object.values(transaction.cashflows)[0];
      if (value) {
        transactionViewObject.value = value;
      }
      transactionViewObjects.push(transactionViewObject);
    })

    return transactionViewObjects;
  }

  selectTransaction(transaction: TransactionObjectView) {
    this.selectedTransaction = transaction;
    this.transactionService.setSelectedTransaction(this.transactions.filter(t => t.transactionId === transaction.id)[0]);
  }
}
