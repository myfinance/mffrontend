import { Injectable } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { Position } from '../shared/data-access-mfdata/model/position';
import { Instrument } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { ValuationTypeEnum } from '../shared/data-access-mfdata/model/valuecurve';
import { PortfolioMetrics } from '../shared/data-access-mfdata/model/portfoliometrics';
import { PositionMetrics } from '../shared/data-access-mfdata/model/positionmetrics';

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
  private giros: Instrument[] = [];
  private sumOfCash: number = 0;
  private portfolioMetrics: PortfolioMetrics[] = [];
  private positionMetrics: PositionMetrics[] = [];

  portfolioEventSubject: Subject<unknown> = new Subject<unknown>();
  
  constructor(private service: MfdataService) {
    this.service.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadData(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.service.getPriceEventSubject().subscribe(
      {
        next: () => {
          this.loadData();
        },
        error: (e) => console.error(e)
      }
    )
    this.service.tenantChangedSubject.subscribe(
      {
        next: () => {
          this.loadData();
        },
        error: (e) => console.error(e)
      }
    )
    this.service.getValueChangedEventSubject().subscribe(
      {
        next: () => {
          this.loadData();
        },
        error: (e) => console.error(e)
      }
    )
    this.service.getInstrumentEventSubject().subscribe(
      {
        next: () => {
          this.loadInstruments();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadData();
  }

  private loadData() {
    this.loadPositions();
    this.loadInstruments();
    this.loadPortfolioMetrics();
    this.loadPositionMetrics();
  }

  private loadInstruments() {
    this.service.getAccounts().subscribe(
      {
        next: (instruments) => {
          this.giros = instruments.filter(i=>i.instrumentType=='GIRO');
          this.loadCashValues();
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadPortfolioMetrics() {
    this.service.getPortfolioMetrics().subscribe(
      {
        next: (portfolioMetric) => {
          this.portfolioMetrics = portfolioMetric;
          this.portfolioEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadPositionMetrics() {
    this.service.getPositionMetrics().subscribe(
      {
        next: (positionMetric) => {
          this.positionMetrics = positionMetric;
          this.portfolioEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  private loadCashValues() {
    this.sumOfCash = 0;
    if (this.giros.length > 0) {
      forkJoin(
        this.giros.map(giro =>
          this.service.getInstrumentValue(giro.businesskey, this.dateForAnalysis, ValuationTypeEnum.MARKETVALUE)
        )
      ).subscribe({
        next: (values: number[]) => {
          this.sumOfCash = values.reduce((acc, curr) => acc + curr, 0);
          this.portfolioEventSubject.next(true); // Notify subscribers that data has changed
        },
        error: (e) => {
          console.error(e);
          alert('Error loading cash values');
        }
      });
    } else {
      this.portfolioEventSubject.next(true); // Notify subscribers even if no giros
    }
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
  getSumOfCash(): number {
    return this.sumOfCash;
  }

  getPortfolioMetrics(): PortfolioMetrics[] {
    return this.portfolioMetrics;
  }

  getPositionMetrics(): PositionMetrics[] {
    return this.positionMetrics;
  }

}