import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { InstrumentFullDetails } from '../shared/data-access-mfdata/model/instrumentfulldetails';
import { Instrument } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { InstrumentTypeEnum } from '../shared/data-access-mfdata/model/instrument';
import { CsvRow } from '../shared/data-access-mfdata/csvimporter';

@Injectable({
  providedIn: 'root'
})
export class AccountanalysisService {
  private accounts: Instrument[] = [];
  private selectedInstrumentKey="";
  private selectedInstrumentFullDetails: InstrumentFullDetails | undefined;
  private content: CsvRow[]=[]

  private dateaforAnalysis = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
  private rangeDates: Date[] = [
    new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate()),
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  ];

  //something changed that influences the accounts and values
  accValueEventSubject: Subject<unknown> = new Subject<unknown>();
  //something changed that influences selcted Instrument or its values
  selectedInstrumentEventSubject: Subject<unknown> = new Subject<unknown>();
  //snew file to compare the cashflows was selected
  newFileSelectedSubject: Subject<unknown> = new Subject<unknown>()

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
          this.loadInstrumentDetails();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadData();
  }


  getAccounts(): Instrument[] {
    return this.accounts;
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
    this.loadInstrumentDetails();
  }

  loadData(){
    this.loadInstruments();
    this.loadInstrumentDetails();

  }


  private loadInstruments() {
    this.mfDataService.getAccounts().subscribe(
      {
        next: (instruments) => {
          this.accounts = instruments.filter(i=>
            i.active==true && 
            (i.instrumentType==InstrumentTypeEnum.GIRO 
                ||i.instrumentType==InstrumentTypeEnum.BUILDINGSAVINGACCOUNT 
                || i.instrumentType==InstrumentTypeEnum.LOAN
                || i.instrumentType==InstrumentTypeEnum.MONEYATCALL
                || i.instrumentType==InstrumentTypeEnum.TIMEDEPOSIT
            )
          );
          if(this.accounts!=null && this.accounts.length>0 && this.selectedInstrumentKey==""){
            this.setSelectedInstrument(this.accounts[0].businesskey);
          }
          this.accValueEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadInstrumentDetails() {
    if(this.selectedInstrumentKey!== null && this.selectedInstrumentKey!==""){
      this.mfDataService.getInstrumenDetails(this.selectedInstrumentKey, this.dateaforAnalysis, this.referenceDate, this.rangeDates[0], this.rangeDates[1], this.rangeDates[0], this.rangeDates[1]).subscribe(
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

  getCashflow2CompareContent(): CsvRow[]{
    if(this.content !=undefined)
      return this.content;
    return [];
  }

  setCashflow2CompareContent(content: CsvRow[]) {
    this.content = content.sort((a, b) => a.transactionDate.getTime() - b.transactionDate.getTime());
    this.newFileSelectedSubject.next(true);
  }

} 