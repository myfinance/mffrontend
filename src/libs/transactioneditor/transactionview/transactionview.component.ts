import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { TransactionObjectView } from '../TransactionObjectView';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';




@Component({
  selector: 'mffrontend-transactionview',
  standalone: true,
  imports: [CommonModule, SidebarModule, CalendarModule, DropdownModule, FormsModule, DividerModule, TableModule],
  templateUrl: './transactionview.component.html',
  styleUrls: ['./transactionview.component.scss'],
})
export class TransactionviewComponent{
  sidebarVisible = false;
  rangeDates: Date[] = [new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()), new Date(Date.now())];
  instruments: Instrument[] = [];
  transactionViewObjects: TransactionObjectView[] = [];
  filteredTransactionViewObjects: TransactionObjectView[] = [];
  instrumentFilter: Instrument | undefined;

  displayedColumns: string[] = ['transactiondate', 'description', 'transactionType', 'value', 'instrument1', 'instrument2'];
  selectedTransaction: TransactionObjectView | undefined;
  version = 'na';

  constructor(private transactionService: TransactionService) {
    this.transactionService.getConfigLoadedSubject().subscribe({
      next:
        () => {
          this.loadInstruments();
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

  }

  loadTransactions() {

    this.transactionService.getTransactions(this.rangeDates[0], this.rangeDates[1]).subscribe(
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
        this.loadTransactions();
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
      if (transaction.transactionId) {
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

  }

  clearFilter() {
    this.instrumentFilter = undefined;
    this.filter();
  }

  onInstrumentChange(event: any) {
    this.filter();
  }

  handleRangeDateChanged(date: Date[] | any) {
    this.rangeDates[0] = date[0];
    this.rangeDates[1] = date[1];
    this.loadTransactions();
  }
}
