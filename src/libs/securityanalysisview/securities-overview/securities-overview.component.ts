import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';
import { SecurityDetails } from '../../shared/data-access-mfdata/model/securitydetails';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { SecurityMetrics } from '../../shared/data-access-mfdata/model/securitymetrics';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

@Component({
  selector: 'app-securities-overview',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './securities-overview.component.html',
  styleUrl: './securities-overview.component.scss'
})
export class SecuritiesOverviewComponent {
  securityMetrics: SecurityMetrics[] = [];
  displayedColumns: string[] = ['businesskey', 'description', 'value', 'referenceValue','instrumentType'];
  selectedInstrument: SecurityDetails | undefined;
  version = 'na';

  constructor(private service: SecurityAnalysisViewService) {
    registerLocaleData(localeDe);
    this.service.securityValueEventSubject.subscribe({
      next:
        () => this.loadSecurityMetrics(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.loadSecurityMetrics();
  }

  onRowSelect(event: any) {
    if(this.selectedInstrument!=null){
      this.service.setSelectedInstrument(this.selectedInstrument.businesskey);
    }
   }

   loadSecurityMetrics(){ 
    this.securityMetrics = this.service.getSecurities().filter(sec => sec.instrumentType === InstrumentTypeEnum.CURRENCY && sec.description !== 'Euro').map(sec => {
      const date = new Date(sec.priceLastUpdateTs);
      if(isNaN(date.getTime())) {
        (sec as any).priceLastUpdateTs = null;
      }
      return sec;
    });
   }

}
