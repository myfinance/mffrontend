import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentService } from '../instrument.service';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mffrontend-instrumentview',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, DropdownModule, FormsModule],
  templateUrl: './instrumentview.component.html',
  styleUrls: ['./instrumentview.component.scss'],
})
export class InstrumentviewComponent {
  instruments: Instrument[] = [];
  displayedColumns: string[] = ['businesskey', 'description', 'isactive'];
  selectedInstrument: Instrument | undefined;
  version = 'na';
  filterValue: any;

statuses: any[] = [
  { label: 'True', value: 'true' },
  { label: 'False', value: 'false' }
];

  constructor(private instrumentService: InstrumentService) {
    this.instrumentService.newInstrumentsLoadedSubject.subscribe({
      next:
        () => this.instruments=this.instrumentService.getInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.instruments=this.instrumentService.getInstruments()
  }

  onRowSelect(event: any) {
    if(this.selectedInstrument!=null){
      this.instrumentService.setSelectedInstrument(this.selectedInstrument.businesskey);
    }
    
}

  onRowUnselect(event: any) {
    this.instrumentService.deSelectInstrument();
  }
}