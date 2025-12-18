import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PortfolioAnalysisViewService } from '../portfolio-analysis-view.service';
import { Position } from '../../shared/data-access-mfdata/model/position';
import { ChartModule } from 'primeng/chart';
import { PortfolioMetrics } from '../../shared/data-access-mfdata/model/portfoliometrics';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

interface SecurityMetricView {
  businesskey: string;
  description: string;
  totalCagr: number;
  cagrPerYear: Map<number, number>;
  amount: number;
  value: number;
}

@Component({
  selector: 'app-depot-overview',
  standalone: true,
  imports: [CommonModule, TableModule, ChartModule],
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

  portfolioMetrics: PortfolioMetrics[] = [];
  securityMetricViews: SecurityMetricView[] = [];
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
      this.prepareCharts();
    }

    const metricsResult = this.service.getPortfolioMetrics();
    this.portfolioMetrics = metricsResult.filter(pm => !pm.isSingleSecurity);
    const securityMetrics = metricsResult.filter(pm => pm.isSingleSecurity);

    this.buildSecurityMetricViews(securityMetrics);
  }

  buildSecurityMetricViews(securityMetrics: PortfolioMetrics[]) {
    const aggregatedPositions = new Map<string, { amount: number, value: number, description: string }>();

    this.positions.forEach(pos => {
      const existing = aggregatedPositions.get(pos.securityId);
      if (existing) {
        existing.amount += pos.amount;
        existing.value += pos.value;
      } else {
        aggregatedPositions.set(pos.securityId, {
          amount: pos.amount,
          value: pos.value,
          description: pos.securityDescription
        });
      }
    });

    this.securityMetricViews = securityMetrics.map(metric => {
      const positionData = aggregatedPositions.get(metric.portfolio);
      return {
        businesskey: metric.portfolio,
        description: positionData ? positionData.description : metric.portfolio,
        totalCagr: metric.totalCagr,
        cagrPerYear: metric.cagrPerYear,
        amount: positionData ? positionData.amount : 0,
        value: positionData ? positionData.value : 0
      };
    });
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
  }

  getCagrForYear(metric: PortfolioMetrics, year: number): number {
    if (metric.cagrPerYear && metric.cagrPerYear.get(year)) {
      return metric.cagrPerYear.get(year)!;
    }
    return 0;
  }
}

