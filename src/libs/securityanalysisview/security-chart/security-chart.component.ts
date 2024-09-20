import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';

@Component({
  selector: 'app-security-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './security-chart.component.html',
  styleUrl: './security-chart.component.scss'
})
export class SecurityChartComponent  implements OnInit {

  data: any;

  options: any;

  documentStyle = getComputedStyle(document.documentElement);

  constructor(private service: SecurityAnalysisViewService) {

  }

  ngOnInit() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');

    this.service.chartEventSubject.subscribe(
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
    const curve = this.service.getValueCurve();
    const keys = Object.keys(curve.valueCurve);
    const values = Object.values(curve.valueCurve);
    this.data = {
      labels: keys,
      datasets: [
        {
          label: curve.instrumentBusinesskey,
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          data: values,

        }
      ]
    };
}

}
