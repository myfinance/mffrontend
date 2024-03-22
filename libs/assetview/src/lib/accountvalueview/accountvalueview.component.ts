import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AssetviewService } from '../assetview.service';
//import { MfdataService } from '@mffrontend/shared/data-access-mfdata';

@Component({
    selector: 'mffrontend-accountvalueview',
    standalone: true,
    imports: [CommonModule, ChartModule],
    templateUrl: './accountvalueview.component.html',
    styleUrls: ['./accountvalueview.component.scss'],
})
export class AccountvalueviewComponent implements OnInit {
    basicData: any;

    basicOptions: any;

    constructor(private service:AssetviewService) {

    }

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        this.service.accValueEventSubject.subscribe(
            {
                next: () => {
                    this.setData();
                  },
                  error: (e) => console.error(e)
            }
          )
          this.setData();

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    setData() {
        const data: Map<string, number> = this.service.getAccountValues();
        this.basicData = {
            labels: Array.from(data.keys()),
            datasets: [
                {
                    label: 'Account Values',
                    data: Array.from(data.values()),
                    //backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    //borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                    borderWidth: 1
                }
            ]
        };
    }

    handleBarClick(event: any) {
        // Access the clicked dataset and index
        //const datasetIndex = event.element.datasetIndex;
        const dataIndex = event.element.index;
    
        // Access the data point that was clicked
        //const clickedDataPoint = this.basicData.datasets[datasetIndex].data[dataIndex];
        this.service.setSelectedAccount(this.basicData.labels[dataIndex]);

      }
}
