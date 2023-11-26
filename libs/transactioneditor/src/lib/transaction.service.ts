import { Injectable } from '@angular/core';
import { Transaction, MfdataService, Trade } from '@mffrontend/shared/data-access-mfdata';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  selectedTransaction:Transaction | undefined
  public newTransactionSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  saveInstrument(desc: string) {
    const trades: Trade[] = [];
    const transaction: Transaction = {
      transactionType: 'INCOME',
      description: desc,
      transactiondate: new Date,
      cashflows: new Map<string, number>(),
      trades: trades
    }
    this.mfDataService.saveTransaction(transaction);
  }

  updateTransaction(desc: string) {
    if(this.selectedTransaction) {
      this.selectedTransaction.description = desc;
      this.mfDataService.saveTransaction(this.selectedTransaction);
    }
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.getConfigLoadedSubject();
  }
  getLoginSubject() : Subject<unknown>{
    return this.mfDataService.getLoginSubject();
  }

  getTransactions(): Observable<Transaction[]> {
    return this.mfDataService.getTransactions();
  }

  setSelectedTransaction(transaction:Transaction) {
    this.selectedTransaction = transaction;
    this.newTransactionSelectedSubject.next(true);
  }
}