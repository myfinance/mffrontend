import { Injectable } from '@angular/core';
import { RecurrentTransactionObjectView } from './recurrenttransactionobjectview';
import { Observable, Subject } from 'rxjs';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { Transaction, TransactionTypeEnum } from '../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { TransactionObjectView } from '../transactioneditor/TransactionObjectView';
import { RecurrentFrequencyEnum, RecurrentTransaction } from '../shared/data-access-mfdata/model/recurrenttransaction';

@Injectable({
  providedIn: 'root'
})
export class RecurrenttransactionService {

  content: string[][] = [];

  selectedRecurrentTransaction: RecurrentTransactionObjectView | undefined
  public newRecurrentTransactionSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  saveRecurrentTransaction(transactionType: TransactionTypeEnum, description: string, nextTransactionDate: Date, value: number, firstInstrumentBusinessKey: string, secondInstrumentBusinessKey: string, recurrentFrequency: RecurrentFrequencyEnum, recurrentTransactionId: string|undefined ) {
    const recurrenttransaction: RecurrentTransaction = new RecurrentTransaction(transactionType, description, nextTransactionDate, value, firstInstrumentBusinessKey, secondInstrumentBusinessKey, recurrentFrequency); 
    if(recurrentTransactionId!==undefined){
      recurrenttransaction.recurrentTransactionId=recurrentTransactionId;
    }
    this.mfDataService.saveRecurrentTransaction(recurrenttransaction);
  }

  deleteTransaction() {
    if (this.selectedRecurrentTransaction!==undefined) {
      this.mfDataService.deleteRecurrentTransaction(this.selectedRecurrentTransaction.id);
    }
    
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.getConfigLoadedSubject();
  }
  getLoginSubject() : Subject<unknown>{
    return this.mfDataService.loginEventSubject;
  }

  getRecurrentTransactions(): Observable<RecurrentTransaction[]> {
    return this.mfDataService.getRecurrentTransactions();
  }

  getInstruments(): Observable<Instrument[]> {
    return this.mfDataService.getInstruments();
  }

  setSelectedRecurrentTransaction(recurrenttransaction?:RecurrentTransactionObjectView) {
    this.selectedRecurrentTransaction = recurrenttransaction;
    this.newRecurrentTransactionSelectedSubject.next(true);
  }
  getSelectedRecurrentTransaction() : RecurrentTransactionObjectView|undefined {
    return this.selectedRecurrentTransaction;
  }

  getInstrumentEventSubject() : Subject<unknown>{
    return this.mfDataService.getInstrumentEventSubject();
  }
  getRecurrentTransactionEventSubject() : Subject<unknown>{
    return this.mfDataService.getRecurrentTransactionEventSubject();
  }
}
