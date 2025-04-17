import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LiquidityTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { AssetviewService } from '../assetview.service';

interface ChartDataSet {
  label: string;
  id: String;
  data: number[];
}

@Component({
  selector: 'mffrontend-accoutbudgetliquidityview',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './accoutbudgetliquidityview.component.html',
  styleUrl: './accoutbudgetliquidityview.component.scss'
})
export class AccoutbudgetliquidityviewComponent implements OnInit {
  basicData: any;
  basicOptions: any;

  acc_liquidSum = 0.0;
  acc_shortTermSum = 0.0;
  acc_midTermSum = 0.0;
  acc_longTermSum = 0.0;

  acc_sum=0.0;

  bgt_liquidSum = 0.0;
  bgt_shortTermSum = 0.0;
  bgt_midTermSum = 0.0;
  bgt_longTermSum = 0.0;

  bgt_sum=0.0;

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
          labels: ['Liquide Konten:' + this.acc_liquidSum, 'Liquide Budgets:' + this.bgt_liquidSum, 
              'Konten innerhalb eines Jahres:' + this.acc_shortTermSum, 'Budgets innerhalb eines Jahres:' + this.bgt_shortTermSum, 
              'Mittelfristige Konten:' + this.acc_midTermSum, 'Mittelfristige Budgets:' + this.bgt_midTermSum, 
              'Rentenanlagekonten:' + this.acc_longTermSum, 'Rentenanlagebudgets:' + this.bgt_longTermSum],
          datasets: data
      };
  }



  private loadAndConvertInstrumentdetails(): ChartDataSet[] {
      let datasets: ChartDataSet[] = [];
      this.acc_liquidSum = 0.0;
      this.acc_shortTermSum = 0.0;
      this.acc_midTermSum = 0.0;
      this.acc_longTermSum = 0.0;
      this.acc_sum = 0.0;
      this.service.getAccountDetails().forEach(i => {
          this.acc_sum+=i.value;
          const value = this.roundToTwoDigets(i.value);
          if(value>0){
              switch (i.liquiditytype) {
                  case LiquidityTypeEnum.LIQUIDE: {
                      this.acc_liquidSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [value, 0, 0, 0, 0, 0, 0, 0]
                      }
                      datasets.push(dataSet);
                      break;
                  }
                  case LiquidityTypeEnum.SHORTTERM: {
                      this.acc_shortTermSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [0, 0, value, 0, 0, 0, 0, 0]
                      }
                      datasets.push(dataSet);
                      break;
                  }
                  case LiquidityTypeEnum.MIDTERM: {
                      this.acc_midTermSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [0, 0, 0, 0, value, 0, 0, 0]
                      }
                      datasets.push(dataSet);
                      break;
                  }
                  case LiquidityTypeEnum.LONGTERM: {
                      this.acc_longTermSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [0, 0, 0, 0, 0, 0, value, 0]
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
      this.acc_sum=this.roundToTwoDigets(this.acc_sum);
      this.acc_liquidSum=this.roundToTwoDigets(this.acc_liquidSum);
      this.acc_shortTermSum=this.roundToTwoDigets(this.acc_shortTermSum); 
      this.acc_midTermSum=this.roundToTwoDigets(this.acc_midTermSum);
      this.acc_longTermSum=this.roundToTwoDigets(this.acc_longTermSum);

      this.bgt_liquidSum = 0.0;
      this.bgt_shortTermSum = 0.0;
      this.bgt_midTermSum = 0.0;
      this.bgt_longTermSum = 0.0;
      this.bgt_sum = 0.0;
      this.service.getBudgetDetails().forEach(i => {
          this.bgt_sum+=i.value;
          const value = this.roundToTwoDigets(i.value);
          if(value>0){
              switch (i.liquiditytype) {
                  case LiquidityTypeEnum.LIQUIDE: {
                      this.bgt_liquidSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [0, value, 0, 0, 0, 0, 0, 0]
                      }
                      datasets.push(dataSet);
                      break;
                  }
                  case LiquidityTypeEnum.SHORTTERM: {
                      this.bgt_shortTermSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [0, 0, 0, value, 0, 0, 0, 0]
                      }
                      datasets.push(dataSet);
                      break;
                  }
                  case LiquidityTypeEnum.MIDTERM: {
                      this.bgt_midTermSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [0, 0, 0, 0, 0, value, 0, 0]
                      }
                      datasets.push(dataSet);
                      break;
                  }
                  case LiquidityTypeEnum.LONGTERM: {
                      this.bgt_longTermSum += i.value;
                      const dataSet: ChartDataSet = {
                          label: i.description,
                          id: i.businesskey,
                          data: [0, 0, 0, 0, 0, 0, 0, value]
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
      this.bgt_sum=this.roundToTwoDigets(this.bgt_sum);
      this.bgt_liquidSum=this.roundToTwoDigets(this.bgt_liquidSum);
      this.bgt_shortTermSum=this.roundToTwoDigets(this.bgt_shortTermSum); 
      this.bgt_midTermSum=this.roundToTwoDigets(this.bgt_midTermSum);
      this.bgt_longTermSum=this.roundToTwoDigets(this.bgt_longTermSum);
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