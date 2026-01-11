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

  setPeriodToCurrentMonth() {
    const today = new Date();
    const firtstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    this.dateForAnalysis = today;
    this.referenceDate = firtstDayOfMonth;

    this.service.setDateAndReferenceDateForAnalysis(this.dateForAnalysis, this.referenceDate);
  }

  setPeriodToLastMonth() {
    const today = new Date();
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const lastDayOfMonthBeforeLast = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    
    this.dateForAnalysis = lastDayOfLastMonth;
    this.referenceDate = lastDayOfMonthBeforeLast;

    this.service.setDateAndReferenceDateForAnalysis(this.dateForAnalysis, this.referenceDate);
  }

  setPeriodToLastYear() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear()-1, 11, 31);
    const firstDay = new Date(today.getFullYear()-2, 11, 31);
    
    this.dateForAnalysis = lastDay;
    this.referenceDate = firstDay;

    this.service.setDateAndReferenceDateForAnalysis(this.dateForAnalysis, this.referenceDate); 
  }

  setPeriodToCurrentYear() {
    const lastDay = new Date();
    const firstDay = new Date(lastDay.getFullYear()-1, 11, 31);
    
    this.dateForAnalysis = lastDay;
    this.referenceDate = firstDay;

    this.service.setDateAndReferenceDateForAnalysis(this.dateForAnalysis, this.referenceDate);
  }


  setPeriodToTTM() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
    const firstDay = new Date(lastDay.getFullYear()-1, today.getMonth(), 0);
    
    this.dateForAnalysis = lastDay;
    this.referenceDate = firstDay;

    this.service.setDateAndReferenceDateForAnalysis(this.dateForAnalysis, this.referenceDate); 
  }
}
