import { Injectable } from "@angular/core";
import { MfdataService } from "../shared/data-access-mfdata/mfdata.service";
import { SecurityDetails } from "../shared/data-access-mfdata/model/securitydetails";
import { Subject } from "rxjs/internal/Subject";
import { ValueCurve } from "../shared/data-access-mfdata/model/valuecurve";

@Injectable({
    providedIn: 'root'
  })
  export class SecurityAnalysisViewService {
    private dateForAnalysis = new Date(Date.now());
    private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
    private rangeDates: Date[] = [
      new Date(new Date().getFullYear()-1, new Date().getMonth(), new Date().getDate()),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    ];
    private securityDetails: SecurityDetails[] = [];
      //something changed that influences the securities and values
    securityValueEventSubject: Subject<unknown> = new Subject<unknown>();
    chartEventSubject: Subject<unknown> = new Subject<unknown>();
    private selectedInstrumentKey="";
    private valueCurve:ValueCurve | undefined;

    constructor(private service: MfdataService) {

      this.service.getInstrumentEventSubject().subscribe(
        {
          next: () => {
            this.loadSecurities();
          },
          error: (e) => console.error(e)
        }
      )
      this.service.getValueChangedEventSubject().subscribe(
        {
          next: () => {
            this.loadSecurities();
          },
          error: (e) => console.error(e)
        }
      )
      this.loadSecurities();
    }

    import() {
        this.service.startMarketdataImport();
    }

    getDateForAnalysis(): Date {
      return this.dateForAnalysis;
    }
    
    getReferenceDate(): Date {
      return this.referenceDate;
    }
  
    setReferenceDate(referenceDate:Date) {
      this.referenceDate = referenceDate;
      this.loadSecurities();
    }
  
    getRangeDates(): Date[] {
      return this.rangeDates;
    }
  
    setRangeDate(rangeDate:Date[]) {
      this.rangeDates[0] = rangeDate[0];
      this.rangeDates[1] = rangeDate[1];
      this.loadSecurities();
    }

    getSecurities():SecurityDetails[] {
      return this.securityDetails;
    }

    private loadSecurities() {
      this.service.getSecurityDetails(this.dateForAnalysis, this.referenceDate).subscribe(
        {
          next: (instrumentDetails) => {
            this.securityDetails = instrumentDetails;
            this.securityValueEventSubject.next(true);
          },
          error: (e) => console.error(e)
        }
      )
    }

    private loadSecuritiyChart() {
      if(this.selectedInstrumentKey!=""){
        this.service.getInstrumentValueCurve(this.selectedInstrumentKey,this.rangeDates[0], this.rangeDates[1]).subscribe(
          {
            next: (values) => {
              this.valueCurve = values;
              this.chartEventSubject.next(true);
            },
            error: (e) => console.error(e)
          }
        )
      }

    }

    getValueCurve():ValueCurve{
      if(this.valueCurve) return this.valueCurve;
      return new ValueCurve(new Map(),"","","");
    }

    setSelectedInstrument(busnesskey: string) {
      this.selectedInstrumentKey = busnesskey;
      this.loadSecuritiyChart();
    }
    
  }