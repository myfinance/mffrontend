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
    this.instrumentService.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.instrumentService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();
  }

  loadInstruments() {
    this.instrumentService.getInstruments().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
  }

  onRowSelect(event: any) {
    this.instrumentService.setSelectedInstrument(this.selectedInstrument);
}

  onRowUnselect(event: any) {
    this.instrumentService.setSelectedInstrument(this.selectedInstrument);
  }
}