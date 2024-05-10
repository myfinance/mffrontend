import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetviewService } from '../assetview.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'mffrontend-assetvaluehistoryview',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './assetvaluehistoryview.component.html',
  styleUrls: ['./assetvaluehistoryview.component.scss'],
})
export class AssetValueHistoryViewComponent implements OnInit {

  data: any;

  options: any;

  documentStyle = getComputedStyle(document.documentElement);

  constructor(private service: AssetviewService) {

  }

  ngOnInit() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');

    this.service.accValueEventSubject.subscribe(
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
    const curve = this.service.getTenantValueCurve();
    const keys = Object.keys(curve);
    const values = Object.values(curve);
    this.data = {
      labels: keys,
      datasets: [
        {
          label: 'Gesamtvermögen',
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          data: values,

        }
      ]
    };
}


}
