import { Component } from '@angular/core';
import { SecurityAnalysisControllerComponent } from "../security-analysis-controller/security-analysis-controller.component";
import { SecuritiesOverviewComponent } from "../securities-overview/securities-overview.component";
import { SecurityChartComponent } from "../security-chart/security-chart.component";
import { EquityAnalysisViewComponent } from "../equity-analysis-view/equity-analysis-view.component";
import { EquityMetricsEditorComponent } from '../equity-metrics-editor/equity-metrics-editor.component';

@Component({
  selector: 'app-security-analysis-view',
  standalone: true,
  imports: [SecurityAnalysisControllerComponent, SecuritiesOverviewComponent, SecurityChartComponent, EquityAnalysisViewComponent, EquityAnalysisViewComponent, EquityMetricsEditorComponent],
  templateUrl: './security-analysis-view.component.html',
  styleUrl: './security-analysis-view.component.scss'
})
export class SecurityAnalysisViewComponent {

}
