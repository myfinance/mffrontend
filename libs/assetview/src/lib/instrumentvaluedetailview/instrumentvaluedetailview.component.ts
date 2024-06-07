import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetviewService } from '../assetview.service';
import { InstrumentFullDetails } from 'libs/shared/data-access-mfdata/src/lib/model/instrumentfulldetails';
import { InstrumentTypeEnum } from '@mffrontend/shared/data-access-mfdata';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Cashflow } from 'libs/shared/data-access-mfdata/src/lib/model/cashflow';

@Component({
  selector: 'mffrontend-instrumentvaluedetailview',
  standalone: true,
  imports: [CommonModule, ChartModule, TableModule],
  templateUrl: './instrumentvaluedetailview.component.html',
  styleUrls: ['./instrumentvaluedetailview.component.scss'],
})
export class InstrumentvaluedetailviewComponent implements OnInit {

  selectedInstrumentFullDetails: InstrumentFullDetails = new InstrumentFullDetails("No Instrument Selected", "No Instrument Selected", InstrumentTypeEnum.BUDGET, [], [], new Map<string, number>());
  value = 0.0;
  referenceValue = 0.0;
  valueChangeAbs = 0.0;
  valueChangeRel = 0.0;
  sumOfIncome = 0.0;
  sumOfExpense = 0.0;
  avgExpensesOfLastYear = 0.0;
  expenses: Cashflow[] = [];
  income: Cashflow[] = [];

  data: any;
  options: any;
  documentStyle = getComputedStyle(document.documentElement);

  constructor(private service: AssetviewService) {

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

      this.income = details.incomeInPeriod;
      this.expenses = details.expensesInPeriod;

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
}
