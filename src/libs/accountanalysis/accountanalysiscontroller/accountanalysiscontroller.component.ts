import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { AccountanalysisService } from '../accountanalysis.service';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { DropdownModule } from 'primeng/dropdown';
import { CsvImporter, CSVTypeEnum } from '../../shared/data-access-mfdata/csvimporter';
import { FileUploadModule } from 'primeng/fileupload';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';

@Component({
  selector: 'mffrontend-accountanalysiscontroller',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule, SidebarModule, DropdownModule, FileUploadModule,ReactiveFormsModule],
  templateUrl: './accountanalysiscontroller.component.html',
  styleUrl: './accountanalysiscontroller.component.scss'
})
export class AccountanalysiscontrollerComponent {
  dateForAnalysis: Date | undefined;
  referenceDate: Date;
  rangeDates: Date[] | undefined;
  accounts: Instrument[] = [];
  selectedAccount: Instrument | undefined;
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  sidebarVisible = false;

  constructor(private service: AccountanalysisService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
    });
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

  onFileSelected(event: any) {
    this.selectedFile = event.files?.[0] || null;
  }

  upload() {
    if (this.uploadForm.valid && this.selectedFile && this.selectedAccount != undefined && this.selectedAccount.instrumentType== InstrumentTypeEnum.GIRO) {
      let fileFormat = CSVTypeEnum.C24;
      if(this.selectedAccount.description=='GiroCoba'){
        fileFormat = CSVTypeEnum.COBA;
      }
      CsvImporter.loadFile(this.selectedFile, fileFormat,(rows) => this.service.setCashflow2CompareContent(rows));
      this.sidebarVisible=false;
    }
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