import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { InstrumentDetails } from '../shared/data-access-mfdata/model/instrumentdetails';
import { InstrumentFullDetails } from '../shared/data-access-mfdata/model/instrumentfulldetails';

@Injectable({
  providedIn: 'root'
})
export class AssetviewService {

  private accountDetails: InstrumentDetails[] = [];
  private budgetDetails: InstrumentDetails[] = [];
  private selectedInstrumentKey="";
  private selectedInstrumentFullDetails: InstrumentFullDetails | undefined;

  private tenantValueCurve: Map<Date, number> = new Map<Date, number>();

  private dateaforAnalysis = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
  private rangeDates: Date[] = [
    new Date(2024, 1, 1),
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  ];

  //something changed that influences the accounts and values
  accValueEventSubject: Subject<unknown> = new Subject<unknown>();
  //something changed that influences the budgets and values
  budgetValueEventSubject: Subject<unknown> = new Subject<unknown>();
  //something changed that influences the tenant values
  tenantValueEventSubject: Subject<unknown> = new Subject<unknown>();
  //something changed that influences selcted Instrument or its values
  selectedInstrumentEventSubject: Subject<unknown> = new Subject<unknown>();

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

  setSelectedInstrument(busnesskey: string) {
    this.selectedInstrumentKey = busnesskey;
    this.loadInstrumentDetails();
  }

  getSelectedInstrument(): InstrumentFullDetails|undefined {
    return this.selectedInstrumentFullDetails;
  }


  getDateForAnalysis(): Date {
    return this.dateaforAnalysis;
  }

  setDateForAnalysis(dateaforAnalysis:Date) {
    this.dateaforAnalysis = dateaforAnalysis;
    this.loadDetails();
    this.loadInstrumentDetails();
  }

  getReferenceDate(): Date {
    return this.referenceDate;
  }

  setReferenceDate(referenceDate:Date) {
    this.referenceDate = referenceDate;
    this.loadDetails();
    this.loadInstrumentDetails();
  }

  getRangeDates(): Date[] {
    return this.rangeDates;
  }

  setRangeDate(rangeDate:Date[]) {
    this.rangeDates[0] = rangeDate[0];
    this.rangeDates[1] = rangeDate[1];
    this.loadTenantValueCurve();
    this.loadInstrumentDetails();
  }

  getTenantValueCurve(): Map<Date, number> {
    return this.tenantValueCurve;
  }

  loadData(){
    this.loadTenantValueCurve();
    this.loadDetails();
    this.loadInstrumentDetails();

  }

  loadDetails(){
    this.loadAccountDetails();
    this.loadBudgetDetails();

  }

  private loadTenantValueCurve(){
    this.mfDataService.getInstrumentValueCurve(this.mfDataService.currentTenant.businesskey, this.rangeDates[0], this.rangeDates[1]).subscribe(
      {
        next: (valueCurve) => {
          this.tenantValueCurve = valueCurve.valueCurve;
          this.tenantValueEventSubject.next(true);
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
          this.budgetValueEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadInstrumentDetails() {
    if(this.selectedInstrumentKey!== null && this.selectedInstrumentKey!==""){
      this.mfDataService.getInstrumenDetails(this.selectedInstrumentKey, this.dateaforAnalysis, this.referenceDate, this.rangeDates[0], this.rangeDates[1], this.referenceDate, this.dateaforAnalysis).subscribe(
        {
          next: (instrumentFullDetails) => {
            this.selectedInstrumentFullDetails = instrumentFullDetails;
            this.selectedInstrumentEventSubject.next(true);
          },
          error: (e) => console.error(e)
        }
      )
    }

  }

} 