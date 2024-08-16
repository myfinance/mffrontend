import { Injectable } from '@angular/core';
import { MfClientService } from './mfclient.service';
import { Observable, Subject } from 'rxjs';
import { AdditionalPropertiesEnum, Instrument, InstrumentTypeEnum } from './model/instrument';
import { MfconfigService } from './mfconfig.service';
import { AuthService } from './auth.service';
import { Transaction } from './model/transaction';
import { ValueCurve } from './model/valuecurve';
import { InstrumentDetails } from './model/instrumentdetails';
import { InstrumentFullDetails } from './model/instrumentfulldetails';
import { RecurrentTransaction } from './model/recurrenttransaction';
import { JsonConvertHelper } from './jsonconverthelper';

@Injectable({
  providedIn: 'root'
})
export class MfdataService {

  tenantChangedSubject: Subject<unknown> = new Subject<unknown>()
  instrumentEventSubject: Subject<unknown> = new Subject<unknown>()
  transactionEventSubject: Subject<unknown> = new Subject<unknown>()
  recurrentTransactionEventSubject: Subject<unknown> = new Subject<unknown>()
  loginEventSubject: Subject<unknown> = new Subject<unknown>()

  tenants: Instrument[] = []
  currentTenant: Instrument = new Instrument(InstrumentTypeEnum.TENANT, 'NA', '', '')

  constructor(private mfClientservice: MfClientService, private mfConfigService: MfconfigService, private auth: AuthService) {
    this.auth.getLoginSubject().subscribe(
      () => {
        mfConfigService.setCurrentToken(auth.getToken(), auth.getTokenExpDate());
        this.loadTenants();
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
    (this.mfClientservice.getResource("tenants") as Observable<Instrument[]>).subscribe(
      {
        next: (tenants) => {
          this.tenants = tenants;
          const tenant = localStorage.getItem('tenant');
          if (tenant) {
            const savedTenant = this.getActiveTenants().filter(i => i.businesskey === tenant)
            if (savedTenant && savedTenant.length > 0) {
              this.setCurrentTenant(savedTenant[0]);
            } else {
              this.setCurrentTenant(this.getActiveTenants()[0])
            }
          } else {
            this.setCurrentTenant(this.getActiveTenants()[0])
          }
          this.loginEventSubject.next(true);
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

  getCurrentTenant(): Instrument {
    return this.currentTenant;
  }

  getTenants(): Instrument[] {
    return this.tenants;
  }

  getActiveTenants(): Instrument[] {
    return this.tenants.filter(i => i.active);;
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
    return this.mfClientservice.getResource("transactions?startDate="+JsonConvertHelper.dateToIsoString(startDate) + "&endDate="+JsonConvertHelper.dateToIsoString(endDate) );
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

  getRecurrentTransactions(): Observable<RecurrentTransaction[]> {
    return this.mfClientservice.getResource("recurrenttransactions");
  }
  saveRecurrentTransaction(recurrentTransaction: RecurrentTransaction) {
    return this.mfClientservice.postRequest(JSON.stringify(recurrentTransaction), "saveRecurrentTransaction").subscribe({
      next:
        () => {
          console.info('saved');
        },
      error: (e) => console.error(e)
    });
  }

  saveTransactions(transactions: Transaction[]) {
    return this.mfClientservice.postRequest(JSON.stringify(transactions), "saveTransactions").subscribe({
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
          console.info('deleted');
        },
      error: (e) => console.error(e)
    });
  }

  deleteRecurrentTransaction(recurrentTransactionId: string) {
    return this.mfClientservice.deleteResource("delrecurrenttransfer/"+recurrentTransactionId).subscribe({
      next:
        () => {
          console.info('deleted');
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

  getRecurrentTransactionEventSubject(){
    return this.recurrentTransactionEventSubject;
  }
  triggerRecurrentTransactionEvent() {
    this.recurrentTransactionEventSubject.next(true);
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
    return this.mfClientservice.getResource("getvalue?businesskey="+businesskey + "&date="+JsonConvertHelper.dateToIsoString(valueDate));
  }

  getInstrumentValueCurve(businesskey:string, startDate: Date, endDate: Date): Observable<ValueCurve> {
    return this.mfClientservice.getResource("getvaluecurve?businesskey="+businesskey + "&startDate="+JsonConvertHelper.dateToIsoString(startDate) + "&endDate="+JsonConvertHelper.dateToIsoString(endDate));
  }

  getDetailedAccounts(duedate: Date, referenceDate:Date) : Observable<InstrumentDetails[]> {
    return this.mfClientservice.getResource("listdetailedaccounts?tenantbusinesskey="+this.currentTenant.businesskey 
      + "&duedate="+JsonConvertHelper.dateToIsoString(duedate)
      + "&referencedate="+JsonConvertHelper.dateToIsoString(referenceDate));
  }

  getDetailedBudgets(duedate: Date, referenceDate:Date) : Observable<InstrumentDetails[]> {
    return this.mfClientservice.getResource("listdetailedbudgets?tenantbusinesskey="+this.currentTenant.businesskey 
      + "&duedate="+JsonConvertHelper.dateToIsoString(duedate)
      + "&referencedate="+JsonConvertHelper.dateToIsoString(referenceDate));
  }

  getInstrumenDetails(businesskey:string, duedate: Date, referenceDate:Date, startTimeSeries:Date, endTimeSeries:Date, firstCashflowDate:Date, lastCashflowDate:Date) : Observable<InstrumentFullDetails> {
    return this.mfClientservice.getResource("instrumentdetails?businesskey="+businesskey
    + "&duedate="+JsonConvertHelper.dateToIsoString(duedate)
    + "&referencedate="+JsonConvertHelper.dateToIsoString(referenceDate)
    + "&starttimeseries="+JsonConvertHelper.dateToIsoString(startTimeSeries)
    + "&endtimeseries="+JsonConvertHelper.dateToIsoString(endTimeSeries)
    + "&firstcashflowdate="+JsonConvertHelper.dateToIsoString(firstCashflowDate)
    + "&lastcashflowdate="+JsonConvertHelper.dateToIsoString(lastCashflowDate));
  }

  getToken() : string {
    return this.auth.getToken();
  }
}
