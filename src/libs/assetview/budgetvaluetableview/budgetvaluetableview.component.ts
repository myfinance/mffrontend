import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AssetviewService } from '../assetview.service';
import { InstrumentDetails } from '../../shared/data-access-mfdata/model/instrumentdetails';
import { ButtonModule } from 'primeng/button';
import { FilterMetadata } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

@Component({
  selector: 'mffrontend-budgetvaluetableview',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './budgetvaluetableview.component.html',
  styleUrl: './budgetvaluetableview.component.scss'
})
export class BudgetvaluetableviewComponent {
  budgetDetails: InstrumentDetails[] = [];
  selectedInstrument: InstrumentDetails | undefined;
  total: number = 0;
  totaldiff: number =0;

  tableFilters: { [field: string]: FilterMetadata } = {
    value: { value: 0, matchMode: 'notEquals' },
    diff: { value: 0, matchMode: 'notEquals' }
  };

  constructor(private service: AssetviewService) {
    this.service.budgetValueEventSubject.subscribe({
      next:
        () => this.setData(this.service.getBudgetDetails()),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    registerLocaleData(localeDe);
    this.setData(this.service.getBudgetDetails())
  }

  setData(instruments:InstrumentDetails[]){
    this.budgetDetails = instruments;
    this.total=0;
    this.totaldiff=0;
    instruments.forEach(i=>{
      this.total+=i.value; 
      this.totaldiff+=i.diff;
    })
  }

  onRowSelect(selectedInstrument: InstrumentDetails) {
    if (selectedInstrument != null) {
      if (this.selectedInstrument?.businesskey === selectedInstrument.businesskey){
        this.selectedInstrument = undefined;
        this.service.setSelectedInstrument(""); 
      } else {
        this.selectedInstrument=selectedInstrument;
        this.service.setSelectedInstrument(selectedInstrument.businesskey);
      }

    }

  }

  getGroupRows(parentKey: string): InstrumentDetails[] {
    return this.budgetDetails.filter(d => d.instrumentParent === parentKey);
  }

  calculateValueTotal(name: string) {
    let total = 0;

    if (this.budgetDetails) {
      for (let budgetDetail of this.budgetDetails) {
        if (budgetDetail.instrumentParent === name) {
          total += budgetDetail.value;
        }
      }
    }

    return total;
  }

  calculateDiffTotal(name: string) {
    let total = 0;

    if (this.budgetDetails) {
      for (let budgetDetail of this.budgetDetails) {
        if (budgetDetail.instrumentParent === name) {
          total += (budgetDetail.value - budgetDetail.referenceValue);
        }
      }
    }

    return total;
  }

}