import { Injectable } from '@angular/core';
import { Transaction, MfdataService, Trade, Instrument, TransactionTypeEnum } from '@mffrontend/shared/data-access-mfdata';
import { Observable, Subject } from 'rxjs';
import { TransactionObjectView } from './TransactionObjectView';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  selectedTransaction: TransactionObjectView | undefined
  public newTransactionSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  saveIncomeExpense(isExpense: boolean, desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined ) {
    let transactionType = TransactionTypeEnum.INCOME;
    let finalValue = value;
    if(value < 0) {
      finalValue = - value;
    }
    if(isExpense) {
      finalValue = - finalValue;
      transactionType = TransactionTypeEnum.EXPENSE;
    }
    const cashflows:Map<string, number> = new Map();
    cashflows.set(acc.businesskey, finalValue);
    cashflows.set(budget.businesskey, finalValue);
    this.saveTransaction(desc,transactionDate, transactionType, cashflows, [], transactionId);
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
    this.saveTransaction(desc, transactionDate, transactionType, cashflows, [], transactionId);
  }

  private saveTransaction(desc: string, transactionDate: Date, transactionType: TransactionTypeEnum, cashflows:Map<string, number>, trades: Trade[], transactionId: string|undefined ) {
    const transaction: Transaction = new Transaction(transactionType, desc, transactionDate, cashflows, trades); 
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
    return this.mfDataService.getLoginSubject();
  }

  getTransactions(startDate: Date, endDate: Date): Observable<Transaction[]> {
    return this.mfDataService.getTransactions(startDate, endDate);
  }

  getInstruments(): Observable<Instrument[]> {
    return this.mfDataService.getInstruments();
  }

  setSelectedTransaction(transaction:TransactionObjectView) {
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
}