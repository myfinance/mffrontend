import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Instrument, Transaction} from '@mffrontend/shared/data-access-mfdata';
import { TransactionService } from '../transaction.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TransactionObjectView } from '../TransactionObjectView';
import { MatSort, MatSortModule } from '@angular/material/sort';




@Component({
  selector: 'mffrontend-transactionview',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDatepickerModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDividerModule, MatSelectModule, MatSortModule],
  templateUrl: './transactionview.component.html',
  styleUrls: ['./transactionview.component.scss'],
})
export class TransactionviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['transactiondate', 'description', 'transactionType', 'value', 'instrument1', 'instrument2'];
  selectedTransaction: TransactionObjectView | undefined;
  version = 'na';
  instruments: Instrument[] = [];
  transactionViewObjects: TransactionObjectView[] = [];
  filteredTransactionViewObjects: TransactionObjectView[] = [];
  range = new FormGroup({
    start: new FormControl<Date>(new Date(2023,11,2)),
    end: new FormControl<Date>(new Date(Date.now())),
    instrument: new FormControl<Instrument | null>(null, {
      nonNullable: false
    })
  });
  instrumentFilter: Instrument|undefined;
  dataSource = new MatTableDataSource(this.filteredTransactionViewObjects);
  @ViewChild(MatSort) sort = new MatSort();

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
    this.transactionService.getTransactions(startDate, endDate).subscribe(
      (transactions) => {
        this.transactionViewObjects = this.convertTransactions(transactions);
        this.filter();
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
    this.transactionService.setSelectedTransaction(transaction);
  }

  filter() {
    this.filteredTransactionViewObjects = this.transactionViewObjects.filter(transaction => transaction.instrument1?.businesskey === this.instrumentFilter?.businesskey 
                                                    || transaction.instrument2?.businesskey === this.instrumentFilter?.businesskey
                                                    || transaction.instrument3?.businesskey === this.instrumentFilter?.businesskey);
    this.dataSource = new MatTableDataSource(this.filteredTransactionViewObjects);   
    this.dataSource.sort = this.sort;                                             

  } 

  clearFilter(){
    this.instrumentFilter = undefined;
    this.filter();
  }

  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
        
  }
}
