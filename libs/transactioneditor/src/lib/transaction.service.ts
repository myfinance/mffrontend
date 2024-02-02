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

  saveIncomeExpense(isExpense: boolean, desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument) {
    let transactionType = TransactionTypeEnum.INCOME;
    let finalValue = value;
    if(isExpense) {
      finalValue = - value;
      transactionType = TransactionTypeEnum.EXPENSE;
    }
    const cashflows:Map<string, number> = new Map();
    cashflows.set(acc.businesskey, finalValue);
    cashflows.set(budget.businesskey, finalValue);
    this.saveTransaction(desc,transactionDate, transactionType, cashflows, []);
  }

  saveTransfer(desc: string, transactionDate: Date, value: number, srcInstrument: Instrument, trgInstrument: Instrument) {
    this.saveInstrumentTransfer(desc, transactionDate, value, srcInstrument, trgInstrument, TransactionTypeEnum.TRANSFER);
  }

  saveBudgetTransfer(desc: string, transactionDate: Date, value: number, srcInstrument: Instrument, trgInstrument: Instrument) {
    this.saveInstrumentTransfer(desc, transactionDate, value, srcInstrument, trgInstrument, TransactionTypeEnum.BUDGETTRANSFER);
  }

  private saveInstrumentTransfer(desc: string, transactionDate: Date, value: number, src: Instrument, trg: Instrument, transactionType: TransactionTypeEnum) {
    const cashflows:Map<string, number> = new Map();
    cashflows.set(src.businesskey, value);
    cashflows.set(trg.businesskey, -value);
    this.saveTransaction(desc, transactionDate, transactionType, cashflows, []);
  }

  private saveTransaction(desc: string, transactionDate: Date, transactionType: TransactionTypeEnum, cashflows:Map<string, number>, trades: Trade[] ) {
    const transaction: Transaction = new Transaction(transactionType, desc, transactionDate, cashflows, trades); 
    this.mfDataService.saveTransaction(transaction);
  }

  updateTransaction(desc: string) {
    if(this.selectedTransaction) {
      this.selectedTransaction.description = desc;
      //this.mfDataService.saveTransaction(this.selectedTransaction);
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