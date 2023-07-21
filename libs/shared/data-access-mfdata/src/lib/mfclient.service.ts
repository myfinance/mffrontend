import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instrument } from './model/instrument';
import { AuthService } from 'libs/shared/auth/src/lib/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MfClientService {

  private url = 'http://localhost:7009';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getTenants(): Observable<Instrument[]> {

    return this.http.get<Instrument[]>(`${this.url}/tenants`, {headers: this.buildHeader()})
  }

  saveTenant(instrument:Instrument): Observable<string> {
    const body=JSON.stringify(instrument);
    console.log("body:"+body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    const options = { headers: headers };
    return this.http.post<string>(`${this.url}/saveinstrument`, body, options);
  }

  setMfClientUrl(url: string): void {
    this.url = url;
  }

  buildHeader() {
    const credentials = this.auth.getCredentials();
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      } : { });
    return headers 
  }
}
