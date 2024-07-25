import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Instrument, MfdataService } from '../shared/data-access-mfdata/shared-data-access-mfdata.module';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  selectedTenant:Instrument | undefined
  public newTenantSelectedSubject: Subject<unknown> = new Subject<unknown>()

  constructor(private mfDataService: MfdataService) { 
  }

  saveTenant(desc: string) {
    const instrument: Instrument = new Instrument('TENANT', desc, '', '');
    this.mfDataService.saveTenant(instrument);
  }

  updateTenant(active: boolean, desc: string) {
    if(this.selectedTenant) {
      this.selectedTenant.active = active;
      this.selectedTenant.description = desc;
      this.mfDataService.saveTenant(this.selectedTenant);
    }
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.getConfigLoadedSubject();
  }

  getTenantEventSubject() : Subject<unknown>{
    return this.mfDataService.getInstrumentEventSubject();
  }

  getTenants(): Instrument[] {
    return this.mfDataService.getTenants();
  }

  setSelectedTenant(instrument:Instrument | undefined) {
    this.selectedTenant = instrument;
    this.newTenantSelectedSubject.next(true);
  }
  getSelectedTenant() : Instrument | undefined{
    return this.selectedTenant;
  }
}
