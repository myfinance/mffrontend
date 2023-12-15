import { Injectable } from '@angular/core';
import { AdditionalListsEnum, AdditionalMapsEnum, AdditionalPropertiesEnum, Instrument, MfdataService, InstrumentTypeEnum } from '@mffrontend/shared/data-access-mfdata';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  selectedInstrument:Instrument | undefined
  public newInstrumentSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  saveInstrument(desc: string, type: InstrumentTypeEnum, parentKey: string, maps: Map<AdditionalMapsEnum, string>, properties: Map<AdditionalPropertiesEnum, string>, lists: Map<AdditionalListsEnum, ['']>) {
    const instrument: Instrument = new Instrument(type, desc, parentKey, this.mfDataService.currentTenant.businesskey);
    instrument.additionalMaps = maps;
    instrument.additionalProperties = properties;
    instrument.additionalLists = lists;
    this.mfDataService.saveInstrument(instrument);
  }

  updateInstrument(active: boolean, desc: string) {
    if(this.selectedInstrument) {
      this.selectedInstrument.active = active;
      this.selectedInstrument.description = desc;
      this.mfDataService.saveInstrument(this.selectedInstrument);
    }
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.getConfigLoadedSubject();
  }
  getLoginSubject() : Subject<unknown>{
    return this.mfDataService.getLoginSubject();
  }
  getInstrumentEventSubject() : Subject<unknown>{
    return this.mfDataService.getInstrumentEventSubject();
  }

  getInstruments(): Observable<Instrument[]> {
    return this.mfDataService.getInstruments();
  }

  setSelectedInstrument(instrument:Instrument) {
    this.selectedInstrument = instrument;
    this.newInstrumentSelectedSubject.next(true);
  }
}