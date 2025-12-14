import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { AssetviewService } from '../assetview.service';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ValuationTypeEnum } from '../../shared/data-access-mfdata/model/valuecurve';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'mffrontend-assetviewcontroller',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, SidebarModule, DropdownModule, ButtonModule],
  templateUrl: './assetviewcontroller.component.html',
  styleUrls: ['./assetviewcontroller.component.scss'],
})
export class AssetviewcontrollerComponent {
  dateForAnalysis: Date | undefined;
  referenceDate: Date;
  rangeDates: Date[] | undefined;
  valuationTypes: String[] = ['MARKETVALUE', 'PRUDENT', 'STATIC'];
  selectedValuationType='STATIC';

  sidebarVisible = false;

  constructor(private service:AssetviewService) {
    this.dateForAnalysis = this.service.getDateForAnalysis();
    this.referenceDate = this.service.getReferenceDate();
    this.rangeDates = this.service.getRangeDates();
    this.selectedValuationType = this.service.getValuationType();
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

  handleValuationTypeChanged(event: any) {
    this.service.setValuationType(event.value);
  }

  setPeriodToLastMonth() {
    const today = new Date();
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const lastDayOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    
    this.dateForAnalysis = lastDayOfLastMonth;
    this.referenceDate = lastDayOfMonthBeforeLast;

    this.service.setDateForAnalysis(this.dateForAnalysis); 
    this.service.setReferenceDate(this.referenceDate); 
  }
}
