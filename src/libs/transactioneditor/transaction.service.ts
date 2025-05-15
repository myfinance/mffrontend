import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { Transaction, TransactionTypeEnum } from '../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  content: string[][] = [];

  selectedTransaction: Transaction | undefined
  public newTransactionSelectedSubject: Subject<unknown> = new Subject<unknown>()
  public newFileSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  createTransaction(transactionType: TransactionTypeEnum, desc: string, transactionDate: Date, value: number, acc: string, budget: string, 
        trgBudgetKey: string, trgAccKey: string, securityBusinessKey: string, depotBusinessKey: string, amount: number, insuranceKey: string, transactionId: string|undefined ):Transaction {
    if(value < 0) {
      value = value * (-1); 
    }

    const transaction: Transaction = new Transaction(transactionType, desc, transactionDate, acc, budget,trgBudgetKey,trgAccKey, value, securityBusinessKey, depotBusinessKey, amount, insuranceKey); 
    if(transactionId!==undefined){
      transaction.transactionId=transactionId;
    }
    return transaction;
  }

  private saveIncomeExpense(transactionType: TransactionTypeEnum, desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined ) {

    this.mfDataService.saveTransaction(this.createTransaction(transactionType, desc, transactionDate, value, acc.businesskey, budget.businesskey, "","", "","", 0, "", transactionId));
  }

  saveIncome(desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined ){
    this.saveIncomeExpense(TransactionTypeEnum.INCOME, desc, transactionDate, value, acc, budget, transactionId);
  }
  saveExpense(desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined ){
    this.saveIncomeExpense(TransactionTypeEnum.EXPENSE, desc, transactionDate, value, acc, budget, transactionId);
  }

  private saveBuySell(transactionType: TransactionTypeEnum, desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined, depotId: string, securityId: string, amount:number) {
    this.mfDataService.saveTransaction(this.createTransaction(transactionType, desc, transactionDate, value, acc.businesskey, budget.businesskey,"","", securityId, depotId, amount, "", transactionId));
  }

  saveBuy(desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined, depotId: string, securityId: string, amount:number ){
    this.saveBuySell(TransactionTypeEnum.BUY, desc, transactionDate, value, acc, budget, transactionId,depotId,securityId,amount);
  }
  saveSell(desc: string, transactionDate: Date, value: number, acc: Instrument, budget: Instrument, transactionId: string|undefined, depotId: string, securityId: string, amount:number ){
    this.saveBuySell(TransactionTypeEnum.SELL, desc, transactionDate, value, acc, budget, transactionId,depotId,securityId,amount);
  }

  saveTransfer(desc: string, transactionDate: Date, value: number, srcInstrument: Instrument, trgInstrument: Instrument, transactionId: string|undefined ) {
    this.mfDataService.saveTransaction(this.createTransaction(TransactionTypeEnum.TRANSFER, desc, transactionDate, value, srcInstrument.businesskey, "","",trgInstrument.businesskey, "", "", 0, "", transactionId));
  }

  saveBudgetTransfer(desc: string, transactionDate: Date, value: number, srcInstrument: Instrument, trgInstrument: Instrument, transactionId: string|undefined ) {
    this.mfDataService.saveTransaction(this.createTransaction(TransactionTypeEnum.BUDGETTRANSFER, desc, transactionDate, value, "", srcInstrument.businesskey,trgInstrument.businesskey,"", "", "", 0, "", transactionId));
  }

  deleteTransaction() {
    if (this.selectedTransaction!==undefined && this.selectedTransaction.transactionId) {
      this.mfDataService.deleteTransaction(this.selectedTransaction.transactionId);
    }
    
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.getConfigLoadedSubject();
  }
  getTenantEventSubject() : Subject<unknown>{
    return this.mfDataService.getTenantEventSubject();
  }
  getLoginSubject() : Subject<unknown>{
    return this.mfDataService.loginEventSubject;
  }

  getTransactions(startDate: Date, endDate: Date): Observable<Transaction[]> {
    return this.mfDataService.getTransactions(startDate, endDate);
  }

  getInstruments(): Observable<Instrument[]> {
    return this.mfDataService.getInstrumentsAndSecurities();
  }

  setSelectedTransaction(transaction?:Transaction) {
    this.selectedTransaction = transaction;
    this.newTransactionSelectedSubject.next(true);
  }
  getSelectedTransaction() : Transaction|undefined {
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