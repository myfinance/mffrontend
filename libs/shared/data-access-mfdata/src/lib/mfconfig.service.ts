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
    },
    zones: [],
  };

  configLoaded: Subject<unknown> = new Subject<unknown>();
  private isInit = false;


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

  getIsInit(): boolean {
    return this.isInit;
  }

  isMock(): boolean {
    if (this.getCurrentZone().match('mock')) {
      return true;
    } else {
      return false;
    }
  }

}
