import { Injectable } from '@angular/core';
import { Instrument, MfClientService } from '@mffrontend/shared/data-access-mfclient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private mfDataService: MfClientService) { }

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
    this.mfDataService.addTenant(instrument);
  }

  getTenants(): Observable<Instrument[]> {
    return this.mfDataService.getTenants();
  }
}
