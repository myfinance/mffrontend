import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AssetviewService } from '../assetview.service';
import { InstrumentDetails } from '../../shared/data-access-mfdata/model/instrumentdetails';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { FilterMetadata } from 'primeng/api';

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
  total: number = 0;
  totaldiff: number =0;

  constructor(private service: AssetviewService) {
    this.service.accValueEventSubject.subscribe({
      next:
        () => this.setData(this.service.getAccountDetails()),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    registerLocaleData(localeDe);
    this.setData(this.service.getAccountDetails())
  }

  tableFilters: { [field: string]: FilterMetadata } = {
    value: { value: 0, matchMode: 'notEquals' }
  };

  setData(instruments:InstrumentDetails[]){
    this.accountDetails = instruments;
    this.total=0;
    this.totaldiff=0;
    instruments.forEach(i=>{
      this.total+=i.value; 
      this.totaldiff+=i.diff;
    })
  }

  onRowSelect(event: any) {
  }

}
