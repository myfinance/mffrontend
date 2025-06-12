import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { InstrumentFullDetails } from '../../shared/data-access-mfdata/model/instrumentfulldetails';
import { AccountanalysisService } from '../accountanalysis.service';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ButtonModule } from 'primeng/button';

interface CashflowCompareView { 
  row: number;
  description: string;
  transactiondate: Date;
  value: number;  
  approved:boolean;
}

@Component({
  selector: 'mffrontend-accountcashflowanalysis',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './accountcashflowanalysis.component.html',
  styleUrl: './accountcashflowanalysis.component.scss'
})
export class AccountcashflowanalysisComponent  implements OnInit {

  selectedInstrumentFullDetails: InstrumentFullDetails = new InstrumentFullDetails("No Instrument Selected", "No Instrument Selected", InstrumentTypeEnum.BUDGET, [], [], new Map<string, number>());
  value = 0.0;
  referenceValue = 0.0;
  valueChangeAbs = 0.0;
  valueChangeRel = 0.0;
  sumOfIncome = 0.0;
  sumOfExpense = 0.0;
  avgExpensesOfLastYear = 0.0;
  checkedValueTotal: number = 0;
  checkedValue2CompareTotal: number = 0;
  
  cashflows: CashflowCompareView[] = [];
  cashflows2Compare: CashflowCompareView[] = [];
  selectedRows: CashflowCompareView[] = [];
  selectedRows2Compare: CashflowCompareView[] = [];

  data: any;
  options: any;
  documentStyle = getComputedStyle(document.documentElement);

  constructor(private service: AccountanalysisService) {
    registerLocaleData(localeDe);
  }


  ngOnInit() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');

    this.service.selectedInstrumentEventSubject.subscribe(
      {
        next: () => {
          this.setData();
        },
        error: (e) => console.error(e)
      }
    )
    this.setData();

    this.service.newFileSelectedSubject.subscribe(
      {
        next: () => {
          this.compareCashflows();
        },
        error: (e) => console.error(e)
      }
    )

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      //aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  setData() {

    const details = this.service.getSelectedInstrument();
    if (details !== undefined) {
      this.selectedInstrumentFullDetails = details;
      const themap = new Map(Object.entries(details.additionalValues));
      let valueProperty = themap.get('valueDuedate');
      if (valueProperty !== undefined) {
        this.value = valueProperty;
      }
      valueProperty = themap.get('valueReferencedate');
      if (valueProperty !== undefined) {
        this.referenceValue = valueProperty;
      }
      valueProperty = themap.get('valueChangeAbs');
      if (valueProperty !== undefined) {
        this.valueChangeAbs = valueProperty;
      }
      valueProperty = themap.get('valueChangeRel');
      if (valueProperty !== undefined) {
        this.valueChangeRel = valueProperty;
      }
      valueProperty = themap.get('sumOfIncome');
      if (valueProperty !== undefined) {
        this.sumOfIncome = valueProperty;
      }
      valueProperty = themap.get('sumOfExpense');
      if (valueProperty !== undefined) {
        this.sumOfExpense = valueProperty;
      }
      valueProperty = themap.get('avgExpensesOfLastYear');
      if (valueProperty !== undefined) {
        this.avgExpensesOfLastYear = valueProperty;
      }
      let rownumber = 0;
      this.cashflows = [
        ...details.incomeInPeriod.map(c => ({
          row: rownumber++,
          description: c.description,
          transactiondate: c.transactiondate,
          value: c.value,
          approved: false
        })),
        ...details.expensesInPeriod.map(c => ({
          row: rownumber++,
          description: c.description,
          transactiondate: c.transactiondate,
          value: c.value,
          approved: false
        }))
      ];
      //this.cashflows.sort((a, b) => a.transactiondate.getTime() - b.transactiondate.getTime());
      this.findMatches();

      const curve = details.valueCurve;
      const keys = Object.keys(curve);
      const values = Object.values(curve);
      this.data = {
        labels: keys,
        datasets: [
          {
            label: 'Wertentwicklung',
            fill: false,
            borderColor: this.documentStyle.getPropertyValue('--blue-500'),
            yAxisID: 'y',
            data: values,
  
          }
        ]
      };
    }
  }

  compareCashflows(){
    this.cashflows2Compare = [];
    let rownumber = 0;
    this.service.getCashflow2CompareContent().forEach(row => {
      const cashflowCompareView : CashflowCompareView = {
        row: rownumber++,
        description: row.description,
        value: row.value,
        transactiondate: row.transactionDate,
        approved: false
      };
      this.cashflows2Compare.push(cashflowCompareView);
    });
    this.cashflows2Compare.sort((a, b) => a.transactiondate.getTime() - b.transactiondate.getTime());
    this.findMatches();
  }

  findMatches(){
    for(const cfCompare of this.cashflows2Compare){
      for(const cf of this.cashflows){
        if(!cf.approved && cf.value==cfCompare.value){
          cf.approved=true;
          cfCompare.approved=true;
          break;
        }
      }
    }
  }

  updateCheckedSum(): void {
    this.checkedValueTotal = this.selectedRows.reduce((sum, entry) => sum + entry.value, 0);
  }
  updateCompareCheckedSum(): void {
    this.checkedValue2CompareTotal = this.selectedRows2Compare.reduce((sum, entry) => sum + entry.value, 0);
  }

  approveTransactions(): void {
    this.selectedRows.forEach(r=>this.cashflows.filter(c=>c.row==r.row).map(c=>c.approved=true));
    this.selectedRows2Compare.forEach(r=>this.cashflows2Compare.filter(c=>c.row==r.row).map(c=>c.approved=true));
    this.selectedRows=[];
    this.selectedRows2Compare=[];
  }
}

