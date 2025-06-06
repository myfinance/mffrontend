import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CsvImporter, CSVTypeEnum } from '../../shared/data-access-mfdata/csvimporter';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'mffrontend-massloadcontroller',
  standalone: true,
  imports: [CommonModule, InputTextModule, FileUploadModule, DropdownModule, FormsModule,ReactiveFormsModule, ButtonModule, SidebarModule],
  templateUrl: './massloadcontroller.component.html',
  styleUrl: './massloadcontroller.component.scss',
})
export class MassloadcontrollerComponent {

  uploadForm: FormGroup;
  selectedFile: File | null = null;
  giros: Instrument[] = [];
  sidebarVisible = false;


  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      giro: ['', [Validators.required]],
    });

    this.transactionService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();
  }

  loadInstruments() {
    this.transactionService.getInstruments().subscribe(
      (instruments) => {
        this.giros = instruments.filter(instrument => instrument.instrumentType === InstrumentTypeEnum.GIRO);
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files?.[0] || null;
  }

  upload() {
    if (this.uploadForm.valid && this.selectedFile) {
      const selectedInstrument = this.uploadForm.value.giro;
      let fileFormat = CSVTypeEnum.C24;
      if(selectedInstrument.description=='GiroCoba'){
        fileFormat = CSVTypeEnum.COBA;
      }
      CsvImporter.loadFile(this.selectedFile, fileFormat,(rows) => this.transactionService.setMassloadContent(rows,selectedInstrument));
      this.sidebarVisible=false;
    }
  }

}
