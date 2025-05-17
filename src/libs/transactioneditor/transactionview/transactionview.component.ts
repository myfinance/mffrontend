import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';



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
  transactionViewObjects: Transaction[] = [];
  filteredTransactionViewObjects: Transaction[] = [];
  instrumentFilter: Instrument | undefined;

  selectedTransaction: Transaction | undefined;
  version = 'na';

  constructor(private transactionService: TransactionService) {
    registerLocaleData(localeDe);
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
    this.transactionService.getTenantEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
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
        this.transactionViewObjects = transactions;
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

  filter() {
    if(this.instrumentFilter){
      this.filteredTransactionViewObjects = this.transactionViewObjects.filter(transaction => transaction.accKey === this.instrumentFilter?.businesskey
        || transaction.budgetKey === this.instrumentFilter?.businesskey
        || transaction.trgBudgetKey === this.instrumentFilter?.businesskey
        || transaction.trgAccKey === this.instrumentFilter?.businesskey);
    }
    else {
      this.filteredTransactionViewObjects = this.transactionViewObjects;
    }
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

  onRowSelect(event: any) {
    if(this.selectedTransaction!=null){
      this.transactionService.setSelectedTransaction(this.selectedTransaction);
    }
    
}

  onRowUnselect(event: any) {
    this.transactionService.deSelectTransaction();
  }
}
