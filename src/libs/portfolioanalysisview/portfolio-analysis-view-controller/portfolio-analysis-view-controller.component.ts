import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { PortfolioAnalysisViewService } from '../portfolio-analysis-view.service';

@Component({
  selector: 'app-portfolio-analysis-view-controller',
  standalone: true,
  imports: [Button, CalendarModule, FormsModule, SidebarModule],
  templateUrl: './portfolio-analysis-view-controller.component.html',
  styleUrl: './portfolio-analysis-view-controller.component.scss'
})
export class PortfolioAnalysisViewControllerComponent {

  dateForAnalysis: Date | undefined;
  referenceDate: Date;
  rangeDates: Date[] | undefined;
  sidebarVisible = false;

  constructor(private service:PortfolioAnalysisViewService) {
    this.dateForAnalysis = new Date(Date.now());
    this.referenceDate = this.service.getReferenceDate();
    this.rangeDates = this.service.getRangeDates();
  }

  handleReferenceDateChanged(date: Date) {
    this.service.setReferenceDate(date); 
  }

  handleRangeDateChanged(date: Date[]|any) {
    this.service.setRangeDate(date); 
  }


}
