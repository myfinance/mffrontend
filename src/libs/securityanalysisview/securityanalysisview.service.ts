import { Injectable } from "@angular/core";
import { MfdataService } from "../shared/data-access-mfdata/mfdata.service";
import { SecurityDetails } from "../shared/data-access-mfdata/model/securitydetails";
import { Subject } from "rxjs/internal/Subject";
import { ValueCurve } from "../shared/data-access-mfdata/model/valuecurve";
import { MarketDataImportTypeEnum, SecurityMetrics } from "../shared/data-access-mfdata/model/securitymetrics";
import { Instrument, InstrumentTypeEnum } from "../shared/data-access-mfdata/model/instrument";


export interface tableRowTuple{
	year: number;
	value: number;
}
@Injectable({
    providedIn: 'root'
  })
  export class SecurityAnalysisViewService {
    private dateForAnalysis = new Date(Date.now());
    private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
    private rangeDates: Date[] = [
      new Date(new Date().getFullYear()-10, new Date().getMonth(), new Date().getDate()),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    ];
    private securityMetrics: SecurityMetrics[] = [];
      //something changed that influences the securities and values
    securityValueEventSubject: Subject<unknown> = new Subject<unknown>();
    chartEventSubject: Subject<unknown> = new Subject<unknown>();
    private selectedInstrumentKey="";
    private valueCurve:ValueCurve | undefined;
    private currencies: Instrument[] = [];
    instrumentEventSubject: Subject<unknown> = new Subject<unknown>();
    selectInstrumentEventSubject: Subject<unknown> = new Subject<unknown>();

    constructor(private service: MfdataService) {
      this.service.getConfigLoadedSubject().subscribe({
        next:
          () => {
            this.loadSecurities();
            this.loadInstruments();
          },
        error:
          (e) => {
            console.error(e);
            alert('Invalid Credentials');
          }
      })
      this.service.getInstrumentEventSubject().subscribe(
        {
          next: 
           () => {
            this.loadSecurities();
            this.loadInstruments();
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
      this.loadInstruments();
    }

    importTimeSeriesWeekly() {
        this.service.startMarketdataImport(MarketDataImportTypeEnum.TIME_SERIES_WEEKLY);
    }

    importTimeSeriesWeekly4SelectedInstrument() {
      this.service.startMarketdataImport4Instrument(MarketDataImportTypeEnum.TIME_SERIES_WEEKLY, this.selectedInstrumentKey);
    }

    importSecurityMetrics() {
        this.service.startMarketdataImport(MarketDataImportTypeEnum.SECURITYMETRICS);
    }

    importSecurityMetrics4Instrument() {
      this.service.startMarketdataImport4Instrument(MarketDataImportTypeEnum.SECURITYMETRICS, this.selectedInstrumentKey);
    }

    importPrevClose() {
        this.service.startMarketdataImport(MarketDataImportTypeEnum.PREV_CLOSE);
    }

    importPrevClose4SelectedInstrument() {
      this.service.startMarketdataImport4Instrument(MarketDataImportTypeEnum.PREV_CLOSE, this.selectedInstrumentKey);
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

    getSecurities():SecurityMetrics[] {
      return this.securityMetrics;
    }

    getCurrencies():Instrument[] {
      return this.currencies;
    }

    private loadSecurities() {
      this.service.getSecurityMetrics().subscribe(
        {
          next: (securityMetrics) => {
            this.securityMetrics = securityMetrics;
            this.securityValueEventSubject.next(true);
          },
          error: (e) => console.error(e)
        }
      )
    }

    private loadInstruments() {
      this.service.getAllInstruments().subscribe(
        {
          next: (instruments) => {
            this.currencies = instruments.filter(i => i.instrumentType == InstrumentTypeEnum.CURRENCY);
            this.instrumentEventSubject.next(true);
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
      this.selectInstrumentEventSubject.next(true);
    }

    getSelectedInstrument():SecurityMetrics {
      return this.getSecurities().filter(i=>i.businesskey==this.selectedInstrumentKey)[0];
    }

  saveSecurityMetrics(securityMetrics: SecurityMetrics) {
    return this.service.saveSecurityMetrics(securityMetrics);
  }    
    
  }