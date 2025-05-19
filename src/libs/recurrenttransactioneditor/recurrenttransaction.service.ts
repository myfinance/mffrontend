import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { TransactionTypeEnum } from '../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { RecurrentFrequencyEnum, RecurrentTransaction } from '../shared/data-access-mfdata/model/recurrenttransaction';

@Injectable({
  providedIn: 'root'
})
export class RecurrenttransactionService {

  content: string[][] = [];

  selectedRecurrentTransaction: RecurrentTransaction | undefined
  public newRecurrentTransactionSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  saveRecurrentTransaction(transactionType: TransactionTypeEnum, description: string, nextTransactionDate: Date, value: number, accKey: string, budgetKey: string, trgAccKey: string, trgBudgetKey: string, insuranceKey: string, recurrentFrequency: RecurrentFrequencyEnum, recurrentTransactionId: string|undefined ) {
    const recurrenttransaction: RecurrentTransaction = new RecurrentTransaction(transactionType, description, nextTransactionDate, value, accKey, budgetKey, trgAccKey, trgBudgetKey, insuranceKey, recurrentFrequency); 
    if(recurrentTransactionId!==undefined){
      recurrenttransaction.recurrentTransactionId=recurrentTransactionId;
    }
    this.mfDataService.saveRecurrentTransaction(recurrenttransaction);
  }

  deleteTransaction() {
    if (this.selectedRecurrentTransaction!==undefined && this.selectedRecurrentTransaction.recurrentTransactionId!==undefined) {
      this.mfDataService.deleteRecurrentTransaction(this.selectedRecurrentTransaction.recurrentTransactionId);
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

  getIncomeBudgets(): Observable<Instrument[]> {
    return this.mfDataService.getIncomeBudgets();
  }

  setSelectedRecurrentTransaction(recurrenttransaction?:RecurrentTransaction) {
    this.selectedRecurrentTransaction = recurrenttransaction;
    this.newRecurrentTransactionSelectedSubject.next(true);
  }
  deSelectRecurrentTransaction() {
    this.selectedRecurrentTransaction = undefined;
    this.newRecurrentTransactionSelectedSubject.next(true);
  }
  getSelectedRecurrentTransaction() : RecurrentTransaction|undefined {
    return this.selectedRecurrentTransaction;
  }

  getInstrumentEventSubject() : Subject<unknown>{
    return this.mfDataService.getInstrumentEventSubject();
  }
  getRecurrentTransactionEventSubject() : Subject<unknown>{
    return this.mfDataService.getRecurrentTransactionEventSubject();
  }

  processRecurrentTransactions(){
    this.mfDataService.processRecurrentTransactions();
  }
}
