import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigModel } from './model/config.model';
import { Instrument, MfClientService } from '@mffrontend/shared/data-access-mfclient';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MfconfigService {

  config: ConfigModel = {
    defaultZone: '',
    currentZone: {
      name: '',
      identifier: '',
      url: '',
    },
    zones: [],
  };

  configLoaded: Subject<unknown> = new Subject<unknown>()
  private isInit = false
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

  constructor(private http: HttpClient, private mfClientservice: MfClientService) { 
    this.load()
  }



  /**
 * Loads the configuration.
 */
  load(): void {

    this.http
      .get('assets/config/config.json')
      .subscribe((data) => {
        this.config = data as ConfigModel;

        // Check if zone is saved in local storage.
        // Set the current zone to the saved zone or else
        // set it to the default zone in the configuration.
        const zone = localStorage.getItem('mfzone');
        if (zone) {
          this.setCurrentZone(zone);
        } else {
          this.setCurrentZone(this.config.defaultZone);
        }
        this.isInit = true;
      });
  }

  setCurrentZone(identifier: string): void {
    for (const zone of this.config.zones) {
      if (zone.identifier === identifier) {
        this.config.currentZone = zone;
        // Additionally save the zone in the local storage.
        localStorage.setItem('mfzone', identifier);
        this.mfClientservice.setMfClientUrl(this.config.currentZone.url)
        this.loadTenants();
      }
    }
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

  getCurrentTenant() {
    return this.currentTenant
  }

  getCurrentZone() {
    return this.config.currentZone.identifier
  }

  getIsInit(): boolean {
    return this.isInit;
  }
}
