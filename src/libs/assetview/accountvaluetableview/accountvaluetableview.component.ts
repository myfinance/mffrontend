import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AssetviewService } from '../assetview.service';
import { InstrumentDetails } from '../../shared/data-access-mfdata/model/instrumentdetails';

@Component({
  selector: 'mffrontend-accountvaluetableview',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './accountvaluetableview.component.html',
  styleUrl: './accountvaluetableview.component.scss'
})
export class AccountvaluetableviewComponent {
  accountDetails: InstrumentDetails[] = [];
  selectedInstrument: InstrumentDetails | undefined;

  constructor(private service: AssetviewService) {
    this.service.accValueEventSubject.subscribe({
      next:
        () => this.accountDetails = this.service.getAccountDetails(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.accountDetails = this.service.getAccountDetails()
  }

  onRowSelect(event: any) {
    if (this.selectedInstrument != null) {
      this.service.setSelectedInstrument(this.selectedInstrument.businesskey);
    }

  }

}
