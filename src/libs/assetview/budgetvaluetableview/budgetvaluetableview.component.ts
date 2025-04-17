import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AssetviewService } from '../assetview.service';
import { InstrumentDetails } from '../../shared/data-access-mfdata/model/instrumentdetails';

@Component({
  selector: 'mffrontend-budgetvaluetableview',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './budgetvaluetableview.component.html',
  styleUrl: './budgetvaluetableview.component.scss'
})
export class BudgetvaluetableviewComponent {
  budgetDetails: InstrumentDetails[] = [];
  selectedInstrument: InstrumentDetails | undefined;

  constructor(private service: AssetviewService) {
    this.service.budgetValueEventSubject.subscribe({
      next:
        () => this.budgetDetails = this.service.getBudgetDetails(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.budgetDetails = this.service.getBudgetDetails()
  }

  onRowSelect(event: any) {
    if (this.selectedInstrument != null) {
      this.service.setSelectedInstrument(this.selectedInstrument.businesskey);
    }

  }

}