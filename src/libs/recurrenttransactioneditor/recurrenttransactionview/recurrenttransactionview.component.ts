import { Component } from '@angular/core';
import { RecurrentTransactionObjectView } from '../recurrenttransactionobjectview';
import { RecurrenttransactionService } from '../recurrenttransaction.service';
import { RecurrentTransaction } from '../../shared/data-access-mfdata/model/recurrenttransaction';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mffrontend-recurrenttransactionview',
  standalone: true,
  imports: [CommonModule, CalendarModule, DropdownModule, FormsModule, DividerModule, TableModule],
  templateUrl: './recurrenttransactionview.component.html',
  styleUrl: './recurrenttransactionview.component.scss'
})
export class RecurrenttransactionviewComponent {
  recurrentTransactionViewObjects: RecurrentTransactionObjectView[] = [];

  displayedColumns: string[] = ['transactiondate', 'description', 'transactionType', 'value', 'instrument1', 'instrument2'];
  selectedTransaction: RecurrentTransactionObjectView | undefined;
  instruments: Instrument[] = [];

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
        this.instruments = instruments;
        this.loadTransactions();
      }
    )
  }

  loadTransactions() {

    this.service.getRecurrentTransactions().subscribe(
      (transactions) => {
        this.recurrentTransactionViewObjects = this.convertTransactions(transactions);
      }
    )
  }

  convertTransactions(recurrentTransactions: RecurrentTransaction[]): RecurrentTransactionObjectView[] {
    const recurrentTransactionObjectViews: RecurrentTransactionObjectView[] = [];
    recurrentTransactions.forEach((recurrentTransaction) => {
      const recurrentTransactionObjectView: RecurrentTransactionObjectView = {
        id: '',
        transactionType: recurrentTransaction.transactionType,
        description: recurrentTransaction.description,
        nexttransactiondate: recurrentTransaction.nextTransactionDate,
        value: recurrentTransaction.value,
        instrument1: undefined,
        instrument2: undefined,
        recurrentFrequency: recurrentTransaction.recurrentFrequency
      };
      if (recurrentTransaction.recurrentTransactionId) {
        recurrentTransactionObjectView.id = recurrentTransaction.recurrentTransactionId;
      }
      recurrentTransactionObjectView.instrument1 = this.instruments.filter(instrument => instrument.businesskey === recurrentTransaction.firstInstrumentBusinessKey)[0];
      recurrentTransactionObjectView.instrument2 = this.instruments.filter(instrument => instrument.businesskey === recurrentTransaction.secondInstrumentBusinessKey)[0];

      recurrentTransactionObjectViews.push(recurrentTransactionObjectView);
    })

    return recurrentTransactionObjectViews;
  }

  selectTransaction(transaction: RecurrentTransactionObjectView) {
    this.selectedTransaction = transaction;
    this.service.setSelectedRecurrentTransaction(transaction);
  }

}