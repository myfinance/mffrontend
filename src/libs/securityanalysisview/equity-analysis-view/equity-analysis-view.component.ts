import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SecurityAnalysisViewService } from '../securityanalysisview.service';
import { InstrumentTypeEnum } from '../../shared/data-access-mfdata/model/instrument';
import { SecurityMetrics } from '../../shared/data-access-mfdata/model/securitymetrics';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

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

  loadSecurityMetrics(){
    this.securityMetrics=this.service.getSecurities().filter(sec => sec.instrumentType === InstrumentTypeEnum.EQUITY).map(sec => {
      const pricedate = new Date(sec.priceLastUpdateTs);
      if(isNaN(pricedate.getTime())) {
        (sec as any).priceLastUpdateTs = null;
      }
      const lastUpdateTs = new Date(sec.lastUpdateTs);
      if(isNaN(lastUpdateTs.getTime())) {
        (sec as any).lastUpdateTs = null;
      }
      return sec;
    });
  }


  onRowSelect(event: any) {
    if(this.selectedInstrument!=null){
      this.service.setSelectedInstrument(this.selectedInstrument.businesskey);
    }
   }
}
