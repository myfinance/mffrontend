import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentService } from '../instrument.service';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'mffrontend-instrumentview',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './instrumentview.component.html',
  styleUrls: ['./instrumentview.component.scss'],
})
export class InstrumentviewComponent {
  instruments: Instrument[] = [];
  displayedColumns: string[] = ['businesskey', 'description', 'isactive'];
  selectedInstrument: Instrument | undefined;
  version = 'na';

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