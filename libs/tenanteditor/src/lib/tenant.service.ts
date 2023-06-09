import { Injectable } from '@angular/core';
import { Instrument, MfdataService } from '@mffrontend/shared/data-access-mfdata';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private mfDataService: MfdataService) { }

  saveTenant(desc: string) {
    const instrument: Instrument = {
      instrumentType: 'TENANT',
      description: desc,
      active: true,
      treelastchanged: new Date,
      businesskey: '',
      parentBusinesskey: '',
      serviceAddress: '',
      tenantBusinesskey: '',
      additionalMaps: [''],
      additionalProperties: [''],
      additionalLists: ['']
    }
    this.mfDataService.addTenant(instrument)      
    .subscribe({
      next:
      () => {
        console.error('saved');
      },
      error: (e) => console.error(e)
    });
  }

  getConfigLoadedSubject() : Subject<unknown>{
    return this.mfDataService.configLoaded;
  }

  getTenants(): Observable<Instrument[]> {
    return this.mfDataService.getTenants();
  }
}
