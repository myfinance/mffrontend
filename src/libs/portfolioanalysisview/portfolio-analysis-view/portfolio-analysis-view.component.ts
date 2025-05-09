import { Component } from '@angular/core';
import { DepotOverviewComponent } from '../depot-overview/depot-overview.component';
import { PortfolioAnalysisViewControllerComponent } from '../portfolio-analysis-view-controller/portfolio-analysis-view-controller.component';

@Component({
  selector: 'app-portfolio-analysis-view',
  standalone: true,
  imports: [DepotOverviewComponent, PortfolioAnalysisViewControllerComponent],
  templateUrl: './portfolio-analysis-view.component.html',
  styleUrl: './portfolio-analysis-view.component.scss'
})
export class PortfolioAnalysisViewComponent {

}
