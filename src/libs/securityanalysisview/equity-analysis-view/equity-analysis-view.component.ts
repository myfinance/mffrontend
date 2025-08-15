import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';
import { SecurityDetails } from '../../shared/data-access-mfdata/model/securitydetails';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { SecurityMetrics } from '../../shared/data-access-mfdata/model/securitymetrics';

@Component({
  selector: 'app-equity-analysis-view',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './equity-analysis-view.component.html',
  styleUrl: './equity-analysis-view.component.scss'
})
export class EquityAnalysisViewComponent {
  securityMetrics: SecurityMetrics[] = [];
  displayedColumns: string[] = ['businesskey', 'description', 'value', 'referenceValue','instrumentType'];
  selectedInstrument: SecurityMetrics | undefined;
  version = 'na';

  constructor(private service: SecurityAnalysisViewService) {
    this.service.securityValueEventSubject.subscribe({
      next:
        () => this.securityMetrics=this.service.getSecurities().filter(sec => sec.instrumentType === InstrumentTypeEnum.EQUITY),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.securityMetrics=this.service.getSecurities()
  }

  onRowSelect(event: any) {
    if(this.selectedInstrument!=null){
      this.service.setSelectedInstrument(this.selectedInstrument.businesskey);
    }
   }
}
