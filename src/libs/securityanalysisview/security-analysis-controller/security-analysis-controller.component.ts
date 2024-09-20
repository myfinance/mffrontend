import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-security-analysis-controller',
  standalone: true,
  imports: [Button, CalendarModule, FormsModule, SidebarModule],
  templateUrl: './security-analysis-controller.component.html',
  styleUrl: './security-analysis-controller.component.scss'
})
export class SecurityAnalysisControllerComponent {

  dateForAnalysis: Date | undefined;
  referenceDate: Date;
  rangeDates: Date[] | undefined;

  sidebarVisible = false;

  constructor(private service:SecurityAnalysisViewService) {
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

  import(){
    this.service.import();
  }

}
