import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

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
      this.load(file);
    }
  }

  load(file: File) {
    //array varibales to store csv data
    const lines = []; //for headings
    //File reader method
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsText(file);
      reader.onload = (e) => {
        const csv: string = reader.result as string;
        const allTextLines = csv.split("\n");

        //Table Headings
        const headers = allTextLines[0].split(';');
        const data = headers;
        const tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        //Pusd headings to array variable
        lines.push(tarr);

        const arrl = allTextLines.length;
        const rows = [];
        for (let i = 1; i < arrl; i++) {
          const row = allTextLines[i].split(';');
          if (row != null && row[1] != null && row[1] !== "") {
            const minrow = [i.toString(), row[0].toString(), row[3].toString(), row[4].toString(), ''];
            rows.push(minrow);
          }
        }
        this.transactionService.setMassloadContent(rows);
      }
    }

  }


}
