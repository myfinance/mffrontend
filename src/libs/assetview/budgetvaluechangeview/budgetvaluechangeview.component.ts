
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AssetviewService } from '../assetview.service';
import { LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';


interface ChartDataSet {
    label: string;
    data: number[];
}

@Component({
  selector: 'mffrontend-budgetvaluechangeview',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './budgetvaluechangeview.component.html',
  styleUrls: ['./budgetvaluechangeview.component.scss'],
})
export class BudgetvaluechangeviewComponent implements OnInit {
    basicData: any;
    basicOptions: any;

    liquidSum = 0.0;
    shortTermSum = 0.0;
    midTermSum = 0.0;
    longTermSum = 0.0;

    constructor(private service: AssetviewService) {

    }

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.service.budgetValueEventSubject.subscribe(
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
                    stacked: false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    stacked: false,
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
        this.service.getBudgetDetails().forEach(i => {
          const value = i.value - i.referenceValue;
            switch (i.liquiditytype) {
                case LiquidityTypeEnum.LIQUIDE: {
                    
                    this.liquidSum += value;
                    const dataSet: ChartDataSet = {
                        label: i.businesskey,
                        data: [value, 0, 0, 0]
                    }
                    datasets.push(dataSet);
                    break;
                }
                case LiquidityTypeEnum.SHORTTERM: {
                    this.shortTermSum += value;
                    const dataSet: ChartDataSet = {
                        label: i.businesskey,
                        data: [0, value, 0, 0]
                    }
                    datasets.push(dataSet);
                    break;
                }
                case LiquidityTypeEnum.MIDTERM: {
                    this.midTermSum += value;
                    const dataSet: ChartDataSet = {
                        label: i.businesskey,
                        data: [0, 0, value, 0]
                    }
                    datasets.push(dataSet);
                    break;
                }
                case LiquidityTypeEnum.LONGTERM: {
                    this.longTermSum += value;
                    const dataSet: ChartDataSet = {
                        label: i.businesskey,
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
        })
        datasets = this.service.getBudgetDetails().map(i => ({
            label: i.businesskey,
            data: [i.value, 0, 0, 0]
        }))
        return datasets;
    }

    handleBarClick(event: any) {
        const datasetIndex = event.element.datasetIndex;
        const datasetLabel = this.basicData.datasets[datasetIndex].label;
        this.service.setSelectedInstrument(datasetLabel);

    }
}
