import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TenantService } from '../tenant.service';
import { Instrument } from '@mffrontend/shared/data-access-mfdata';

@Component({
  selector: 'mffrontend-tenantview',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './tenantview.component.html',
  styleUrls: ['./tenantview.component.scss'],
})
export class TenantviewComponent {
  instruments: Instrument[] = [];
  displayedColumns: string[] = ['businesskey', 'description', 'isactive'];
  selectedInstrument: Instrument | undefined;
  version = 'na';

  constructor(private tenantService: TenantService) {
    this.tenantService.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadTenants(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.tenantService.getTenantEventSubject().subscribe(
      () => {
        this.loadTenants();
      }
    )
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getTenants().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
  }

  selectInstrument(instrument: Instrument) {
    this.selectedInstrument = instrument;
    this.tenantService.setSelectedTenant(instrument);
  }
}
