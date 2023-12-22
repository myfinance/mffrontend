import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Transaction } from '@mffrontend/shared/data-access-mfdata';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'mffrontend-transactionview',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './transactionview.component.html',
  styleUrls: ['./transactionview.component.scss'],
})
export class TransactionviewComponent {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['transactionDate', 'description', 'value'];
  selectedTransaction: Transaction | undefined;
  version = 'na';

  constructor(private transactionService: TransactionService) {
    this.transactionService.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadTransactions(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.transactionService.getTransactionEventSubject().subscribe(
      () => {
        this.loadTransactions();
      }
    )
    this.loadTransactions();
  }

  loadTransactions() {
    const startDate = new Date(2023,11,2);
    const endDate = new Date(Date.now());
    this.transactionService.getTransactions(startDate, endDate).subscribe(
      (transactions) => {
        this.transactions = transactions;
      }
    )
  }

  selectTransaction(transaction: Transaction) {
    this.selectedTransaction = transaction;
    this.transactionService.setSelectedTransaction(transaction);
  }
}
