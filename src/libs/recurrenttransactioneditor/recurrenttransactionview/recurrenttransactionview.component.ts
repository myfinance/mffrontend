import { Component } from '@angular/core';
import { RecurrenttransactionService } from '../recurrenttransaction.service';
import { RecurrentTransaction } from '../../shared/data-access-mfdata/model/recurrenttransaction';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'mffrontend-recurrenttransactionview',
  standalone: true,
  imports: [CommonModule, SidebarModule, CalendarModule, DropdownModule, FormsModule, DividerModule, TableModule],
  templateUrl: './recurrenttransactionview.component.html',
  styleUrl: './recurrenttransactionview.component.scss'
})
export class RecurrenttransactionviewComponent {
  recurrentTransactionViewObjects: RecurrentTransaction[] = [];
  sidebarVisible = false;
  selectedTransaction: RecurrentTransaction | undefined;
  instruments: Instrument[] = [];
  instrumentFilter: Instrument | undefined;
  filteredTransactionViewObjects: RecurrentTransaction[] = [];

  constructor(private service: RecurrenttransactionService) {
    this.service.getConfigLoadedSubject().subscribe({
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
    this.service.getRecurrentTransactionEventSubject().subscribe(
      () => {
        this.loadTransactions();
      }
    )
    this.service.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();

  }

  loadInstruments() {
    this.service.getInstruments().subscribe(
      (instruments) => {
        this.instruments = instruments.sort((a, b) => a.description.localeCompare(b.description));
        this.loadTransactions();
      }
    )
  }

  loadTransactions() {

    this.service.getRecurrentTransactions().subscribe(
      (transactions) => {
        this.recurrentTransactionViewObjects = transactions;
        this.filter();
      }
    )
  }


  onRowSelect(event: any) {
    if (this.selectedTransaction != null) {
      this.service.setSelectedRecurrentTransaction(this.selectedTransaction);
    }

  }

  onRowUnselect(event: any) {
    this.service.deSelectRecurrentTransaction();
  }

  filter() {
    if(this.instrumentFilter){
      this.filteredTransactionViewObjects = this.recurrentTransactionViewObjects.filter(transaction => transaction.accKey === this.instrumentFilter?.businesskey
        || transaction.budgetKey === this.instrumentFilter?.businesskey
        || transaction.trgBudgetKey === this.instrumentFilter?.businesskey
        || transaction.trgAccKey === this.instrumentFilter?.businesskey);
    }
    else {
      this.filteredTransactionViewObjects = this.recurrentTransactionViewObjects;
    }
  }

  clearFilter() {
    this.instrumentFilter = undefined;
    this.filter();
  }

  processRecurrentTransactions() {
    this.service.processRecurrentTransactions();
  }

  onInstrumentChange(event: any) {
    this.filter();
  }

}