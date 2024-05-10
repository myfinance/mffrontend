import { Injectable } from '@angular/core';
import { MfdataService } from '@mffrontend/shared/data-access-mfdata';
import { InstrumentDetails } from 'libs/shared/data-access-mfdata/src/lib/model/instrumentdetails';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetviewService {

  private accountDetails: InstrumentDetails[] = [];
  private budgetDetails: InstrumentDetails[] = [];
  private selectedAccountKey="";

  private tenantValueCurve: Map<Date, number> = new Map<Date, number>();

  private dateaforAnalysis = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
  private rangeDates: Date[] = [
    new Date(2024, 1, 1),
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  ];

  //something changed that influences the accounts and there values
  accValueEventSubject: Subject<unknown> = new Subject<unknown>();


  constructor(private mfDataService: MfdataService) {
    this.mfDataService.tenantChangedSubject.subscribe(
      {
        next: () => {
          this.loadData();
        },
        error: (e) => console.error(e)
      }
    )
    this.mfDataService.getInstrumentEventSubject().subscribe(
      {
        next: () => {
          this.loadData();
        },
        error: (e) => console.error(e)
      }
    )
    this.mfDataService.getTransactionEventSubject().subscribe(
      {
        next: () => {
          this.loadData();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadData();
  }


  getAccountDetails(): InstrumentDetails[] {
    return this.accountDetails;
  }

  getBudgetDetails(): InstrumentDetails[] {
    return this.budgetDetails;
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
    this.loadAccountDetails();
  }

  getReferenceDate(): Date {
    return this.referenceDate;
  }

  setReferenceDate(referenceDate:Date) {
    this.referenceDate = referenceDate;
    this.loadAccountDetails();
  }

  getRangeDates(): Date[] {
    return this.rangeDates;
  }

  setRangeDate(rangeDate:Date[]) {
    this.rangeDates[0] = rangeDate[0];
    this.rangeDates[1] = rangeDate[1];
    this.loadTenantValueCurve();
  }

  getTenantValueCurve(): Map<Date, number> {
    return this.tenantValueCurve;
  }

  loadData(){
    this.loadTenantValueCurve();
    this.loadAccountDetails();
    this.loadBudgetDetails();

  }

  private loadTenantValueCurve(){
    this.mfDataService.getInstrumentValueCurve(this.mfDataService.currentTenant.businesskey, this.rangeDates[0], this.rangeDates[1]).subscribe(
      {
        next: (valueCurve) => {
          this.tenantValueCurve = valueCurve.valueCurve;
          this.accValueEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadAccountDetails() {
    this.mfDataService.getDetailedAccounts(this.dateaforAnalysis, this.referenceDate).subscribe(
      {
        next: (instrumentDetails) => {
          this.accountDetails = instrumentDetails;
          this.accValueEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadBudgetDetails() {
    this.mfDataService.getDetailedBudgets(this.dateaforAnalysis, this.referenceDate).subscribe(
      {
        next: (instrumentDetails) => {
          this.budgetDetails = instrumentDetails;
          this.accValueEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

} 