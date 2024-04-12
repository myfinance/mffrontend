import { Injectable } from '@angular/core';
import { MfClientService } from './mfclient.service';
import { Observable, Subject } from 'rxjs';
import { AdditionalPropertiesEnum, Instrument, InstrumentTypeEnum } from './model/instrument';
import { MfconfigService } from './mfconfig.service';
import { AuthService } from './auth.service';
import { Transaction } from './model/transaction';

@Injectable({
  providedIn: 'root'
})
export class MfdataService {

  tenantChangedSubject: Subject<unknown> = new Subject<unknown>()
  instrumentEventSubject: Subject<unknown> = new Subject<unknown>()
  transactionEventSubject: Subject<unknown> = new Subject<unknown>()

  tenants: Instrument[] = []
  currentTenant: Instrument = new Instrument(InstrumentTypeEnum.TENANT, 'NA', '', '')

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

  getAccounts(): Observable<Instrument[]> {
    return this.mfClientservice.getResource("accounts?tenantbusinesskey="+this.currentTenant.businesskey);
  }
  getBudgets(): Observable<Instrument[]> {
    return this.mfClientservice.getResource("budgets?tenantbusinesskey="+this.currentTenant.businesskey);
  }
  getInstruments(): Observable<Instrument[]> {
    return this.mfClientservice.getResource("instrumentsfortenant?tenantbusinesskey="+this.currentTenant.businesskey);
  }
  saveInstrument(instrument: Instrument) {
    console.info('instrument: '+instrument.additionalProperties.get(AdditionalPropertiesEnum.IBAN));
    console.info('instrumentjson: '+JSON.stringify(instrument));
    return this.mfClientservice.postRequest(JSON.stringify(instrument), "saveinstrument").subscribe({
      next:
        () => {
          console.info('saved');
        },
      error: (e) => console.error(e)
    });
  }

  getTransactions(startDate: Date, endDate: Date): Observable<Transaction[]> {
    return this.mfClientservice.getResource("transactions?startDate="+startDate.toISOString().split('T')[0] + "&endDate="+endDate.toISOString().split('T')[0]);
  }
  saveTransaction(transaction: Transaction) {
    return this.mfClientservice.postRequest(JSON.stringify(transaction), "saveTransaction").subscribe({
      next:
        () => {
          console.info('saved');
        },
      error: (e) => console.error(e)
    });
  }

  deleteTransaction(transactionId: string) {
    return this.mfClientservice.deleteResource("delTransaction/"+transactionId).subscribe({
      next:
        () => {
          console.info('delted');
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

  getTransactionEventSubject(){
    return this.transactionEventSubject;
  }
  triggerTransactionEvent() {
    this.transactionEventSubject.next(true);
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

  getInstrumentValue(businesskey:string, valueDate: Date): Observable<number> {
    return this.mfClientservice.getResource("getvalue?businesskey="+businesskey + "&date="+valueDate.toISOString().split('T')[0]);
  }

  getInstrumentValueCurve(businesskey:string, startDate: Date, endDate: Date): Observable<number> {
    return this.mfClientservice.getResource("getvaluecurve?businesskey="+businesskey + "&startDate="+startDate.toISOString().split('T')[0] + "&endDate="+endDate.toISOString().split('T')[0]);
  }

}
