import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { CalendarModule } from 'primeng/calendar';
import { AssetviewService } from '../assetview.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mffrontend-assetviewcontroller',
  standalone: true,
  imports: [CommonModule, MatCardModule, CalendarModule, FormsModule],
  templateUrl: './assetviewcontroller.component.html',
  styleUrls: ['./assetviewcontroller.component.scss'],
})
export class AssetviewcontrollerComponent {
  dateForAnalysis: Date | undefined;
  referenceDate: Date;

  constructor(private service:AssetviewService) {
    this.dateForAnalysis = this.service.getDateForAnalysis();
    this.referenceDate = this.service.getReferenceDate();
  }

  handleDateForAnalysisChanged(date: Date) {
    this.service.setDateForAnalysis(date); 
  }

  handleReferenceDateChanged(date: Date) {
    this.service.setReferenceDate(date); 
  }
}
