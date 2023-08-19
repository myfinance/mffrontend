import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { TenantService } from '../tenant.service';
import { Instrument } from '@mffrontend/shared/data-access-mfdata';
import { SelectionModel } from '@angular/cdk/collections';

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
  version='na';
  
  constructor(private tenantService: TenantService) {
    this.tenantService.getConfigLoadedSubject().subscribe({
      next:
        data => this.loadTenants(),
      error: 
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
      }
    )
    this.tenantService.getTenantEventSubject().subscribe(
      () => {
        this.loadTenants();
      }
    )
    if(this.tenantService.isInit()) {
      this.loadTenants();
    }
  }

  loadTenants() {
    this.tenantService.getTenants().subscribe(
      (instruments) => {
        this.instruments = instruments;
      }
    )
    /*this.tenantService.getVersion().subscribe(
      (version) => {
        this.version = version;
      }
    )*/
  }

  selectInstrument(instrument: Instrument){
    this.selectedInstrument = instrument;
    this.tenantService.setSelectedTenant(instrument);
  }
}
