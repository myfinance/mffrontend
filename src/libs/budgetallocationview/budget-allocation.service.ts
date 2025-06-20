import { Injectable } from '@angular/core';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { Subject } from 'rxjs';
import { RecurrentTransaction } from '../shared/data-access-mfdata/model/recurrenttransaction';
import { TransactionTypeEnum } from '../shared/data-access-mfdata/model/transaction';
import { Instrument } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';


export interface TransactionView { 
  description: string;
  budget: string;
  trgbudget: string;
  value: number;  
}

@Injectable({
  providedIn: 'root'
})
export class BudgetAllocationService {

  recurrentIncome: TransactionView[] = [];
  recurrentBudgetTransfers: TransactionView[] = [];
  instruments: Instrument[] = [];
  incomebudgets: Instrument[] = [];
  instrumentsLoaded = false;
  incomeBudgetsLoaded = false;
  public recurrentTransactionUpdatedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
    this.mfDataService.getConfigLoadedSubject().subscribe({
      next:
        () => {
          this.loadData();
        },
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.mfDataService.getRecurrentTransactionEventSubject().subscribe(
      () => {
        this.getRecurrentTransactions();
      }
    )
    this.mfDataService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadData();
      }
    )
    this.loadData();
  }


  getRecurrentTransactions(){
    this.mfDataService.getRecurrentTransactions().subscribe(
      (transactions) => {
        this.recurrentIncome = this.map2TransactionView(transactions.filter(t=>t.transactionType==TransactionTypeEnum.INCOME));
        this.recurrentIncome=this.recurrentIncome.concat(this.mapAndReversBudgetTransaction2TransactionView(transactions.filter(t=>t.transactionType==TransactionTypeEnum.BUDGETTRANSFER)));
        this.recurrentBudgetTransfers = this.map2TransactionView(transactions.filter(t=>t.transactionType==TransactionTypeEnum.BUDGETTRANSFER));
        this.recurrentTransactionUpdatedSubject.next(true);
      }
    )
  }

  loadData(){
    this.loadIncomeBudgets();
    this.loadInstruments();
  }

  loadInstruments(){
    this.mfDataService.getBudgets().subscribe(
      (instruments) => {
        this.instruments = instruments;
        this.instrumentsLoaded = true;
        if(this.incomeBudgetsLoaded){
          this.getRecurrentTransactions();
        }
      }
    )
  }

  loadIncomeBudgets(){
    this.mfDataService.getIncomeBudgets().subscribe(
      (incomebudgets) => {
        this.incomebudgets = incomebudgets;
        this.incomeBudgetsLoaded = true;
        if(this.instrumentsLoaded){
          this.getRecurrentTransactions();
        }
      }
    )
  }

  getRecurrentIncome():TransactionView[]{
    return this.recurrentIncome;
  }

  getRecurrentBudgetTransfers():TransactionView[]{
    return this.recurrentBudgetTransfers;
  }

  map2TransactionView(transactions: RecurrentTransaction[]):TransactionView[]{
    let result: TransactionView[] = transactions.map(tx => {
      const budget = this.instruments.find(inst => inst.businesskey === tx.budgetKey);
      const trgbudget = this.instruments.find(inst => inst.businesskey === tx.trgBudgetKey);
      return {
        description: tx.description,
        budget: budget?.description ?? 'Unknown Budget',
        trgbudget: trgbudget?.description ?? 'Unknown Budget',
        value: tx.value
      };
    });
    return result;
  }

  //a budgettransaction to an Incomebudget is a Income where the targetBudget is the incomebudget
  mapAndReversBudgetTransaction2TransactionView(transactions: RecurrentTransaction[]):TransactionView[]{
    let result: TransactionView[] = transactions.map(tx => {
      const budget = this.instruments.find(inst => inst.businesskey === tx.budgetKey);
      const trgbudget = this.instruments.find(inst => inst.businesskey === tx.trgBudgetKey);
      return {
        description: tx.description,
        budget: trgbudget?.description ?? 'Unknown Budget',
        trgbudget: budget?.description ?? 'Unknown Budget',
        value: tx.value
      };
    });
    return result;
  }

  getIncomeBudgets():Instrument[]{
    return this.incomebudgets;
  }
}
