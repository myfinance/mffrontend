import { Injectable } from '@angular/core';
import { MfdataService, Instrument } from '@mffrontend/shared/data-access-mfdata';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetviewService {

  private accounts: Instrument[] = [];
  private selectedAccountKey="";
  private accountValues = new Map<string, number>([]);
  private dateaforAnalysis = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
  private rangeDates: Date[] = [
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 
    new Date(2012, 1, 1)
  ];
  accValueEventSubject: Subject<unknown> = new Subject<unknown>();
  selectedAccEventSubject: Subject<unknown> = new Subject<unknown>();


  constructor(private mfDataService: MfdataService) {
    this.mfDataService.tenantChangedSubject.subscribe(
      {
        next: () => {
          this.loadAccounts();
        },
        error: (e) => console.error(e)
      }
    )
    this.mfDataService.getInstrumentEventSubject().subscribe(
      {
        next: () => {
          this.loadAccounts();
        },
        error: (e) => console.error(e)
      }
    )
    this.mfDataService.getTransactionEventSubject().subscribe(
      {
        next: () => {
          this.loadValues();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadAccounts();
  }

  getAccounts(): Instrument[] {
    return this.accounts;
  }
  getAccountValues(): Map<string, number> {
    return this.accountValues;
  }

  setSelectedAccount(busnesskey: string) {
    this.selectedAccountKey = busnesskey;
    this.selectedAccEventSubject.next(true);
  }

  getSelectedAccountValue(): number {
    const value = this.accountValues.get(this.selectedAccountKey);
    if (value!==undefined) {
      return value;
    }
    else return 0.0;
  }


  getDateForAnalysis(): Date {
    return this.dateaforAnalysis;
  }

  setDateForAnalysis(dateaforAnalysis:Date) {
    this.dateaforAnalysis = dateaforAnalysis;
    this.selectedAccEventSubject.next(true);
  }

  getReferenceDate(): Date {
    return this.referenceDate;
  }

  setReferenceDate(referenceDate:Date) {
    this.referenceDate = referenceDate;
    this.selectedAccEventSubject.next(true);
  }

  getRangeDates(): Date[] {
    return this.rangeDates;
  }

  setRangeDate(rangeDate:Date[]) {
    this.rangeDates[0] = rangeDate[0];
    this.rangeDates[1] = rangeDate[1];
    this.selectedAccEventSubject.next(true);
  }

  private loadAccounts() {
    this.mfDataService.getAccounts().subscribe(
      {
        next: (accounts) => {
          this.accounts = accounts;
          this.loadValues();
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadValues() {
    this.accounts.forEach(account => {
      this.mfDataService.getInstrumentValue(account.businesskey, new Date()).subscribe(
        {
          next: (value) => {
            this.accountValues.set(account.businesskey, value);
            this.accValueEventSubject.next(true);
          },
          error: (e) => console.error(e)
        }
      )
    })

  }

} 