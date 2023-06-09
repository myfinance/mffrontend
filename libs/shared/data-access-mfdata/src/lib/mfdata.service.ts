import { Injectable } from '@angular/core';
import { MfClientService } from './mfclient.service';
import { MfconfigService } from './mfconfig.service';
import { Observable, Subject } from 'rxjs';
import { Instrument } from './model/instrument';

@Injectable({
  providedIn: 'root'
})
export class MfdataService {

  configLoaded: Subject<unknown> = new Subject<unknown>()

  tenants: Instrument[] = []
  currentTenant: Instrument = {
    instrumentType: 'TENANT',
    description: 'NA',
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

  constructor(private mfClientservice: MfClientService, private mfConfigService: MfconfigService) {
    this.mfConfigService.configLoaded.subscribe({
      next:
        () => {
          this.loadConfig();
        },
      error: (e) => console.error(e)
    });
  }

  private loadConfig() {
    this.mfClientservice.setMfClientUrl(this.mfConfigService.getCurrentBackendUrl());
    this.loadTenants();

  }

  /**
* to avoid circular dependency the environment request can not be made via dataservice
* @returns {Observable<StringListModel>}
*/
  private getTenantProvider(): Observable<Instrument[]> {
    return this.mfClientservice.getTenants();
  }

  loadTenants() {
    this.getTenantProvider().subscribe(
      {
        next: (tenants) => {
          this.tenants = tenants.filter(i => i.active);
          const tenant = localStorage.getItem('tenant');
          if (tenant) {
            const savedTenant = this.tenants.filter(i => i.businesskey === tenant)
            if (savedTenant && savedTenant.length > 0) {
              this.setCurrentTenant(savedTenant[0]);
            } else {
              this.setCurrentTenant(this.tenants[0])
            }
          } else {
            this.setCurrentTenant(this.tenants[0])
          }
        },
        error: (e) => console.error(e)
      }
    );
  }

  setCurrentTenant(tenant: Instrument): void {
    if (tenant != null) {
      this.currentTenant = tenant;
      // Additionally save the zone in the local storage.
      localStorage.setItem('tenant', tenant.businesskey);
      console.info('set tenant');
    }
    this.configLoaded.next(true);
  }

  setCurrentZone(identifier: string): void {
    this.mfConfigService.setCurrentZone(identifier);
  }

  getCurrentZone() {
    return this.mfConfigService.getCurrentZone();
  }
  getConfig() {
    return this.mfConfigService.config;
  }

  getCurrentTenant():Instrument {
    return this.currentTenant;
  }

  getTenants(): Observable<Instrument[]> {
    return this.mfClientservice.getTenants();
  }
  addTenant(instrument:Instrument): Observable<string> {
    return this.mfClientservice.addTenant(instrument);
  }
}
