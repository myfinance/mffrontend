import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Instrument, MfdataService } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';
import { InstrumentTypeEnum, AdditionalMapsEnum, AdditionalPropertiesEnum, AdditionalListsEnum, LiquidityTypeEnum } from '../shared/data-access-mfdata/model/instrument';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  selectedInstrument:Instrument | undefined
  public newInstrumentSelectedSubject: Subject<unknown> = new Subject<unknown>()
  public newInstrumentsLoadedSubject: Subject<unknown> = new Subject<unknown>()
  instruments: Instrument[] = [];


  constructor(private mfDataService: MfdataService) { 
    this.mfDataService.getConfigLoadedSubject().subscribe({
      next:
        () => this.loadInstruments(),
      error:
        (e) => {
          console.error(e);
          alert('Invalid Credentials');
        }
    })
    this.mfDataService.getInstrumentEventSubject().subscribe(
      () => {
        this.loadInstruments();
      }
    )
    this.loadInstruments();
  }

  loadInstruments() {
    this.mfDataService.getEditableInstruments().subscribe(
      (instruments) => {
        this.instruments = instruments;
        this.newInstrumentsLoadedSubject.next(true);
      }
    )
  }

  saveInstrument(desc: string, type: InstrumentTypeEnum, parentKey: string, maps: Map<AdditionalMapsEnum, Map<string,string>>, properties: Map<AdditionalPropertiesEnum, string>, lists: Map<AdditionalListsEnum, ['']>, liquidityType: LiquidityTypeEnum) {
    const instrument: Instrument = new Instrument(type, desc, parentKey, this.mfDataService.currentTenant.businesskey);
    instrument.additionalMaps = maps;
    instrument.additionalProperties = properties;
    instrument.additionalLists = lists;
    instrument.liquidityType = liquidityType;
    this.mfDataService.saveInstrument(instrument);
  }

  updateInstrument(active: boolean, desc: string, liquidityType: LiquidityTypeEnum, maps: Map<AdditionalMapsEnum, Map<string,string>>) {
    if(this.selectedInstrument) {
      this.selectedInstrument.active = active;
      this.selectedInstrument.description = desc;
      this.selectedInstrument.liquidityType = liquidityType;
      this.selectedInstrument.additionalMaps = maps;
      this.mfDataService.saveInstrument(this.selectedInstrument);
    }
  }

  setSelectedInstrument(businesskey:string) {
    this.selectedInstrument = this.instruments.filter(instrument => instrument.businesskey === businesskey)[0];
    this.newInstrumentSelectedSubject.next(true);
  }
  deSelectInstrument() {
     this.selectedInstrument = undefined;
     this.newInstrumentSelectedSubject.next(true);
   }

  getSelectedInstrument() : Instrument|undefined {
    return this.selectedInstrument;
  }

  getInstruments() : Instrument[] {
    return this.instruments;
  }
}