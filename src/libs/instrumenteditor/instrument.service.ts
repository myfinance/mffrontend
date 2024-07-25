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

  constructor(private mfDataService: MfdataService) { 
  }

  saveInstrument(desc: string, type: InstrumentTypeEnum, parentKey: string, maps: Map<AdditionalMapsEnum, string>, properties: Map<AdditionalPropertiesEnum, string>, lists: Map<AdditionalListsEnum, ['']>, liquidityType: LiquidityTypeEnum) {
    const instrument: Instrument = new Instrument(type, desc, parentKey, this.mfDataService.currentTenant.businesskey);
    instrument.additionalMaps = maps;
    instrument.additionalProperties = properties;
    instrument.additionalLists = lists;
    instrument.liquidityType = liquidityType;
    this.mfDataService.saveInstrument(instrument);
  }

  updateInstrument(active: boolean, desc: string, liquidityType: LiquidityTypeEnum) {
    if(this.selectedInstrument) {
      this.selectedInstrument.active = active;
      this.selectedInstrument.description = desc;
      this.selectedInstrument.liquidityType = liquidityType;
      this.mfDataService.saveInstrument(this.selectedInstrument);
    }
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.getConfigLoadedSubject();
  }
  getLoginSubject() : Subject<unknown>{
    return this.mfDataService.loginEventSubject;
  }
  getInstrumentEventSubject() : Subject<unknown>{
    return this.mfDataService.getInstrumentEventSubject();
  }

  getInstruments(): Observable<Instrument[]> {
    return this.mfDataService.getInstruments();
  }

  setSelectedInstrument(instrument:Instrument | undefined) {
    this.selectedInstrument = instrument;
    this.newInstrumentSelectedSubject.next(true);
  }

  getSelectedInstrument() : Instrument|undefined {
    return this.selectedInstrument;
  }
}