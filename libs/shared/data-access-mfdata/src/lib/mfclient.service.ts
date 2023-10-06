import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Instrument } from './model/instrument';
import { AuthService } from './auth.service';
import { MfconfigService } from './mfconfig.service';


@Injectable({
  providedIn: 'root'
})
export class MfClientService {

  private url = 'http://localhost:7009';
  private path2resource = "mf";
  dataServiceSubject: Subject<unknown> = new Subject<unknown>();

  constructor(private http: HttpClient, private mfConfigService: MfconfigService, private auth: AuthService) {
    this.mfConfigService.configLoaded.subscribe({
      next:
        () => {
          this.loadConfig();
        },
      error: (e) => console.error(e)
    });
  }

  private loadConfig() {
    this.url= this.mfConfigService.getCurrentBackendUrl();
    this.auth.setOpenIdServiceUrl(this.mfConfigService.getCurrentOpenIdUrl());

  }

  getResource(resource:string): Observable<any> {
    return this.http.get<Instrument[]>(`${this.url}/${this.path2resource}/${resource}`, { headers: this.buildHeader() })
  }

  postRequest(body:string, resource:string): Observable<any> {
    const options = { headers: this.buildHeader() };
    console.log("body:" + body);
    return this.http.post<string>(`${this.url}/${this.path2resource}/${resource}`, body, options);
  }  

  buildHeader() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getToken(),
      'Content-Type': 'application/json'
    });
    console.log(headers);
    return headers;
  }
}


