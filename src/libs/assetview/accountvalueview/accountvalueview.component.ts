import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AssetviewService } from '../assetview.service';
import { LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';


interface ChartDataSet {
    label: string;
    id: String;
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

    sum=0.0;

    constructor(private service: AssetviewService) {

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
                    display: false,
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
            labels: ['Liquide:' + this.liquidSum, 'innerhalb eines Jahres:' + this.shortTermSum, 'Mittelfristig:' + this.midTermSum, 'Rentenanlage:' + this.longTermSum],
            datasets: data
        };
    }



    private loadAndConvertInstrumentdetails(): ChartDataSet[] {
        let datasets: ChartDataSet[] = [];
        this.liquidSum = 0.0;
        this.shortTermSum = 0.0;
        this.midTermSum = 0.0;
        this.longTermSum = 0.0;
        this.sum = 0.0;
        this.service.getAccountDetails().forEach(i => {
            this.sum+=i.value;
            const value = this.roundToTwoDigets(i.value);
            if(value>0){
                switch (i.liquiditytype) {
                    case LiquidityTypeEnum.LIQUIDE: {
                        this.liquidSum += i.value;
                        const dataSet: ChartDataSet = {
                            label: i.description,
                            id: i.businesskey,
                            data: [value, 0, 0, 0]
                        }
                        datasets.push(dataSet);
                        break;
                    }
                    case LiquidityTypeEnum.SHORTTERM: {
                        this.shortTermSum += i.value;
                        const dataSet: ChartDataSet = {
                            label: i.description,
                            id: i.businesskey,
                            data: [0, value, 0, 0]
                        }
                        datasets.push(dataSet);
                        break;
                    }
                    case LiquidityTypeEnum.MIDTERM: {
                        this.midTermSum += i.value;
                        const dataSet: ChartDataSet = {
                            label: i.description,
                            id: i.businesskey,
                            data: [0, 0, value, 0]
                        }
                        datasets.push(dataSet);
                        break;
                    }
                    case LiquidityTypeEnum.LONGTERM: {
                        this.longTermSum += i.value;
                        const dataSet: ChartDataSet = {
                            label: i.description,
                            id: i.businesskey,
                            data: [0, 0, 0, value]
                        }
                        datasets.push(dataSet);
                        break;
                    }
                    default: {
                        //statements; 
                        break;
                    }
                }
            }

        })
        this.sum=this.roundToTwoDigets(this.sum);
        this.liquidSum=this.roundToTwoDigets(this.liquidSum);
        this.shortTermSum=this.roundToTwoDigets(this.shortTermSum); 
        this.midTermSum=this.roundToTwoDigets(this.midTermSum);
        this.longTermSum=this.roundToTwoDigets(this.longTermSum);
        return datasets;
    }

    roundToTwoDigets(value:number):number {
        return Math.round(value * 100) / 100;
    }

    handleBarClick(event: any) {
        const datasetIndex = event.element.datasetIndex;
        const datasetLabel = this.basicData.datasets[datasetIndex].label;
        const dataseId = this.basicData.datasets[datasetIndex].id;
    
        this.service.setSelectedInstrument(dataseId);

    }
}