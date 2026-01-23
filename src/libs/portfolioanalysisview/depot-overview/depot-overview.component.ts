import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PortfolioAnalysisViewService } from '../portfolio-analysis-view.service';
import { Position } from '../../shared/data-access-mfdata/model/position';
import { ChartModule } from 'primeng/chart';
import { PortfolioMetrics } from '../../shared/data-access-mfdata/model/portfoliometrics';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { PositionMetrics } from '../../shared/data-access-mfdata/model/positionmetrics';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { ButtonModule } from 'primeng/button';


interface GroupedPositionMetrics {
  portfolioName: string;
  totalValue: number;
  numberOfStocks: number;
  items: PositionMetrics[];
  expanded?: boolean;
}

@Component({
  selector: 'app-depot-overview',
  standalone: true,
  imports: [CommonModule, TableModule, ChartModule, TabViewModule, BadgeModule, ButtonModule],
  templateUrl: './depot-overview.component.html',
  styleUrl: './depot-overview.component.scss'
})
export class DepotOverviewComponent {
  positions: Position[] = [];
  data: any;
  options: any;
  totalValue = 0;

  equityData: any;
  equityOptions: any;
  numberOfEquities = 0;

  countryPieData: any;
  countryPieOptions: any;

  sectorPieData: any;
  sectorPieOptions: any;

  portfolioMetrics: PortfolioMetrics[] = [];
  positionMetrics4Stocks: PositionMetrics[] = [];
  positionMetricsOther: PositionMetrics[] = [];
  groupedPositionMetrics: GroupedPositionMetrics[] = [];
  currentYear: number;
  lastYear: number;
  yearBeforeLast: number;

  constructor(private service: PortfolioAnalysisViewService) {
    registerLocaleData(localeDe);
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.lastYear = this.currentYear - 1;
    this.yearBeforeLast = this.currentYear - 2;
    this.service.portfolioEventSubject.subscribe({
      next:
        () => {
          this.loadData();
        },
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.loadData();
  }

  loadData() {
    const positionResult = this.service.getPositions();
    if(positionResult!=null && positionResult.length>0){
      this.positions = positionResult.filter(p => p.amount !== 0);
    }

    const metricsResult = this.service.getPortfolioMetrics();
    this.portfolioMetrics = metricsResult.filter(pm => !pm.isSingleSecurity);

    this.positionMetrics4Stocks = this.service.getPositionMetrics().filter(pm => pm.instrumentType === InstrumentTypeEnum.EQUITY);
    this.positionMetricsOther = this.service.getPositionMetrics().filter(pm => pm.instrumentType !== InstrumentTypeEnum.EQUITY);

    this.groupPositionMetrics();

    if(positionResult!=null && positionResult.length>0 && metricsResult!=null){
      this.prepareCharts();
    }
  }

  private groupPositionMetrics() {
    const groupedMap = new Map<string, GroupedPositionMetrics>();

    this.positionMetrics4Stocks.forEach(item => {
      const portfolioName = (item.portfolio && String(item.portfolio).trim() !== '') ? String(item.portfolio) : 'NA';

      if (!groupedMap.has(portfolioName)) {
        groupedMap.set(portfolioName, {
          portfolioName: portfolioName,
          totalValue: 0,
          numberOfStocks: 0,
          items: [],
          expanded: false
        });
      }

      const group = groupedMap.get(portfolioName)!;
      group.totalValue += item.value || 0;
      group.numberOfStocks += 1;
      group.items.push(item);
    });

    this.groupedPositionMetrics = Array.from(groupedMap.values());
  }
  

  getSecurityDescription(businesskey: string): string {
    const position = this.positions.find(p => p.securityId === businesskey);
    return position ? position.securityDescription : businesskey;
  }

  getTotalValuesPlugins() {
    return [{
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const txt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.totalValue);
        const sidePadding = 60;
        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = (chart.innerRadius * 2);

        const fontSizeToUse = Math.min(newFontSize, elementHeight);

        ctx.font = fontSizeToUse + 'px Arial';
        ctx.fillStyle = 'black';

        ctx.fillText(txt, centerX, centerY);
      }
    }];
  }

  getEquityPlugins() {
    return [{
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const txt = this.numberOfEquities.toString(); // Display number of equities
        const sidePadding = 60;
        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = (chart.innerRadius * 2);

        const fontSizeToUse = Math.min(newFontSize, elementHeight);

        ctx.font = fontSizeToUse + 'px Arial';
        ctx.fillStyle = 'black';

        ctx.fillText(txt, centerX, centerY);
      }
    }];
  }

  private prepareCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const backgroundColors = [
      documentStyle.getPropertyValue('--blue-500'),
      documentStyle.getPropertyValue('--yellow-500'),
      documentStyle.getPropertyValue('--green-500'),
      documentStyle.getPropertyValue('--red-500'),
      documentStyle.getPropertyValue('--purple-500'),
      documentStyle.getPropertyValue('--teal-500'),
      documentStyle.getPropertyValue('--orange-500'),
      documentStyle.getPropertyValue('--cyan-500'),
      documentStyle.getPropertyValue('--pink-500'),
      documentStyle.getPropertyValue('--lime-500')
    ];

    const hoverBackgroundColors = [
      documentStyle.getPropertyValue('--blue-400'),
      documentStyle.getPropertyValue('--yellow-400'),
      documentStyle.getPropertyValue('--green-400'),
      documentStyle.getPropertyValue('--red-400'),
      documentStyle.getPropertyValue('--purple-400'),
      documentStyle.getPropertyValue('--teal-400'),
      documentStyle.getPropertyValue('--orange-400'),
      documentStyle.getPropertyValue('--cyan-400'),
      documentStyle.getPropertyValue('--pink-400'),
      documentStyle.getPropertyValue('--lime-400')
    ];

    // Chart 1: Aggregated by securityType
    const aggregation = new Map<string, number>();
    this.positions.forEach(p => {
      const value = aggregation.get(p.securityType) || 0;
      aggregation.set(p.securityType, value + p.value);
    });
    aggregation.set('Cash', this.service.getSumOfCash());

    this.totalValue = Array.from(aggregation.values()).reduce((a, b) => a + b, 0);

    this.data = {
      labels: Array.from(aggregation.keys()),
      datasets: [
        {
          data: Array.from(aggregation.values()),
          backgroundColor: backgroundColors.slice(0, aggregation.size),
          hoverBackgroundColor: hoverBackgroundColors.slice(0, aggregation.size)
        }
      ]
    };
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                const percentage = (context.parsed / this.totalValue * 100).toFixed(2);
                label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed) + ` (${percentage}%)`;
              }
              return label;
            }
          }
        }
      }
    };

    // Chart 2: EQUITY positions aggregated by securityDescription
    const equityPositions = this.positions.filter(p => p.securityType === 'EQUITY');
    const equityAggregation = new Map<string, number>();
    equityPositions.forEach(p => {
      const value = equityAggregation.get(p.securityDescription) || 0;
      equityAggregation.set(p.securityDescription, value + p.value);
    });

    // Sort equityAggregation by value
    const sortedEquityAggregation = new Map([...equityAggregation.entries()].sort((a, b) => b[1] - a[1]));

    const equityTotal = Array.from(sortedEquityAggregation.values()).reduce((a, b) => a + b, 0);
    this.numberOfEquities = sortedEquityAggregation.size;

    this.equityData = {
      labels: Array.from(sortedEquityAggregation.keys()),
      datasets: [
        {
          data: Array.from(sortedEquityAggregation.values()),
          backgroundColor: backgroundColors.slice(0, sortedEquityAggregation.size),
          hoverBackgroundColor: hoverBackgroundColors.slice(0, sortedEquityAggregation.size)
        }
      ]
    };
    this.equityOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                const percentage = (context.parsed / equityTotal * 100).toFixed(2);
                label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed) + ` (${percentage}%)`;
              }
              return label;
            }
          }
        }
      }
    };

    // New Chart: Aggregated by Country (Pie Chart)
    const countryAggregation = new Map<string, number>();
    this.positionMetrics4Stocks.forEach(pm => {
      const countryName = (pm.country && String(pm.country).trim() !== '') ? String(pm.country) : 'NA';
      const value = countryAggregation.get(countryName) || 0;
      countryAggregation.set(countryName, value + (pm.value || 0));
    });
    // Sort countryAggregation by value
    const sortedCountryAggregation = new Map([...countryAggregation.entries()].sort((a, b) => b[1] - a[1]));
    this.countryPieData = {
      labels: Array.from(sortedCountryAggregation.keys()),
      datasets: [
        {
          data: Array.from(sortedCountryAggregation.values()),
          backgroundColor: backgroundColors.slice(0, sortedCountryAggregation.size),
          hoverBackgroundColor: hoverBackgroundColors.slice(0, sortedCountryAggregation.size)
        }
      ]
    };
    this.countryPieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                const total = Array.from(sortedCountryAggregation.values()).reduce((a, b) => a + b, 0);
                const percentage = (context.parsed / total * 100).toFixed(2);
                label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed) + ` (${percentage}%)`;
              }
              return label;
            }
          }
        }
      }
    };

    // New Chart: Aggregated by Sector (Pie Chart)
    const sectorAggregation = new Map<string, number>();
    this.positionMetrics4Stocks.forEach(pm => {
      const sectorName = (pm.sector && String(pm.sector).trim() !== '') ? String(pm.sector) : 'NA';
      const value = sectorAggregation.get(sectorName) || 0;
      sectorAggregation.set(sectorName, value + (pm.value || 0));
    });
    // Sort sectorAggregation by value
    const sortedSectorAggregation = new Map([...sectorAggregation.entries()].sort((a, b) => b[1] - a[1]));
    this.sectorPieData = {
      labels: Array.from(sortedSectorAggregation.keys()),
      datasets: [
        {
          data: Array.from(sortedSectorAggregation.values()),
          backgroundColor: backgroundColors.slice(0, sortedSectorAggregation.size),
          hoverBackgroundColor: hoverBackgroundColors.slice(0, sortedSectorAggregation.size)
        }
      ]
    };
    this.sectorPieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                const total = Array.from(sortedSectorAggregation.values()).reduce((a, b) => a + b, 0);
                const percentage = (context.parsed / total * 100).toFixed(2);
                label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed) + ` (${percentage}%)`;
              }
              return label;
            }
          }
        }
      }
    };
  }

  getMetricForYear(metric: Map<number, number>, year: number): number {
    if (metric && metric.get(year)) {
      return metric.get(year)!;
    }
    return 0;
  }

  severity(value: string) {
    if (value === 'RED') return 'danger';
    else if (value === 'YELLOW') return 'warning';
    else return 'success';
  }

  calculateTotalCagr(items: PositionMetrics[]): number {
    let totalWeightedCagr = 0;
    let totalValue = 0;

    items.forEach(item => {
      if (item.totalCagr !== undefined && item.value !== undefined) {
        totalWeightedCagr += item.totalCagr * item.value;
        totalValue += item.value;
      }
    });

    return totalValue > 0 ? totalWeightedCagr / totalValue : 0;
  }

  calculateCagrForYear(items: PositionMetrics[], year: number): number {
    let totalWeightedCagrForYear = 0;
    let totalValue = 0;

    items.forEach(item => {
      if (item.cagrPerYear && item.cagrPerYear.get(year) !== undefined && item.value !== undefined) {
        totalWeightedCagrForYear += item.cagrPerYear.get(year)! * item.value;
        totalValue += item.value;
      }
    });

    return totalValue > 0 ? totalWeightedCagrForYear / totalValue : 0;
  }
}

