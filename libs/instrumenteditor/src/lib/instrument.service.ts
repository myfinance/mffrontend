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

  saveInstrument(desc: string, type: InstrumentTypeEnum, parentKey: string) {
    const instrument: Instrument = {
      instrumentType: type,
      description: desc,
      active: true,
      treelastchanged: new Date,
      businesskey: '',
      parentBusinesskey: parentKey,
      serviceAddress: '',
      tenantBusinesskey: this.mfDataService.currentTenant.businesskey,
      additionalMaps: new Map<AdditionalMapsEnum, string>(),
      additionalProperties: new Map<AdditionalPropertiesEnum, string>(),
      additionalLists: new Map<AdditionalListsEnum, ['']>()
    }
    this.mfDataService.saveInstrument(instrument);
  }

  updateTenant(active: boolean, desc: string) {
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