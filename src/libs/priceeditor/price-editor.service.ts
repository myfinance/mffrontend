import { Injectable } from '@angular/core';
import { MfdataService } from '../shared/data-access-mfdata/mfdata.service';
import { Instrument, InstrumentTypeEnum } from '../shared/data-access-mfdata/model/instrument';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PriceEditorService {

  securities: Instrument[] = [];
  securityEventSubject: Subject<unknown> = new Subject<unknown>();



  constructor(private service: MfdataService) {
    this.service.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadSecurities(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.service.getInstrumentEventSubject().subscribe(
      {
        next: () => {
          this.loadSecurities();
        },
        error: (e) => console.error(e)
      }
    )
    this.loadSecurities();
  }

  getSecurities(): Instrument[] {
    return this.securities;
  }

  private loadSecurities() {
    this.service.getAllInstruments().subscribe(
      {
        next: (instruments) => {
          this.securities = instruments.filter(i =>
            i.instrumentType === InstrumentTypeEnum.EQUITY
            || i.instrumentType === InstrumentTypeEnum.CURRENCY
            || i.instrumentType === InstrumentTypeEnum.BOND
            || i.instrumentType === InstrumentTypeEnum.ETF
            || i.instrumentType === InstrumentTypeEnum.FONDS
          );
          this.securityEventSubject.next(true);
        },
        error: (e) => console.error(e)
      }
    )
  }

  savePrice(securityBusinesskey: string | undefined, priceDate: Date | undefined, value: number | undefined) {
    if (securityBusinesskey && priceDate && value) {
      this.service.saveEndOfDayPrice(securityBusinesskey, priceDate, value);
    }
  }
}