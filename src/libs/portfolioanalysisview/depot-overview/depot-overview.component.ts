import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PortfolioAnalysisViewService } from '../portfolio-analysis-view.service';
import { Position } from '../../shared/data-access-mfdata/model/position';
import { ChartModule } from 'primeng/chart';

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
  plugins: any[] = [];

  constructor(private service: PortfolioAnalysisViewService) {
    this.service.portfolioEventSubject.subscribe({
      next:
        () => this.loadPositions(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.loadPositions();
  }

  loadPositions() {
    this.positions = this.service.getPositions().filter(p => p.amount !== 0);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const aggregation = new Map<string, number>();
    this.positions.forEach(p => {
      const value = aggregation.get(p.securityType) || 0;
      aggregation.set(p.securityType, value + p.value);
    });

    const total = Array.from(aggregation.values()).reduce((a, b) => a + b, 0);

    const backgroundColors = [
      documentStyle.getPropertyValue('--blue-500'),
      documentStyle.getPropertyValue('--yellow-500'),
      documentStyle.getPropertyValue('--green-500'),
      documentStyle.getPropertyValue('--red-500'),
      documentStyle.getPropertyValue('--purple-500'),
      documentStyle.getPropertyValue('--teal-500')
    ];

    const hoverBackgroundColors = [
      documentStyle.getPropertyValue('--blue-400'),
      documentStyle.getPropertyValue('--yellow-400'),
      documentStyle.getPropertyValue('--green-400'),
      documentStyle.getPropertyValue('--red-400'),
      documentStyle.getPropertyValue('--purple-400'),
      documentStyle.getPropertyValue('--teal-400')
    ];

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
            label: function(context: any) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                const percentage = (context.parsed / total * 100).toFixed(2);
                label += new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(context.parsed) + ` (${percentage}%)`;
              }
              return label;
            }
          }
        }
      }
    };

    this.plugins = [{
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const txt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total);
        //Get options from the center object in options
        const sidePadding = 60;
        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can be scaled down
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        const fontSizeToUse = Math.min(newFontSize, elementHeight);

        ctx.font = fontSizeToUse + 'px Arial';
        ctx.fillStyle = 'black';

        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }];
  }
}