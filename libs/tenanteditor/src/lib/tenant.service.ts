import { Injectable } from '@angular/core';
import { Instrument, MfdataService } from '@mffrontend/shared/data-access-mfdata';
import { Observable, Subject } from 'rxjs';

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
  getLoginSubject() : Subject<unknown>{
    return this.mfDataService.getLoginSubject();
  }
  getTenantEventSubject() : Subject<unknown>{
    return this.mfDataService.getInstrumentEventSubject();
  }

  getTenants(): Observable<Instrument[]> {
    return this.mfDataService.getTenants();
  }

  setSelectedTenant(instrument:Instrument) {
    this.selectedTenant = instrument;
    this.newTenantSelectedSubject.next(true);
  }
}
