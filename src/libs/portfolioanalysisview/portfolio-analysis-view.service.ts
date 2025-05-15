import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { Position } from '../shared/data-access-mfdata/model/position';

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
  private positions: Position[] = [];

  portfolioEventSubject: Subject<unknown> = new Subject<unknown>();
  
  constructor(private service: MfdataService) {
    this.service.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadPositions(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.service.getPriceEventSubject().subscribe(
      {
        next: () => {
          this.loadPositions();
        },
        error: (e) => console.error(e)
      }
    )
    this.service.tenantChangedSubject.subscribe(
      {
        next: () => {
          this.loadPositions();
        },
        error: (e) => console.error(e)
      }
    )
    this.service.getValueChangedEventSubject().subscribe(
      {
        next: () => {
          this.loadPositions();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadPositions();
  }

  private loadPositions() {
    this.service.getPositions().subscribe(
      {
        next: (positions) => {
          this.positions = positions;
          this.portfolioEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  getPositions() : Position[]{
    return this.positions;
  }

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
