import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioAnalysisViewService {
  private dateForAnalysis = new Date(Date.now());
  private referenceDate = new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date().getDate());
  private rangeDates: Date[] = [
    new Date(new Date().getFullYear()-10, new Date().getMonth(), new Date().getDate()),
    new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  ];

  constructor() { }

  getDateForAnalysis(): Date {
    return this.dateForAnalysis;
  }
  
  getReferenceDate(): Date {
    return this.referenceDate;
  }

  setReferenceDate(referenceDate:Date) {
    this.referenceDate = referenceDate;
    //this.loadSecurities();
  }

  getRangeDates(): Date[] {
    return this.rangeDates;
  }

  setRangeDate(rangeDate:Date[]) {
    this.rangeDates[0] = rangeDate[0];
    this.rangeDates[1] = rangeDate[1];
    //this.loadSecurities();
  }
}
