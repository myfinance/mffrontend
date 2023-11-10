import { Injectable } from '@angular/core';
import { MfClientService } from './mfclient.service';
import { Observable, Subject } from 'rxjs';
import { AdditionalListsEnum, AdditionalMapsEnum, AdditionalPropertiesEnum, Instrument } from './model/instrument';
import { MfconfigService } from './mfconfig.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MfdataService {

  tenantChangedSubject: Subject<unknown> = new Subject<unknown>()
  public instrumentEventSubject: Subject<unknown> = new Subject<unknown>()

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
    additionalMaps: new Map<AdditionalMapsEnum, string>(),
    additionalProperties: new Map<AdditionalPropertiesEnum, string>(),
    additionalLists: new Map<AdditionalListsEnum, ['']>()
  }

  constructor(private mfClientservice: MfClientService, private mfConfigService: MfconfigService, private auth: AuthService) {
    this.auth.getLoginSubject().subscribe(
      () => {
        mfConfigService.setCurrentToken(auth.getToken(), auth.getTokenExpDate());
      }
    )
    this.auth.getLogoutSubject().subscribe(
      () => {
        mfConfigService.setCurrentToken('', 0);
      }
    )
    this.mfConfigService.configLoaded.subscribe(
      () => {
        this.auth.setToken(this.mfConfigService.getCurrentToken(), this.mfConfigService.getTokenExpDate());
      }
    )
  }


  loadTenants() {
    this.getTenants().subscribe(
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
    this.tenantChangedSubject.next(true);
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

  //triggers after the initial load of the config or every time when the config changes (e.g. the backend)
  getConfigLoadedSubject() {
    return this.mfConfigService.configLoaded;
  }

  getLogstreamUrl() {
    return this.mfConfigService.getCurrentLogstreamUrl();
  }


  getCurrentTenant(): Instrument {
    return this.currentTenant;
  }

  getTenants(): Observable<Instrument[]> {
    return this.mfClientservice.getResource("tenants");
  }
  saveTenant(instrument: Instrument) {
    return this.mfClientservice.postRequest(JSON.stringify(instrument), "saveinstrument").subscribe({
      next:
        () => {
          console.info('saved');
        },
      error: (e) => console.error(e)
    });
  }

  getInstrumentEventSubject(){
    return this.instrumentEventSubject;
  }
  triggerInstrumentEvent() {
    this.instrumentEventSubject.next(true);
  }

  getVersion(): Observable<string> {
    return this.mfClientservice.getResource("index");
  }

  login(username: string, password: string) {
    this.auth.login(username, password);
  }

  logout() {
    this.auth.logout();
  }

  isLoggedIn() { return this.auth.isLoggedIn(); }

  // triggered when somebody loggs in
  getLoginSubject() {
    return this.auth.getLoginSubject();
  }

  getLogoutSubject() {
    return this.auth.getLogoutSubject();
  }

  getUserName() {
    if(!this.auth.credentials.username) {
      return "NA"
    }
    return this.auth.credentials.username;
  }

}
