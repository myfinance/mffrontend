import { Component } from '@angular/core';
import { SecurityAnalysisControllerComponent } from "../security-analysis-controller/security-analysis-controller.component";
import { SecuritiesOverviewComponent } from "../securities-overview/securities-overview.component";
import { SecurityChartComponent } from "../security-chart/security-chart.component";

@Component({
  selector: 'app-security-analysis-view',
  standalone: true,
  imports: [SecurityAnalysisControllerComponent, SecuritiesOverviewComponent, SecurityChartComponent],
  templateUrl: './security-analysis-view.component.html',
  styleUrl: './security-analysis-view.component.scss'
})
export class SecurityAnalysisViewComponent {

}
