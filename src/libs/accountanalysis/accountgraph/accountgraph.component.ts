import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AccountanalysisService } from '../accountanalysis.service';

@Component({
  selector: 'mffrontend-accountgraph',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './accountgraph.component.html',
  styleUrl: './accountgraph.component.scss'
})
export class AccountgraphComponent implements OnInit {

  data: any;

  options: any;

  documentStyle = getComputedStyle(document.documentElement);

  constructor(private service: AccountanalysisService) {

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
    let curve = new Map<Date,number>;
    let curvedesc = "Kontostand";
    if(this.service.getSelectedInstrument()!=undefined &&this.service.getSelectedInstrument()?.valueCurve!=undefined){
      curve=this.service.getSelectedInstrument()?.valueCurve as Map<Date,number>;
      curvedesc = "Kontostand:"+this.service.getSelectedInstrument()?.description;
      
    }
    const curveLabel = curvedesc;
    const keys = Object.keys(curve);
    const values = Object.values(curve);
    this.data = {
      labels: keys,
      datasets: [
        {
          label: curveLabel,
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          data: values,

        }
      ]
    };
}


}
