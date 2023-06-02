import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument, MfrestserviceService, SharedDataAccessMfclientModule } from '@mffrontend/shared/data-access-mfclient';

@Component({
  selector: 'mffrontend-tenantview',
  standalone: true,
  imports: [CommonModule, SharedDataAccessMfclientModule],
  templateUrl: './tenantview.component.html',
  styleUrls: ['./tenantview.component.scss'],
})
export class TenantviewComponent {
  instruments: Instrument[] = [];
  
  constructor(private tenantservice: MfrestserviceService) {
    this.tenantservice.getTenants().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
  }
}
