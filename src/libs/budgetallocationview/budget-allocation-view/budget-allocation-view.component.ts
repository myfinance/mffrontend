import { Component } from '@angular/core';
import { BudgetAllocationService, TransactionView } from '../budget-allocation.service';
import { TableModule } from 'primeng/table';
import localeDe from '@angular/common/locales/de';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-budget-allocation-view',
  standalone: true,
  imports: [CommonModule, TableModule, DropdownModule, FormsModule, DividerModule],
  templateUrl: './budget-allocation-view.component.html',
  styleUrl: './budget-allocation-view.component.scss'
})
export class BudgetAllocationViewComponent {

  recurrentIncome: TransactionView[] = [];
  recurrentBudgetTransfers: TransactionView[] = [];
  incomebudgets: Instrument[] = [];
  selectedIncomeBudget: Instrument|undefined;
  income: number = 0.0;
  expenses: number =0.0;

  constructor(private service: BudgetAllocationService) {
    registerLocaleData(localeDe);
    this.service.recurrentTransactionUpdatedSubject.subscribe({
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
    this.loadData();

  }

  loadData() {
    this.incomebudgets=this.service.getIncomeBudgets();
    if(this.selectedIncomeBudget==undefined){
      const defaultIncomeBudget = this.incomebudgets.filter(i=>i.description.startsWith("incomeBgt_bgtGrp_bgtPf_"));
      if(defaultIncomeBudget!=undefined && defaultIncomeBudget.length>0){
        this.selectedIncomeBudget=defaultIncomeBudget[0];
      } else {
        this.selectedIncomeBudget=this.incomebudgets[0];
      }
    }
    this.recurrentIncome = this.service.getRecurrentIncome().filter(t=>t.budget==this.selectedIncomeBudget?.description);
    this.income = 0;
    this.recurrentIncome.forEach(i=>this.income+=i.value);
    this.recurrentBudgetTransfers = this.service.getRecurrentBudgetTransfers().filter(t=>t.budget==this.selectedIncomeBudget?.description);
    this.expenses = 0;
    this.recurrentBudgetTransfers.forEach(i=>this.expenses+=i.value);
  }

  onInstrumentChange(event: any) {
    this.loadData();
  }
}
