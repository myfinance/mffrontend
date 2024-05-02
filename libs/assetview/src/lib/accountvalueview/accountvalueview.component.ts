import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AssetviewService } from '../assetview.service';
import { LiquidityTypeEnum } from '@mffrontend/shared/data-access-mfdata';


interface ChartDataSet {
    label: string;
    data: number[];
}

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

    liquidSum = 0.0;
    shortTermSum = 0.0;
    midTermSum = 0.0;
    longTermSum = 0.0;

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
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    stacked: true,
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
        const data = this.loadAndConvertInstrumentdetails()
        this.basicData = {
            labels: ['Liquide:'+this.liquidSum,'innerhalb eines Jahres:'+this.shortTermSum, 'Mittelfristig:'+this.midTermSum,'Rentenanlage:'+this.longTermSum],
            datasets: data
        };
    }



    private loadAndConvertInstrumentdetails(): ChartDataSet[] {
        let datasets:ChartDataSet[] = [];
        this.liquidSum=0.0;
        this.shortTermSum=0.0;
        this.midTermSum=0.0;
        this.longTermSum=0.0;
        this.service.getInstrumentDetails().forEach(i=>{
            switch(i.liquiditytype) {
                case LiquidityTypeEnum.LIQUIDE: { 
                    this.liquidSum += i.value;
                    const dataSet: ChartDataSet = {
                        label:i.businesskey,
                        data: [i.value,0,0,0]
                    }
                    datasets.push(dataSet);
                    break; 
                 } 
                 case LiquidityTypeEnum.SHORTTERM: { 
                    this.shortTermSum += i.value;
                    const dataSet: ChartDataSet = {
                        label:i.businesskey,
                        data: [0,i.value,0,0]
                    }
                    datasets.push(dataSet);
                    break; 
                 } 
                 case LiquidityTypeEnum.MIDTERM: { 
                    this.midTermSum += i.value;
                    const dataSet: ChartDataSet = {
                        label:i.businesskey,
                        data: [0,0,i.value,0]
                    }
                    datasets.push(dataSet);
                    break; 
                 } 
                 case LiquidityTypeEnum.LONGTERM: { 
                    this.longTermSum += i.value;
                    const dataSet: ChartDataSet = {
                        label:i.businesskey,
                        data: [0,0,0,i.value]
                    }
                    datasets.push(dataSet);
                    break; 
                 } 
                 default: { 
                    //statements; 
                    break; 
                 } 
            }
        })
        datasets=this.service.getInstrumentDetails().map(i=>({
            label:i.businesskey,
            data: [i.value,0,0,0]
        }))
        return datasets;
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
