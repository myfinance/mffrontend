import { Injectable } from '@angular/core';
import { MfdataService } from '@mffrontend/shared/data-access-mfdata';
import { InstrumentDetails } from 'libs/shared/data-access-mfdata/src/lib/model/instrumentdetails';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetviewService {

  private instrumentDetails: InstrumentDetails[] = [];
  private selectedAccountKey="";

  private dateaforAnalysis = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
  private rangeDates: Date[] = [
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 
    new Date(2012, 1, 1)
  ];

  //something changed that influences the accounts and there values
  accValueEventSubject: Subject<unknown> = new Subject<unknown>();


  constructor(private mfDataService: MfdataService) {
    this.mfDataService.tenantChangedSubject.subscribe(
      {
        next: () => {
          this.loadInstrumentDetails();
        },
        error: (e) => console.error(e)
      }
    )
    this.mfDataService.getInstrumentEventSubject().subscribe(
      {
        next: () => {
          this.loadInstrumentDetails();
        },
        error: (e) => console.error(e)
      }
    )
    this.mfDataService.getTransactionEventSubject().subscribe(
      {
        next: () => {
          this.loadInstrumentDetails();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadInstrumentDetails();
  }


  getInstrumentDetails(): InstrumentDetails[] {
    return this.instrumentDetails;
  }

  setSelectedAccount(busnesskey: string) {
    this.selectedAccountKey = busnesskey;
    this.accValueEventSubject.next(true);
  }

  getSelectedAccountValue(): number {
    //const value = this.accountValues.get(this.selectedAccountKey);
    //if (value!==undefined) {
    //  return value;
    //}
    //else 
    return 0.0;
  }


  getDateForAnalysis(): Date {
    return this.dateaforAnalysis;
  }

  setDateForAnalysis(dateaforAnalysis:Date) {
    this.dateaforAnalysis = dateaforAnalysis;
    this.loadInstrumentDetails();
  }

  getReferenceDate(): Date {
    return this.referenceDate;
  }

  setReferenceDate(referenceDate:Date) {
    this.referenceDate = referenceDate;
    this.loadInstrumentDetails();
  }

  getRangeDates(): Date[] {
    return this.rangeDates;
  }

  setRangeDate(rangeDate:Date[]) {
    this.rangeDates[0] = rangeDate[0];
    this.rangeDates[1] = rangeDate[1];
    this.accValueEventSubject.next(true);
  }

  private loadInstrumentDetails() {
    this.mfDataService.getDetailedAccounts(this.dateaforAnalysis, this.referenceDate).subscribe(
      {
        next: (instrumentDetails) => {
          this.instrumentDetails = instrumentDetails;
          this.accValueEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

} 