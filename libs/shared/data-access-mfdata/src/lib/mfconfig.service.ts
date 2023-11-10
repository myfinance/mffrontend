import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigModel } from './configmodel/config.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MfconfigService {

  config: ConfigModel = {
    defaultZone: '',
    currentZone: {
      name: '',
      identifier: '',
      backendurl: '',
      openidurl: '',
      logstreamurl:'',
    },
    zones: [],
  };

  currentToken = '';
  tokenExpiration = 0;

  configLoaded: Subject<unknown> = new Subject<unknown>();

  constructor(private http: HttpClient) { 
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

        // Check if a token is saved in local storage.
        // Set the current token to the saved one if the expire date is not reached
        const token = localStorage.getItem('mftoken');
        const expDateString = localStorage.getItem('mftokenExpDate');
        if(expDateString && token) {
          const expDate: number = +expDateString;
          const currentDate = Date.now();
          if(expDate>currentDate) {
            this.setCurrentToken(token, expDate);
          }
        }

        // Check if zone is saved in local storage.
        // Set the current zone to the saved zone or else
        // set it to the default zone in the configuration.
        const zone = localStorage.getItem('mfzone');
        if (zone) {
          this.setCurrentZone(zone);
        } else {
          this.setCurrentZone(this.config.defaultZone);
        }
      });
  }

  setCurrentZone(identifier: string): void {
    for (const zone of this.config.zones) {
      if (zone.identifier === identifier) {
        this.config.currentZone = zone;
        // Additionally save the zone in the local storage.
        localStorage.setItem('mfzone', identifier);
        this.configLoaded.next(true);
      }
    }
  }

  getCurrentZone() {
    return this.config.currentZone.identifier
  }

  getCurrentBackendUrl() {
    return this.config.currentZone.backendurl
  }

  getCurrentOpenIdUrl() {
    return this.config.currentZone.openidurl
  }

  getCurrentLogstreamUrl() {
    return this.config.currentZone.logstreamurl
  }

  isMock(): boolean {
    if (this.getCurrentZone().match('mock')) {
      return true;
    } else {
      return false;
    }
  }
  setCurrentToken(token: string, expDate: number): void {
    this.currentToken = token;
    localStorage.setItem('mftoken', token);
    this.tokenExpiration= expDate;
    localStorage.setItem('mftokenExpDate', expDate.toString());
  }

  getCurrentToken(): string {
    return this.currentToken;
  }
  getTokenExpDate(): number {
    return this.tokenExpiration;
  }

}
