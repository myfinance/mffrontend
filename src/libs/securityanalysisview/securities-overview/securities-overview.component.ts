import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';
import { SecurityDetails } from '../../shared/data-access-mfdata/model/securitydetails';

@Component({
  selector: 'app-securities-overview',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './securities-overview.component.html',
  styleUrl: './securities-overview.component.scss'
})
export class SecuritiesOverviewComponent {
  instruments: SecurityDetails[] = [];
  displayedColumns: string[] = ['businesskey', 'description', 'value', 'referenceValue','instrumentType'];
  selectedInstrument: SecurityDetails | undefined;
  version = 'na';

  constructor(private service: SecurityAnalysisViewService) {
    this.service.securityValueEventSubject.subscribe({
      next:
        () => this.instruments=this.service.getSecurities(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.instruments=this.service.getSecurities()
  }

  onRowSelect(event: any) {
    if(this.selectedInstrument!=null){
      this.service.setSelectedInstrument(this.selectedInstrument.businesskey);
    }
   }

}
