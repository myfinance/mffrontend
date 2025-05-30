import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { AccountanalysisService } from '../accountanalysis.service';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { DropdownModule } from 'primeng/dropdown';
import { CsvImporter, CSVTypeEnum } from '../../shared/data-access-mfdata/csvimporter';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'mffrontend-accountanalysiscontroller',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, SidebarModule, DropdownModule, FileUploadModule],
  templateUrl: './accountanalysiscontroller.component.html',
  styleUrl: './accountanalysiscontroller.component.scss'
})
export class AccountanalysiscontrollerComponent {
  dateForAnalysis: Date | undefined;
  referenceDate: Date;
  rangeDates: Date[] | undefined;
  accounts: Instrument[] = [];
  selectedAccount: Instrument | undefined;

  sidebarVisible = false;

  constructor(private service: AccountanalysisService) {
    this.dateForAnalysis = this.service.getDateForAnalysis();
    this.referenceDate = this.service.getReferenceDate();
    this.rangeDates = this.service.getRangeDates();
    this.service.accValueEventSubject.subscribe(
      {
        next: () => {
          this.getAccounts();
        },
        error: (e) => console.error(e)
      }
    )
    this.getAccounts();
  }

  getAccounts(){
    this.accounts = this.service.getAccounts().sort((a, b) => a.description.localeCompare(b.description));
  }

  handleDateForAnalysisChanged(date: Date) {
    this.service.setDateForAnalysis(date);
  }

  handleReferenceDateChanged(date: Date) {
    this.service.setReferenceDate(date);
  }

  handleRangeDateChanged(date: Date[] | any) {
    this.service.setRangeDate(date);
  }

  onInstrumentChange(event: any) {
    if (this.selectedAccount != undefined) {
      this.service.setSelectedInstrument(this.selectedAccount.businesskey);
    }
  }

  onUpload(event: any) {
    for (const file of event.files) {
      CsvImporter.loadFile(file, CSVTypeEnum.MIN,(rows) => this.service.setCashflow2CompareContent(rows));
    }
    // Reset the file input so the same file can be selected again
    //event.originalEvent.target.value = '';
    //event.files = [];
        // Also manually clear the fileUpload component (optional)
    //this.fileUpload.clear();
  }

  setMaxDateRange() {
    const newRangeDates: Date[] = [
      new Date(2005, 0, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    ];
    this.service.setRangeDate(newRangeDates);
  }

  setRange2LastMonth() {
    const newRangeDates: Date[] = [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    ];
    this.service.setRangeDate(newRangeDates);
  }
}