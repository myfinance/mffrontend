import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { Instrument, MfClientService, SharedDataAccessMfClientModule } from '@mffrontend/shared/data-access-mfclient';

@Component({
  selector: 'mffrontend-tenantview',
  standalone: true,
  imports: [CommonModule, SharedDataAccessMfClientModule, MatTableModule],
  templateUrl: './tenantview.component.html',
  styleUrls: ['./tenantview.component.scss'],
})
export class TenantviewComponent {
  instruments: Instrument[] = [];
  displayedColumns: string[] = ['businesskey', 'description', 'isactive'];
  
  constructor(private tenantservice: MfClientService) {
    this.tenantservice.getTenants().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
  }
}
