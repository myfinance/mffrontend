import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TransactionObjectView } from './TransactionObjectView';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { Transaction, TransactionTypeEnum } from '../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  content: string[][] = [];

  selectedTransaction: TransactionObjectView | undefined
  public newTransactionSelectedSubject: Subject<unknown> = new Subject<unknown>()
  public newFileSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  createIncomeExpense(desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined ):Transaction {
    let transactionType = TransactionTypeEnum.INCOME;
    if(value < 0) {
      transactionType = TransactionTypeEnum.EXPENSE;
    }
    else {
      transactionType = TransactionTypeEnum.INCOME;
    }
    const cashflows:Map<string, number> = new Map();
    cashflows.set(acc.businesskey, value);
    cashflows.set(budget.businesskey, value);
    const transaction: Transaction = new Transaction(transactionType, desc, transactionDate, cashflows, []); 
    if(transactionId!==undefined){
      transaction.transactionId=transactionId;
    }
    return transaction;
  }

  saveIncomeExpense(isExpense: boolean, desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined ) {
    let finalValue = value;
    if(value < 0) {
      finalValue = - value;
    }
    if(isExpense) {
      finalValue = - finalValue;
    }
    this.mfDataService.saveTransaction(this.createIncomeExpense(desc, transactionDate, finalValue, acc, budget, transactionId));
  }

  saveTransfer(desc: string, transactionDate: Date, value: number, srcInstrument: Instrument, trgInstrument: Instrument, transactionId: string|undefined ) {
    this.saveInstrumentTransfer(desc, transactionDate, value, srcInstrument, trgInstrument, TransactionTypeEnum.TRANSFER, transactionId);
  }

  saveBudgetTransfer(desc: string, transactionDate: Date, value: number, srcInstrument: Instrument, trgInstrument: Instrument, transactionId: string|undefined ) {
    this.saveInstrumentTransfer(desc, transactionDate, value, srcInstrument, trgInstrument, TransactionTypeEnum.BUDGETTRANSFER, transactionId);
  }

  private saveInstrumentTransfer(desc: string, transactionDate: Date, value: number, src: Instrument, trg: Instrument, transactionType: TransactionTypeEnum, transactionId: string|undefined ) {
    const cashflows:Map<string, number> = new Map();
    cashflows.set(src.businesskey, value);
    cashflows.set(trg.businesskey, -value);
    const transaction: Transaction = new Transaction(transactionType, desc, transactionDate, cashflows, []); 
    if(transactionId!==undefined){
      transaction.transactionId=transactionId;
    }
    this.mfDataService.saveTransaction(transaction);
  }

  deleteTransaction() {
    if (this.selectedTransaction!==undefined) {
      this.mfDataService.deleteTransaction(this.selectedTransaction.id);
    }
    
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.getConfigLoadedSubject();
  }
  getLoginSubject() : Subject<unknown>{
    return this.mfDataService.loginEventSubject;
  }

  getTransactions(startDate: Date, endDate: Date): Observable<Transaction[]> {
    return this.mfDataService.getTransactions(startDate, endDate);
  }

  getInstruments(): Observable<Instrument[]> {
    return this.mfDataService.getInstruments();
  }

  setSelectedTransaction(transaction?:TransactionObjectView) {
    this.selectedTransaction = transaction;
    this.newTransactionSelectedSubject.next(true);
  }
  getSelectedTransaction() : TransactionObjectView|undefined {
    return this.selectedTransaction;
  }

  getInstrumentEventSubject() : Subject<unknown>{
    return this.mfDataService.getInstrumentEventSubject();
  }
  getTransactionEventSubject() : Subject<unknown>{
    return this.mfDataService.getTransactionEventSubject();
  }

  setMassloadContent(content: string[][]) {
    this.content = content;
    this.newFileSelectedSubject.next(true);
  }

  getMassloadContent():string[][]{
    return this.content;
  }

  saveTransactions(data: Transaction[] ){
    this.mfDataService.saveTransactions(data);
  }
}