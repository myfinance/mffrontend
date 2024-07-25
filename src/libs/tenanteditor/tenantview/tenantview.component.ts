import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantService } from '../tenant.service';
import { TableModule } from 'primeng/table';
import { Instrument } from '../../shared/data-access-mfdata/shared-data-access-mfdata.module';

@Component({
  selector: 'mffrontend-tenantview',
  standalone: true,
  imports: [CommonModule, TableModule],
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
    this.instruments = this.tenantService.getTenants();
  }

  selectInstrument(instrument: Instrument) {
    this.selectedInstrument = instrument;
    this.tenantService.setSelectedTenant(instrument);
  }

  onRowSelect(event: any) {
    this.tenantService.setSelectedTenant(this.selectedInstrument);
}

  onRowUnselect(event: any) {
    this.tenantService.setSelectedTenant(this.selectedInstrument);
  }
}
