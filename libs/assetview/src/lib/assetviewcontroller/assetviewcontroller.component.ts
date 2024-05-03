import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { AssetviewService } from '../assetview.service';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'mffrontend-assetviewcontroller',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, SidebarModule],
  templateUrl: './assetviewcontroller.component.html',
  styleUrls: ['./assetviewcontroller.component.scss'],
})
export class AssetviewcontrollerComponent {
  dateForAnalysis: Date | undefined;
  referenceDate: Date;
  rangeDates: Date[] | undefined;

  sidebarVisible = false;

  constructor(private service:AssetviewService) {
    this.dateForAnalysis = this.service.getDateForAnalysis();
    this.referenceDate = this.service.getReferenceDate();
    this.rangeDates = this.service.getRangeDates();
  }

  handleDateForAnalysisChanged(date: Date) {
    this.service.setDateForAnalysis(date); 
  }

  handleReferenceDateChanged(date: Date) {
    this.service.setReferenceDate(date); 
  }

  handleRangeDateChanged(date: Date[]|any) {
    this.service.setRangeDate(date); 
  }
}
