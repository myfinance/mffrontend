import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { InstrumentService } from '../instrument.service';
import { Instrument } from '@mffrontend/shared/data-access-mfdata';

@Component({
  selector: 'mffrontend-instrumentview',
  standalone: true,
  imports: [CommonModule, MatTableModule],
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
        () => this.loadTenants(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.instrumentService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadTenants();
      }
    )
    this.loadTenants();
  }

  loadTenants() {
    this.instrumentService.getInstruments().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
  }

  selectInstrument(instrument: Instrument) {
    this.selectedInstrument = instrument;
    this.instrumentService.setSelectedInstrument(instrument);
  }
}