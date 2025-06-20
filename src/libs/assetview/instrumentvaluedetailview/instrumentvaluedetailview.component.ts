import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetviewService } from '../assetview.service';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Cashflow } from '../../shared/data-access-mfdata/model/cashflow';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { InstrumentFullDetails } from '../../shared/data-access-mfdata/model/instrumentfulldetails';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'mffrontend-instrumentvaluedetailview',
  standalone: true,
  imports: [CommonModule, ChartModule, TableModule, DividerModule],
  templateUrl: './instrumentvaluedetailview.component.html',
  styleUrls: ['./instrumentvaluedetailview.component.scss'],
})
export class InstrumentvaluedetailviewComponent implements OnInit {

  selectedInstrumentFullDetails: InstrumentFullDetails = new InstrumentFullDetails("No Instrument Selected", "No Instrument Selected", InstrumentTypeEnum.BUDGET, [], [], new Map<string, number>(), new Map<string, number>());

  valueWithoutLinkedInstruments = 0.0;
  expenses: Cashflow[] = [];
  income: Cashflow[] = [];
  linkedinstrumentValues: { instrument: string; value: number }[] = [];
  properties: { propertyname: string; value: number }[] = [];

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
      this.properties = [];
      const themap = new Map(Object.entries(details.additionalValues));
      let value = 0.0;
      let valueProperty = themap.get('valueDuedate');
      if (valueProperty !== undefined) {
        this.properties.push({ propertyname: "Wert zum Stichtag", value: valueProperty });
        value=valueProperty;
      }
      valueProperty = themap.get('valueReferencedate');
      if (valueProperty !== undefined) {
        this.properties.push({ propertyname: "Wert zum ReferenzStichtag", value: valueProperty });
      }
      valueProperty = themap.get('valueChangeAbs');
      if (valueProperty !== undefined) {
        this.properties.push({ propertyname: "Absolute Veränderung", value: valueProperty });
      }
      valueProperty = themap.get('valueChangeRel');
      if (valueProperty !== undefined) {
        this.properties.push({ propertyname: "Relative Veränderung", value: valueProperty });
      }
      valueProperty = themap.get('sumOfIncome');
      if (valueProperty !== undefined) {
        this.properties.push({ propertyname: "Summe der Einnahmen", value: valueProperty });
      }
      valueProperty = themap.get('sumOfExpense');
      if (valueProperty !== undefined) {
        this.properties.push({ propertyname: "Summe der Ausgaben", value: valueProperty });
      }
      valueProperty = themap.get('avgExpensesOfLastYear');
      if (valueProperty !== undefined) {
        this.properties.push({ propertyname: "Durchschnittliche monatl. Ausgaben des letzten Jahres", value: valueProperty });
      }

      if(details.linkedValues!=undefined){
        const theLinkedValuesMap = new Map(Object.entries(details.linkedValues));
        
        this.linkedinstrumentValues = Array.from(theLinkedValuesMap.entries()).map(([instrument, value]) => ({
          instrument,
          value
        }));
        this.linkedinstrumentValues=this.linkedinstrumentValues.filter(i=>i.value!=0).map(item => {
          const matchedInstrument = this.service.getAccountDetails().find(
            detail => detail.businesskey === item.instrument
          );
        
          return {
            instrument: matchedInstrument?.description ?? 'Unknown Instrument',
            value: item.value
          };
        });
        let sumOfLinkedValues = 0;
        this.linkedinstrumentValues.forEach(i=>sumOfLinkedValues+=i.value);
        this.valueWithoutLinkedInstruments=value-sumOfLinkedValues;
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
