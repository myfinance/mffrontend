import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
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
  
  constructor(private tenantService: TenantService) {
    this.tenantService.getConfigLoadedSubject().subscribe(
      () => {
        this.loadTenants();
      }
    )

  }

  loadTenants() {
    this.tenantService.getTenants().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
  }
}
