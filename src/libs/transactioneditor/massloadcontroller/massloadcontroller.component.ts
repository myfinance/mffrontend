import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CsvImporter, CSVTypeEnum } from '../../shared/data-access-mfdata/csvimporter';

@Component({
  selector: 'mffrontend-massloadcontroller',
  standalone: true,
  imports: [CommonModule, InputTextModule, FileUploadModule],
  templateUrl: './massloadcontroller.component.html',
  styleUrl: './massloadcontroller.component.scss',
})
export class MassloadcontrollerComponent {


  constructor(private transactionService: TransactionService) {
  }

  onUpload(event: any) {
    for (const file of event.files) {
      CsvImporter.loadFile(file, CSVTypeEnum.COBA,this.transactionService.setMassloadContent);
    }

    //event.originalEvent.target.value = '';
    //event.files = [];
  
    // Also manually clear the fileUpload component (optional)
    //this.fileUpload.clear();
  }
}
